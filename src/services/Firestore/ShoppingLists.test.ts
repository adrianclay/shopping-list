import { clearFirestoreData } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import User from "../../domain/User";
import FirestoreService from "../FirestoreService";
import { alice, withAliceAuthenticated, withJeffAuthenticated, jeff, assertAliceCant, assertUnauthenticatedCant, projectId } from "./setup";

describe('When Alice creates a shopping list', () => {
  let addedShoppingList: ShoppingList;
  const shoppingListRecord = {
    name: 'Adrians fantastic shopping list',
    owner_uids: [alice.uid]
  };

  beforeEach(async () => {
    await withAliceAuthenticated(async firestoreService => {
      addedShoppingList = await firestoreService.addShoppingList(shoppingListRecord);
    });
  });

  it('created record contains same data passed in', () => {
    expect(addedShoppingList).toEqual(expect.objectContaining(shoppingListRecord));
  });

  it('created recor contains an id field', () => {
    expect(addedShoppingList.id).toBeTruthy();
  });

  it('can retrieve it back, when querying alices lists', () =>
    expect(withAliceAuthenticated(
      firestoreService => fetchShoppingLists(firestoreService, alice)
    )).resolves.toEqual([addedShoppingList])
  );

  it('does not retrieve it back, when querying jeffs list', () =>
    expect(withJeffAuthenticated(
      firestoreService => fetchShoppingLists(firestoreService, jeff)
    )).resolves.toEqual([])
  );
});

describe('firebase.rules', () => {
  it('Does not create, where the owner_uid does not match who is logged in', () =>
    assertAliceCant(firestoreService =>
      firestoreService.addShoppingList({
        name: "This list should not be created",
        owner_uids: ['not_alice'],
      })
    )
  );

  it('Does not create, where the user is unauthenticated', () =>
    assertUnauthenticatedCant(firestoreService =>
      firestoreService.addShoppingList({
        name: 'This list should not be created',
        // @ts-expect-error
        owner_uids: null,
      })
    )
  );

  it('Does not read a different users lists', () =>
    assertAliceCant(firestoreService => fetchShoppingLists(firestoreService, jeff))
  );
});

function fetchShoppingLists(firestoreService: FirestoreService, user: User) {
  return new Promise<ShoppingList[]>((resolve, reject) => {
    const unsubscribe = firestoreService.subscribeToListChanges(user, lists => {
      unsubscribe();
      resolve(lists);
    }, reject);
  });
}

afterEach(async () => {
  await clearFirestoreData({ projectId });
});
