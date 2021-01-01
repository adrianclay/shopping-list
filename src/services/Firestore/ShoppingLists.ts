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

export function _getShoppingList(firestore: firebase.firestore.Firestore) {
  return function(listId: string, onUpdate: (list: ShoppingList | null) => void, onError: (error: Error) => void) : () => void {
    const shoppingListsFilteredById = collection(firestore).doc(listId);
    return shoppingListsFilteredById.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const document = snapshot.data() as ShoppingListRecord;
        const item = {
          id: snapshot.id,
          ...document
        };
        onUpdate(item);
      } else {
        onUpdate(null);
      }
    }, error => {
      // A 401/404 should give the same error message for the user.
      // The current Firestore rules create a permission denied if the document doesn't exist.
      // TODO: Make this firestore specific quirk more generic.
      if(error.code === 'permission-denied') {
        onUpdate(null);
      } else{
        onError(error);
      }
    });
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
