import { AddShoppingListRequest } from "../../CreateShoppingListForm";
import ShoppingList from "../../domain/ShoppingList";
import User from "../../domain/User";
import { RealtimeService } from "../../useService";

interface ShoppingListRecord {
  name: string;
  owner_uids: string[];
}

export function _listShoppingLists(firestore: firebase.firestore.Firestore) : RealtimeService<User, ShoppingList[]> {
  return function(loggedInUser: User, onUpdate: (items: ShoppingList[]) => void, onError: (error: Error) => void): () => void {
    const shoppingListsFilteredByLoggedInUser = collection(firestore).where('owner_uids', 'array-contains', loggedInUser.uid);
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
}

export function _createShoppingList(firestore: firebase.firestore.Firestore) {
  return async function(list: AddShoppingListRequest) {
    const docReference = await collection(firestore).add(list);
    return {
      ...list,
      id: docReference.id,
    };
  }
}

function collection(firestore: firebase.firestore.Firestore) {
  return firestore.collection('shopping-list');
}
