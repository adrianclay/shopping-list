import * as firebase from "firebase/app";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";

interface ShoppingListRecord {
  name: string;
  owner_uid: string;
}
export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void {
    const itemCollection = this.shoppingListItemCollection(shoppingList);
    return itemCollection.orderBy('created_on').onSnapshot(collection => {
      const items = collection.docs.map(item => {
        return {
          ...item.data() as { name: string },
          id: item.id,
          list: shoppingList
        };
      });
      onUpdate(items);
    }, onError);
  }

  subscribeToListChanges(loggedInUser: User, onUpdate: (items: ShoppingList[]) => void, onError: (error: Error) => void): () => void {
    const shoppingListCollection = this.firebase.firestore().collection('shopping-list');
    const shoppingListsFilteredByLoggedInUser = shoppingListCollection.where('owner_uid', '==', loggedInUser.uid);
    return shoppingListsFilteredByLoggedInUser.onSnapshot(collection => {
      const items = collection.docs.map(item => {
        return {
          id: item.id,
          ...item.data() as ShoppingListRecord
        }
      });
      onUpdate(items);
    }, onError);
  }

  async addShoppingListItem({ name, list }: { name: string, list: ShoppingList }): Promise<ShoppingListItem> {
    const { id } = await this.shoppingListItemCollection(list).add({
      name,
      created_on: firebase.firestore.FieldValue.serverTimestamp()
    });

    return {
      list, name, id
    };
  }

  async addShoppingList(list: ShoppingListRecord): Promise<ShoppingList> {
    const thing = await this.firebase.firestore().collection('shopping-list').add(list);
    return {
      id: thing.id,
      ...list,
    }
  }

  async deleteItem(shoppingListItem: ShoppingListItem) {
    const itemsCollection = this.shoppingListItemCollection(shoppingListItem.list);
    const item = itemsCollection.doc(shoppingListItem.id);
    await item.delete();
  }

  private shoppingListItemCollection(shoppingList: ShoppingList) {
    return this.firebase.firestore().collection(`shopping-list/${shoppingList.id}/items`);
  }
}
