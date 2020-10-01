import { assertFails, clearFirestoreData } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import { fetchFromRealtimeService } from "../../setupTests";
import { alice, jeff, projectId, withAliceAuthenticated, withJeffAuthenticated, withUnauthenticated } from "./setup";
import { _createShoppingList, _listShoppingLists } from "./ShoppingLists";

describe('When Alice creates a shopping list', () => {
  let addedShoppingList: ShoppingList;
  const shoppingListRecord = {
    name: 'Adrians fantastic shopping list',
    owner_uids: [alice.uid]
  };

  beforeEach(() =>
    withAliceAuthenticated(async firestore => {
      addedShoppingList = await _createShoppingList(firestore)(shoppingListRecord);
    })
  );

  it('created record contains same data passed in', () => {
    expect(addedShoppingList).toEqual(expect.objectContaining(shoppingListRecord));
  });

  it('created record contains an id field', () => {
    expect(addedShoppingList.id).toBeTruthy();
  });

  it('can retrieve it back, when querying alices lists', () =>
    expect(withAliceAuthenticated(
      firestore => fetchFromRealtimeService(_listShoppingLists(firestore), alice)
    )).resolves.toEqual([addedShoppingList])
  );

  it('does not retrieve it back, when querying jeffs list', () =>
    expect(withJeffAuthenticated(
      firestore => fetchFromRealtimeService(_listShoppingLists(firestore), jeff)
    )).resolves.toEqual([])
  );
});

describe('firebase.rules', () => {
  it('Does not create, where the owner_uid does not match who is logged in', () =>
    assertFails(withAliceAuthenticated(firestore =>
      _createShoppingList(firestore)({
        name: "This list should not be created",
        owner_uids: ['not_alice'],
      })
    ))
  );

  it('Does not create, where the user is unauthenticated', () =>
    assertFails(withUnauthenticated(firestore =>
      _createShoppingList(firestore)({
        name: 'This list should not be created',
        // @ts-expect-error
        owner_uids: null,
      })
    ))
  );

  it('Does not read a different users lists', () =>
    assertFails(withAliceAuthenticated(
      firestore => fetchFromRealtimeService(_listShoppingLists(firestore), jeff)
    ))
  );
});

afterEach(async () => {
  await clearFirestoreData({ projectId });
});
