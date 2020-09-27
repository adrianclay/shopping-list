import { RealtimeService } from "../../useService";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListEvent from "../../domain/ShoppingListEvent";

export function _listEvents(firestore: firebase.firestore.Firestore) : RealtimeService<ShoppingList, ShoppingListEvent[]> {
  return function(shoppingList, onUpdate, onError) {
    const eventCollection = firestore.collection(`shopping-list/${shoppingList.id}/events`);
    return eventCollection.onSnapshot(snapshot => {
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

export function _createEvent(firestore: firebase.firestore.Firestore) {
  return function createEvent({list, ...event}: ShoppingListEvent) {
    return firestore.collection(`shopping-list/${list.id}/events`).add({
      ...event,
    });
  };
};
