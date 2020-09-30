import { assertFails, clearFirestoreData, initializeTestApp } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import { fetchFromRealtimeService } from "../../setupTests";
import { alice, jeff, loginToFirestoreAs, projectId } from "./setup";
import { _createShoppingList, _listShoppingLists } from "./ShoppingLists";

describe('When Alice creates a shopping list', () => {
  let addedShoppingList: ShoppingList;
  const shoppingListRecord = {
    name: 'Adrians fantastic shopping list',
    owner_uids: [alice.uid]
  };

  beforeEach(() =>
    loginToFirestoreAs(async firestore => {
      addedShoppingList = await _createShoppingList(firestore)(shoppingListRecord);
    }, alice)
  );

  it('created record contains same data passed in', () => {
    expect(addedShoppingList).toEqual(expect.objectContaining(shoppingListRecord));
  });

  it('created record contains an id field', () => {
    expect(addedShoppingList.id).toBeTruthy();
  });

  it('can retrieve it back, when querying alices lists', () =>
    expect(loginToFirestoreAs(
      firestore => fetchFromRealtimeService(_listShoppingLists(firestore), alice),
      alice
    )).resolves.toEqual([addedShoppingList])
  );

  it('does not retrieve it back, when querying jeffs list', () =>
    expect(loginToFirestoreAs(
      firestore => fetchFromRealtimeService(_listShoppingLists(firestore), jeff),
      jeff
    )).resolves.toEqual([])
  );
});

describe('firebase.rules', () => {
  it('Does not create, where the owner_uid does not match who is logged in', () =>
    assertFails(loginToFirestoreAs(firestore =>
      _createShoppingList(firestore)({
        name: "This list should not be created",
        owner_uids: ['not_alice'],
      }),
      alice
    ))
  );

  it('Does not create, where the user is unauthenticated', () =>
    assertFails(loginToFirestoreAs(firestore =>
      _createShoppingList(firestore)({
        name: 'This list should not be created',
        // @ts-expect-error
        owner_uids: null,
      }),
      undefined
    ))
  );

  it('Does not read a different users lists', () =>
    assertFails(loginToFirestoreAs(
      firestore => fetchFromRealtimeService(_listShoppingLists(firestore), jeff),
      alice
    ))
  );
});

afterEach(async () => {
  await clearFirestoreData({ projectId });
});
