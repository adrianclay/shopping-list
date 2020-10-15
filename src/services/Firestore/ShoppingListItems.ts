import * as firebase from "firebase/app";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListItem from "../../domain/ShoppingListItem";
import { RealtimeService } from "../../useService";
import { Searchable } from "../ItemSearchingService";
import ItemQuantity from "../../domain/ItemQuantity";

export function _listShoppingListItems(firestore: firebase.firestore.Firestore) : RealtimeService<ShoppingList, ShoppingListItem[]> {
  return function(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void {
    const itemCollection = collection(firestore, shoppingList);
    const items_yet_to_be_bought = itemCollection.where('has_been_bought', '==', false);
    return items_yet_to_be_bought.orderBy('added_to_list_on').onSnapshot(snapshot => {
      onUpdate(snapshotToShoppingListItemArray(snapshot, shoppingList));
    }, onError);
  };
}

export function _saveShoppingListItem(firestore: firebase.firestore.Firestore) {
  return async function({ id, list, ...attributes }: Searchable<ShoppingListItem>) {
    const itemsCollection = collection(firestore, list);
    const item = itemsCollection.doc(id);
    await item.set(attributes);
  };
}

export function _searchForItems(firestore: firebase.firestore.Firestore) {
  return async function(shoppingList: ShoppingList, search: string) {
    const itemCollection = collection(firestore, shoppingList);
    const snapshot = await itemCollection.where('search_queries', 'array-contains', search).get();
    return snapshotToShoppingListItemArray(snapshot, shoppingList);
  };
}

export function _readdShoppingListItem(firestore: firebase.firestore.Firestore) {
  return async function({ list, id }: ShoppingListItem) {
    await collection(firestore, list).doc(id).update({
      has_been_bought: false,
    });
  };
}

function collection(firestore: firebase.firestore.Firestore, shoppingList: ShoppingList) {
  return firestore.collection(`shopping-list/${shoppingList.id}/items`);
}

interface ShoppingListItemRecord {
  name: string;
  has_been_bought: boolean;
  added_to_list_on: firebase.firestore.Timestamp;
  quantity: ItemQuantity | null;
};

function snapshotToShoppingListItemArray(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, shoppingList: ShoppingList) {
  return snapshot.docs.map(document => {
    const { name, has_been_bought, added_to_list_on, quantity } = document.data() as ShoppingListItemRecord;
    return {
      name, has_been_bought, quantity,
      added_to_list_on: added_to_list_on.toDate(),
      id: document.id,
      list: shoppingList
    };
  });
}
