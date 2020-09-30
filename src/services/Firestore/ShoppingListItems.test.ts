import { clearFirestoreData } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListItem from "../../domain/ShoppingListItem";
import FirestoreService from "../FirestoreService";
import { Searchable } from "../ItemSearchingService";
import { withAliceAuthenticated, alice, assertAliceCant, jeff, projectId, loginToFirestoreAs } from "./setup";
import { _createShoppingList } from "./ShoppingLists";

function fetchShoppingListItems(firestoreService: FirestoreService, list: ShoppingList) {
  return new Promise<ShoppingListItem[]>((resolve, reject) => {
    const unsubscribe = firestoreService.subscribeToItemChanges(list, items => {
      unsubscribe();
      resolve(items);
    }, reject);
  });
}

afterEach(async () => {
  await clearFirestoreData({ projectId });
});

describe('Creating a Shopping list item', () => {
  let shoppingList: ShoppingList;
  let createdItem: ShoppingListItem;

  beforeEach(async () => {
    await loginToFirestoreAs(async firestore => {
      shoppingList = await _createShoppingList(firestore)({ name: 'Party shopping list', owner_uids: [alice.uid] });
      createdItem = await new FirestoreService(firestore.app).addShoppingListItem({
        name: 'Crisps',
        list: shoppingList,
        search_queries: ['c']
      });
    }, alice)
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

    it('does not retreive it back', () =>
      expect(withAliceAuthenticated(
        firestoreService => fetchShoppingListItems(firestoreService, shoppingList)
      )).resolves.toEqual([])
    );

    it('can still be searched for', () =>
      expect(withAliceAuthenticated(firestoreService =>
        firestoreService.searchForItems(shoppingList, 'c')
      )).resolves.toEqual([expect.objectContaining(createdItem)])
    );

    describe('readding the item', () => {
      beforeEach(() =>
        withAliceAuthenticated(firestoreService =>
          firestoreService.readdShoppingListItem(createdItem)
        )
      );

      it('retrieves it back', () =>
        expect(withAliceAuthenticated(
          firestoreService => fetchShoppingListItems(firestoreService, shoppingList))
        ).resolves.toEqual([expect.objectContaining(createdItem)])
      );
    });
  });

  describe('updating it with new name and quantity', () => {
    let updatedItem: Searchable<ShoppingListItem>;

    beforeEach(async () => {
      updatedItem = {
        ...createdItem,
        name: 'Brand new name',
        search_queries: ['new'],
        quantity: {
          scalar: 100
        }
      };
      await withAliceAuthenticated(firestoreService => firestoreService.updateItem(updatedItem));
    });

    it('retrieves it back with the new name and quantity', () =>
      expect(withAliceAuthenticated(
        firestoreService => fetchShoppingListItems(firestoreService, shoppingList))
      ).resolves.toEqual([
        expect.objectContaining({
          name: 'Brand new name',
          quantity: { scalar: 100 }
        })
      ])
    );

    it('retrieves it back when searching with new search query', () =>
      expect(withAliceAuthenticated(firestoreService =>
        firestoreService.searchForItems(shoppingList, 'new')
      )).resolves.toEqual([expect.objectContaining({name: 'Brand new name'})])
    );
  });

  it('retrieves it back, when searching', () =>
    expect(withAliceAuthenticated(firestoreService =>
      firestoreService.searchForItems(shoppingList, 'c')
    )).resolves.toEqual([expect.objectContaining(createdItem)])
  );

  it('does not retrieve it back, when searching with non-matching search', () =>
    expect(withAliceAuthenticated(firestoreService =>
      firestoreService.searchForItems(shoppingList, 'z')
    )).resolves.toEqual([])
  );

  it('retrieves it back, when querying by the matching list', () =>
    expect(withAliceAuthenticated(
      firestoreService => fetchShoppingListItems(firestoreService, shoppingList))
    ).resolves.toEqual([expect.objectContaining(createdItem)])
  );

  it('does not retrieve it back, when querying with a different list', async () => {
    await loginToFirestoreAs(async firestore => {
      const notMatchingShoppingList = await _createShoppingList(firestore)({
        name: 'Not the party list',
        owner_uids: [alice.uid]
      });

      await expect(fetchShoppingListItems(new FirestoreService(firestore.app), notMatchingShoppingList)).resolves.toEqual([]);
    }, alice);
  });
});

describe('Creating 10 shopping list items', () => {
  const orderedListNames = new Array(10).fill(0).map((_, index) => `Item ${index}`);

  let list: ShoppingList;

  beforeEach(() => loginToFirestoreAs(async firestore => {
    list = await _createShoppingList(firestore)({
      name: 'Multi-item list',
      owner_uids: [alice.uid]
    });

    for(const name of orderedListNames) {
      await new FirestoreService(firestore.app).addShoppingListItem({ name, list, search_queries: [] });
    }
  }, alice));

  it('retrieves them back in the same order', async () => {
    const items = await withAliceAuthenticated(firestoreService => fetchShoppingListItems(firestoreService, list));
    expect(items.map(i => i.name)).toEqual(orderedListNames);
  });
});

describe('firebase.rules', () => {
  let jeffsShoppingList: ShoppingList;
  let jeffsShoppingItem: ShoppingListItem;
  beforeEach(async () => {
    await loginToFirestoreAs(async firestore => {
      jeffsShoppingList = await _createShoppingList(firestore)({ name: 'List of Jeff', owner_uids: [jeff.uid] });
      jeffsShoppingItem = await new FirestoreService(firestore.app).addShoppingListItem({ name: 'Crab stick', list: jeffsShoppingList, search_queries: ['crab'] });
    }, jeff);
  });

  const nonExistentList: ShoppingList = {
    id: 'fake-list',
    name: 'Big old fake list',
    owner_uids: [alice.uid]
  };

  it('Does not read items a different users list', () =>
    assertAliceCant(firestoreService => fetchShoppingListItems(firestoreService, jeffsShoppingList))
  );

  it('Does not read items from a non-existent list', () =>
    assertAliceCant(firestoreService => fetchShoppingListItems(firestoreService, nonExistentList))
  );

  it('Does not allow creating items for a different users list', () =>
    assertAliceCant(firestoreService =>
      firestoreService.addShoppingListItem({
        name: 'Devils apple',
        list: jeffsShoppingList,
        search_queries: ['apple']
      })
    )
  );

  it('Does not allow creating items for a non-existent list', () =>
    assertAliceCant(firestoreService =>
      firestoreService.addShoppingListItem({
        name: 'Devils apple',
        list: nonExistentList,
        search_queries: ['apple']
      })
    )
  );

  it('Does not allow deleting items for a different users list', () =>
    assertAliceCant(firestoreService => firestoreService.deleteItem(jeffsShoppingItem))
  );

  it('Does not allow updating items for a different users list', () =>
    assertAliceCant(firestoreService => firestoreService.updateItem({
      ...jeffsShoppingItem,
      search_queries: ['alices malicious update']
    }))
  );
});
