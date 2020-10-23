import { assertFails, clearFirestoreData } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListFactory from "../../factories/ShoppingList";
import ShoppingListEventFactory from "../../factories/ShoppingListEvent";
import { fetchFromRealtimeService } from "../../setupTests";
import { jeff, withAliceAuthenticated, withJeffAuthenticated, projectId } from "./setup";
import { _createEvent, _listEvents } from "./ShoppingListEvent";
import { _createShoppingList } from "./ShoppingLists";

afterEach(async () => {
  await clearFirestoreData({ projectId });
});

let jeffsShoppingList: ShoppingList;
beforeEach(() =>
  withJeffAuthenticated(async firebase => {
    jeffsShoppingList = await _createShoppingList(firebase)(
      ShoppingListFactory.build({
        owner_uids: [jeff.uid]
      })
    )
  })
);

test('Creating an event, is returned back', async () => {
  const event = ShoppingListEventFactory.build({
    list: jeffsShoppingList,
  });

  return expect(withJeffAuthenticated(async firestore => {
    await _createEvent(firestore)(event);
    return fetchFromRealtimeService(_listEvents(firestore), jeffsShoppingList)
  })).resolves.toEqual([event]);
});

const createEventWithTimestamp = (firestore: firebase.firestore.Firestore, timestamp: number) =>
  _createEvent(firestore)(ShoppingListEventFactory.build({ list: jeffsShoppingList, created_on: new Date(timestamp) }));

const listEventsTimestamps = async (firestore: firebase.firestore.Firestore) =>
  (await fetchFromRealtimeService(_listEvents(firestore), jeffsShoppingList)).map(e => e.created_on.valueOf())

test('listEvents are returned in reverse chronological order', () => withJeffAuthenticated(async firestore => {
  await Promise.all([
    createEventWithTimestamp(firestore, 100),
    createEventWithTimestamp(firestore, 300),
    createEventWithTimestamp(firestore, 200),
  ]);

  return expect(listEventsTimestamps(firestore)).resolves.toEqual([300, 200, 100]);
}));

test('listEvents returns the most recent 10 events', () => withJeffAuthenticated(async firestore => {
  await createEventWithTimestamp(firestore, Date.now() - 100);

  const recent_timestamps = new Array(10).fill(Date.now());
  await Promise.all(recent_timestamps.map(timestamp => createEventWithTimestamp(firestore, timestamp)));

  return expect(listEventsTimestamps(firestore)).resolves.toEqual(recent_timestamps);
}));

describe('firebase.rules', () => {
  test('Alice reading Jeffs shopping list events, fails', () =>
    assertFails(withAliceAuthenticated(
      firebase => fetchFromRealtimeService(_listEvents(firebase), jeffsShoppingList)
    ))
  );

  test('Alice creating an event in Jeffs shopping list, fails', () =>
    assertFails(withAliceAuthenticated(
      firebase => _createEvent(firebase)(ShoppingListEventFactory.build({
        list: jeffsShoppingList,
      }))
    ))
  );
});
