import { Firestore, collection as col, query, where, orderBy, onSnapshot, Timestamp, doc, setDoc, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListItem from "../../domain/ShoppingListItem";
import { RealtimeService } from "../../useService";
import { Searchable } from "../PrefixGeneratingItemSearchingService";
import ItemQuantity from "../../domain/ItemQuantity";

export function _listShoppingListItems(firestore: Firestore) : RealtimeService<ShoppingList, ShoppingListItem[]> {
  return function(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void {
    const itemCollection = collection(firestore, shoppingList);
    const items_yet_to_be_bought = query(itemCollection, where('has_been_bought', '==', false), orderBy('added_to_list_on'));
    return onSnapshot(items_yet_to_be_bought, snapshot => {
      onUpdate(snapshotToShoppingListItemArray(snapshot, shoppingList));
    }, onError);
  };
}

export function _saveShoppingListItem(firestore: Firestore) {
  return async function({ id, list, ...attributes }: Searchable<ShoppingListItem>) {
    const itemsCollection = collection(firestore, list);
    const item = doc(itemsCollection, id);
    await setDoc(item, attributes);
  };
}

export function _searchForItems(firestore: Firestore) {
  return async function(shoppingList: ShoppingList, search: string) {
    const itemCollection = collection(firestore, shoppingList);
    const snapshot = await getDocs(query(itemCollection, where('search_queries', 'array-contains', search)));
    return snapshotToShoppingListItemArray(snapshot, shoppingList);
  };
}

function collection(firestore: Firestore, shoppingList: ShoppingList) {
  return col(firestore, `shopping-list/${shoppingList.id}/items`);
}

interface ShoppingListItemRecord {
  name: string;
  has_been_bought: boolean;
  added_to_list_on: Timestamp;
  quantity: ItemQuantity | null;
};

function snapshotToShoppingListItemArray(snapshot: QuerySnapshot<DocumentData>, shoppingList: ShoppingList) {
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
