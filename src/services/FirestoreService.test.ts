import {initializeTestApp, firestore, clearFirestoreData, assertFails} from "@firebase/testing";
import FirestoreService from './FirestoreService'
import ShoppingList from "../domain/ShoppingList";

const projectId = 'my-test-project';

type FirestoreServiceAction = (firestoreService: FirestoreService) => Promise<void>;

const alice = { uid: 'alice', displayName: 'Alice' };
function withAliceAuthenticated(action: FirestoreServiceAction) {
  return withAuth(action, alice);
}

const jeff = { uid: 'jeff', displayName: 'Jeff' };
function withJeffAuthenticated(action: FirestoreServiceAction) {
  return withAuth(action, jeff);
}

function withUnauthenticated(action: FirestoreServiceAction) {
  return withAuth(action, undefined);
}

async function withAuth(action: FirestoreServiceAction, auth?: { uid: string }) {
  const firebase = initializeTestApp({ projectId, auth });
  const firestoreService = new FirestoreService(firebase);
  try {
    await action(firestoreService);
  } finally {
    firebase.delete();
  }
}

afterEach(async () => {
  await clearFirestoreData({ projectId });
});

describe('Firestore security rules', () => {
  describe('shopping-list', () => {
    it('Does not create, where the owner_uid does not match who is logged in', async () => {
      await assertFails(
        withAliceAuthenticated(async firestoreService => {
          await firestoreService.addShoppingList({
            name: "This list should not be created",
            owner_uid: 'not_alice',
          })
        })
      );
    });

    it('Does not create, where the user is unauthenticated', async () => {
      await assertFails(
        withUnauthenticated(async firestoreService => {
          await firestoreService.addShoppingList({
            name: 'This list should not be created',
            owner_uid: null,
          })
        })
      );
    });

    it('Does not read a different users lists', async () => {
      await assertFails(
        withAliceAuthenticated(async firestoreService =>
          new Promise((resolve, reject) => {
            firestoreService.subscribeToListChanges(jeff, resolve, reject);
          })
        )
      );
    });
  });
});

describe('When Alice creates a shopping list', () => {
  let addedShoppingList: ShoppingList;
  beforeEach(async () => {
    await withAliceAuthenticated(async firestoreService => {
      addedShoppingList = await firestoreService.addShoppingList({
        name: 'Adrians fantastic shopping list',
        owner_uid: alice.uid
      });
    });
  });

  it('can retrieve it back, when querying alices lists', async () => {
    await withAliceAuthenticated(async firestoreService =>
      new Promise((resolve, reject) => {
        const unsubscribe = firestoreService.subscribeToListChanges(alice, lists => {
          unsubscribe();
          expect(lists).toEqual([addedShoppingList]);
          resolve();
        }, reject);
      })
    );
  });

  it('does not retrieve it back, when querying jeffs list', async () => {
    await withJeffAuthenticated(async firestoreService =>
      new Promise((resolve, reject) => {
        const unsubscribe = firestoreService.subscribeToListChanges(jeff, lists => {
          unsubscribe();
          expect(lists).toEqual([]);
          resolve();
        }, reject);
      })
    );
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
    await withAliceAuthenticated(async (firestoreService) => {
      await firestoreService.addShoppingListItem(expectedItem);
    })
  });

  it('retrieves it back, when querying by the matching list', async () => {
    await withAliceAuthenticated(async firestoreService =>
      new Promise((resolve, reject) => {
        const unsubscribe = firestoreService.subscribeToItemChanges(shoppingList, items => {
          unsubscribe();
          expect(items).toEqual([expectedItem]);
          resolve();
        }, reject);
    }));
  });

  it('does not retrieve it back, when querying with a different list', async () => {
    const notMatchingShoppingList = {
      id: 'notPartyList',
      name: 'Not the party list'
    }

    await withAliceAuthenticated(async firestoreService =>
      new Promise((resolve, reject) => {
        const unsubscribe = firestoreService.subscribeToItemChanges(notMatchingShoppingList, items => {
          unsubscribe();
          expect(items).toEqual([]);
          resolve();
        }, reject);
      }));
  });
});
