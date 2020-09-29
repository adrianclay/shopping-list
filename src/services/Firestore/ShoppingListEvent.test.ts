import { assertFails, clearFirestoreData, initializeTestApp } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListFactory from "../../factories/ShoppingList";
import ShoppingListEventFactory from "../../factories/ShoppingListEvent";
import { fetchFromRealtimeService } from "../../setupTests";
import FirestoreService from "../FirestoreService";
import { _createEvent, _listEvents } from "./ShoppingListEvent";

const projectId = "cheezey";
afterEach(async () => {
  await clearFirestoreData({ projectId });
});

afterAll(() => firebase.delete());

const jacob = {
  uid: 'jacob'
};
const firebase = initializeTestApp({ projectId, auth: jacob });
const createEvent = _createEvent(firebase.firestore());
const listEvents = _listEvents(firebase.firestore());

let jacobsShoppingList: ShoppingList;

beforeEach(async () => {
  jacobsShoppingList = await (new FirestoreService(firebase)).addShoppingList(
    ShoppingListFactory.build({
      owner_uids: [jacob.uid]
    })
  );
});

test('Creating an event, is returned back', async () => {
  const event = ShoppingListEventFactory.build({
    list: jacobsShoppingList,
  });

  createEvent(event);

  return expect(fetchFromRealtimeService(listEvents, jacobsShoppingList)).resolves.toEqual([event]);
});

describe('firebase.rules', () => {
  const eve = { uid: 'eve' };
  const firebase = initializeTestApp({ projectId, auth: eve });
  const createEvent = _createEvent(firebase.firestore());
  const listEvents = _listEvents(firebase.firestore());

  test('Eve reading Jacobs shopping list events, fails', () =>
    assertFails(fetchFromRealtimeService(
      listEvents,
      jacobsShoppingList
    ))
  );

  test('Eve creating an event in Jacobs shopping list, fails', () =>
    assertFails(createEvent(ShoppingListEventFactory.build({
      list: jacobsShoppingList,
    })))
  );

  afterAll(() => firebase.delete());
});
