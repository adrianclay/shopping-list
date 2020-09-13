import * as firebase from "firebase/app";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";
import ShoppingListEvent from "../domain/ShoppingListEvent";
import { ItemToAdd } from "../AddItemForm";
import { Searchable } from "./ItemSearchingService";
import { AddShoppingListRequest } from "../CreateShoppingListForm";

interface ShoppingListRecord {
  name: string;
  owner_uids: string[];
  recent_events: ShoppingListEvent[];
}
export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void {
    const itemCollection = this.shoppingListItemCollection(shoppingList);
    const undeletedItems = itemCollection.where('deleted', '==', false)
    return undeletedItems.orderBy('created_on').onSnapshot(snapshot => {
      onUpdate(this.snapshotToShoppingListItemArray(snapshot, shoppingList));
    }, onError);
  }

  subscribeToListChanges(loggedInUser: User, onUpdate: (items: ShoppingList[]) => void, onError: (error: Error) => void): () => void {
    const shoppingListCollection = this.firebase.firestore().collection('shopping-list');
    const shoppingListsFilteredByLoggedInUser = shoppingListCollection.where('owner_uids', 'array-contains', loggedInUser.uid);
    return shoppingListsFilteredByLoggedInUser.onSnapshot(collection => {
      const items = collection.docs.map(item => {
        const document = item.data() as ShoppingListRecord;
        return {
          id: item.id,
          ...document
        };
      });
      onUpdate(items);
    }, onError);
  }

  async searchForItems(shoppingList: ShoppingList, search: string) {
    const itemCollection = this.shoppingListItemCollection(shoppingList);
    const snapshot = await itemCollection.where('search_queries', 'array-contains', search).get();
    return this.snapshotToShoppingListItemArray(snapshot, shoppingList);
  }

  async addShoppingListItem({ name, list, search_queries }: Searchable<ItemToAdd>): Promise<ShoppingListItem> {
    const { id } = await this.shoppingListItemCollection(list).add({
      name,
      search_queries,
      created_on: firebase.firestore.FieldValue.serverTimestamp(),
      deleted: false,
    });

    return {
      list, name, id
    };
  }

  async readdShoppingListItem({ list, id }: ShoppingListItem) {
    const collection = this.shoppingListItemCollection(list);
    await collection.doc(id).update({
      deleted: false
    })
  }

  async addShoppingList(list: AddShoppingListRequest): Promise<ShoppingList> {
    const record : ShoppingListRecord = {
      ...list,
      recent_events: [],
    };
    const docReference = await this.firebase.firestore().collection('shopping-list').add(record);
    return {
      id: docReference.id,
      ...record,
    };
  }

  async deleteItem(shoppingListItem: ShoppingListItem) {
    const itemsCollection = this.shoppingListItemCollection(shoppingListItem.list);
    const item = itemsCollection.doc(shoppingListItem.id);
    await item.update({ deleted: true });
  }

  async updateItem({ id, list, ...attributes }: Searchable<ShoppingListItem>) {
    const itemsCollection = this.shoppingListItemCollection(list);
    const item = itemsCollection.doc(id);
    await item.update(attributes);
  }

  private shoppingListItemCollection(shoppingList: ShoppingList) {
    return this.firebase.firestore().collection(`shopping-list/${shoppingList.id}/items`);
  }

  private snapshotToShoppingListItemArray(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, shoppingList: ShoppingList) {
    return snapshot.docs.map(document => {
      return {
        ...document.data() as { name: string; },
        id: document.id,
        list: shoppingList
      };
    });
  }
}
