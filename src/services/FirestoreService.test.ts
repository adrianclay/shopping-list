import {initializeTestApp, firestore} from "@firebase/testing";
import FirestoreService from './FirestoreService'
import { emptyCollection } from "../setupTests";

const firebase = initializeTestApp({
  projectId: 'my-test-project',
  auth: { uid: 'alice', email: 'alice@example.com' }
});
const firestoreService = new FirestoreService(firebase);

const onError = () => {
  throw new Error();
};

it('Creates a shopping list and retrieves it back', async (done) => {
  const addedShoppingList = await firestoreService.addShoppingList({
    name: 'Adrians fantastic shopping list'
  });

  const unsubscribe = firestoreService.subscribeToListChanges((lists) => {
    unsubscribe();
    expect(lists).toEqual([addedShoppingList]);
    done();
  }, onError)
})

describe('Creating a Shopping list item', () => {
  const shoppingList = {
    id: 'partylist',
    name: 'Party shopping list',
  };

  const expectedItem = {
    name: 'Crisps',
    list: shoppingList
  };

  beforeEach(async () => {
    await firestoreService.addShoppingListItem(expectedItem);
  });

  afterEach(async () => {
    await emptyCollection(firebase, `shopping-list/${shoppingList.id}/shopping-list-items`);
  });

  it('retrieves it back, when querying by the matching list', (done) => {
    const unsubscribe = firestoreService.subscribeToItemChanges(shoppingList, items => {
      unsubscribe();
      expect(items).toEqual([expectedItem]);
      done();
    }, onError);
  });

  it('does not retrieve it back, when querying with a different list', (done) => {
    const notMatchingShoppingList = {
      id: 'notPartyList',
      name: 'Not the party list'
    }

    const unsubscribe = firestoreService.subscribeToItemChanges(notMatchingShoppingList, items => {
      unsubscribe();
      expect(items).toEqual([]);
      done();
    }, onError);
  });
});


afterAll(async () => {
  await emptyCollection(firebase, 'shopping-list');
  firebase.firestore().terminate();
})
