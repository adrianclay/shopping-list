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
