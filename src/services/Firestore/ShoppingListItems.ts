import * as firebase from "firebase/app";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListItem from "../../domain/ShoppingListItem";
import { RealtimeService } from "../../useService";
import { Searchable } from "../ItemSearchingService";
import { ItemToAdd } from "../../AddItemForm";

export function _listShoppingListItems(firestore: firebase.firestore.Firestore) : RealtimeService<ShoppingList, ShoppingListItem[]> {
  return function(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void {
    const itemCollection = collection(firestore, shoppingList);
    const undeletedItems = itemCollection.where('deleted', '==', false)
    return undeletedItems.orderBy('created_on').onSnapshot(snapshot => {
      onUpdate(snapshotToShoppingListItemArray(snapshot, shoppingList));
    }, onError);
  };
}

export function _addShoppingListItem(firestore: firebase.firestore.Firestore) {
  return async function({ name, list, search_queries }: Searchable<ItemToAdd>): Promise<ShoppingListItem> {
    const { id } = await collection(firestore, list).add({
      name,
      search_queries,
      created_on: firebase.firestore.FieldValue.serverTimestamp(),
      deleted: false,
    });

    return {
      list, name, id
    };
  };
}

export function _updateShoppingListItem(firestore: firebase.firestore.Firestore) {
  return async function({ id, list, ...attributes }: Searchable<ShoppingListItem>) {
    const itemsCollection = collection(firestore, list);
    const item = itemsCollection.doc(id);
    await item.update(attributes);
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
      deleted: false
    });
  };
}

export function _deleteShoppingListItem(firestore: firebase.firestore.Firestore) {
  return async function(shoppingListItem: ShoppingListItem) {
    const item = collection(firestore, shoppingListItem.list).doc(shoppingListItem.id);
    await item.update({ deleted: true });
  };
}

function collection(firestore: firebase.firestore.Firestore, shoppingList: ShoppingList) {
  return firestore.collection(`shopping-list/${shoppingList.id}/items`);
}

function snapshotToShoppingListItemArray(snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>, shoppingList: ShoppingList) {
  return snapshot.docs.map(document => {
    return {
      ...document.data() as { name: string; },
      id: document.id,
      list: shoppingList
    };
  });
}
