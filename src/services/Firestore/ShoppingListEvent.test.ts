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

test('listEvents are returned in reverse chronological order', () => withJeffAuthenticated(async firestore => {
  await Promise.all([
    _createEvent(firestore)(ShoppingListEventFactory.build({ list: jeffsShoppingList, created_on: new Date(100) })),
    _createEvent(firestore)(ShoppingListEventFactory.build({ list: jeffsShoppingList, created_on: new Date(300) })),
    _createEvent(firestore)(ShoppingListEventFactory.build({ list: jeffsShoppingList, created_on: new Date(200) })),
  ]);

  const events = await fetchFromRealtimeService(_listEvents(firestore), jeffsShoppingList);

  expect(events.map(e => e.created_on.getMilliseconds())).toEqual([300, 200, 100]);
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
