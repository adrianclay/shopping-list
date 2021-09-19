import { Firestore, collection as col, limit, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import { RealtimeService } from "../../useService";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListEvent from "../../domain/ShoppingListEvent";

export function _listEvents(firestore: Firestore) : RealtimeService<ShoppingList, ShoppingListEvent[]> {
  return function(shoppingList, onUpdate, onError) {
    const q = query(collection(firestore, shoppingList), orderBy('created_on', 'desc'), limit(10));
    return onSnapshot(q, snapshot => {
      onUpdate(snapshot.docs.map(d => {
        const { created_on, item, type } = d.data();
        return {
          type,
          item,
          list: shoppingList,
          created_on: created_on.toDate()
        } as ShoppingListEvent;
      }));
    }, onError);
  }
}

export function _createEvent(firestore: Firestore) {
  return function createEvent({list, ...event}: ShoppingListEvent) {
    return addDoc(collection(firestore, list), {
      ...event,
    });
  };
};

function collection(firestore: Firestore, list: ShoppingList) {
  return col(firestore, `shopping-list/${list.id}/events`);
}
