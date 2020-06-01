import {initializeTestApp, firestore} from "@firebase/testing";
import FirestoreService from './FirestoreService'
import { emptyCollection } from "../setupTests";
import ShoppingList from "../domain/ShoppingList";

const firebase = initializeTestApp({
  projectId: 'my-test-project',
  auth: { uid: 'alice', email: 'alice@example.com' }
});
const firestoreService = new FirestoreService(firebase);

const onError = () => {
  throw new Error();
};

describe('Creating a shopping list', () => {
  const userWhoCreatedList = {
    uid: 'scarlet',
    displayName: 'Scarlet'
  }

  let addedShoppingList: ShoppingList;
  beforeEach(async () => {
    addedShoppingList = await firestoreService.addShoppingList({
      name: 'Adrians fantastic shopping list',
      owner_uid: userWhoCreatedList.uid
    });
  });

  afterEach(async () => {
    await emptyCollection(firebase, 'shopping-list');
  });

  it('can retrieve it back, when querying by user who created list', done => {
    const unsubscribe = firestoreService.subscribeToListChanges(userWhoCreatedList, lists => {
      unsubscribe();
      expect(lists).toEqual([addedShoppingList]);
      done();
    }, onError);
  });

  it('does not retrieve it back, when querying by a different user', done => {
    const notUserWhoCreatedTheList = {
      uid: 'jazzy',
      displayName: 'Jeff'
    };
    const unsubscribe = firestoreService.subscribeToListChanges(notUserWhoCreatedTheList, lists => {
      unsubscribe();
      expect(lists).toEqual([]);
      done();
    }, onError);
  });
});


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
    await emptyCollection(firebase, `shopping-list/${shoppingList.id}/items`);
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
  firebase.firestore().terminate();
})
