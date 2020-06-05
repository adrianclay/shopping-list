import {initializeTestApp, clearFirestoreData, assertFails} from "@firebase/testing";
import FirestoreService from './FirestoreService'
import ShoppingList from "../domain/ShoppingList";
import ShoppingListItem from "../domain/ShoppingListItem";

const projectId = 'my-test-project';

type FirestoreServiceAction = (firestoreService: FirestoreService) => Promise<unknown>;

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

const assertAliceCant = (action: FirestoreServiceAction) => assertFails(withAliceAuthenticated(action));

afterEach(async () => {
  await clearFirestoreData({ projectId });
});

describe('Firestore security rules', () => {
  describe('shopping-list', () => {
    it('Does not create, where the owner_uid does not match who is logged in', () =>
      assertAliceCant(firestoreService =>
        firestoreService.addShoppingList({
          name: "This list should not be created",
          owner_uid: 'not_alice',
        })
      )
    );

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

    it('Does not read a different users lists', () =>
      assertAliceCant(async firestoreService =>
        new Promise((resolve, reject) => {
          firestoreService.subscribeToListChanges(jeff, resolve, reject);
        })
      )
    );
  });

  describe('shopping-list/{shoppingList}/items', () => {
    let jeffsShoppingList: ShoppingList;
    let jeffsShoppingItem: ShoppingListItem;
    beforeEach(async () => {
      await withJeffAuthenticated(async firestoreService => {
        jeffsShoppingList = await firestoreService.addShoppingList({ name: 'List of Jeff', owner_uid: jeff.uid });
        jeffsShoppingItem = await firestoreService.addShoppingListItem({ name: 'Crab stick', list: jeffsShoppingList });
      });
    });

    const nonExistentList: ShoppingList = {
      id: 'fake-list',
      name: 'Big old fake list',
      owner_uid: alice.uid
    };

    it('Does not read items a different users list', () =>
      assertAliceCant(firestoreService =>
        new Promise((resolve, reject) => {
          firestoreService.subscribeToItemChanges(jeffsShoppingList, resolve, reject);
        })
      )
    );

    it('Does not read items from a non-existent list', () =>
      assertAliceCant(firestoreService =>
        new Promise((resolve, reject) => {
          firestoreService.subscribeToItemChanges(nonExistentList, resolve, reject);
        })
      )
    );

    it('Does not allow creating items for a different users list', () =>
      assertAliceCant(firestoreService =>
        firestoreService.addShoppingListItem({
          name: 'Devils apple',
          list: jeffsShoppingList,
        })
      )
    );

    it('Does not allow creating items for a non-existent list', () =>
      assertAliceCant(firestoreService =>
        firestoreService.addShoppingListItem({
          name: 'Devils apple',
          list: nonExistentList,
        })
      )
    );

    it('Does not allow deleting items for a different users list', () =>
      assertAliceCant(firestoreService => firestoreService.deleteItem(jeffsShoppingItem))
    );
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
  let shoppingList: ShoppingList;
  let createdItem: ShoppingListItem;

  beforeEach(async () => {
    await withAliceAuthenticated(async (firestoreService) => {
      shoppingList = await firestoreService.addShoppingList({ name: 'Party shopping list', owner_uid: alice.uid });
      createdItem = await firestoreService.addShoppingListItem({
        name: 'Crisps',
        list: shoppingList
      });
    })
  });

  it('returns the items id', () => {
    expect(createdItem).toHaveProperty('id');
  });

  describe('deleting it', () => {
    beforeEach(async () => {
      await withAliceAuthenticated(async firestoreService => {
        await firestoreService.deleteItem(createdItem);
      });
    });

    it('does not retreive it back', async () => {
      await withAliceAuthenticated(async firestoreService => {
        return new Promise((resolve, reject) => {
          const unsubscribe = firestoreService.subscribeToItemChanges(shoppingList, items => {
            unsubscribe();
            expect(items).toEqual([]);
            resolve();
          }, reject);
        });
      });
    });

  });

  it('retrieves it back, when querying by the matching list', async () => {
    await withAliceAuthenticated(async firestoreService =>
      new Promise((resolve, reject) => {
        const unsubscribe = firestoreService.subscribeToItemChanges(shoppingList, items => {
          unsubscribe();
          expect(items).toEqual([createdItem]);
          resolve();
        }, reject);
    }));
  });

  it('does not retrieve it back, when querying with a different list', async () => {
    await withAliceAuthenticated(async firestoreService => {
      const notMatchingShoppingList = await firestoreService.addShoppingList({
        name: 'Not the party list',
        owner_uid: alice.uid
      });

      return new Promise((resolve, reject) => {
        const unsubscribe = firestoreService.subscribeToItemChanges(notMatchingShoppingList, items => {
          unsubscribe();
          expect(items).toEqual([]);
          resolve();
        }, reject);
      });
    });
  });
});
