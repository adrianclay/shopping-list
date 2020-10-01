import { assertFails, clearFirestoreData } from "@firebase/rules-unit-testing";
import ShoppingList from "../../domain/ShoppingList";
import ShoppingListItem from "../../domain/ShoppingListItem";
import { fetchFromRealtimeService } from "../../setupTests";
import { Searchable } from "../ItemSearchingService";
import { alice, jeff, projectId, withAliceAuthenticated, withJeffAuthenticated } from "./setup";
import { _addShoppingListItem, _deleteShoppingListItem, _listShoppingListItems, _readdShoppingListItem, _searchForItems, _updateShoppingListItem } from "./ShoppingListItems";
import { _createShoppingList } from "./ShoppingLists";

afterEach(async () => {
  await clearFirestoreData({ projectId });
});

describe('Creating a Shopping list item', () => {
  let shoppingList: ShoppingList;
  let createdItem: ShoppingListItem;

  beforeEach(async () => {
    await withAliceAuthenticated(async firestore => {
      shoppingList = await _createShoppingList(firestore)({ name: 'Party shopping list', owner_uids: [alice.uid] });
      createdItem = await _addShoppingListItem(firestore)({
        name: 'Crisps',
        list: shoppingList,
        search_queries: ['c']
      });
    })
  });

  it('returns the items id', () => {
    expect(createdItem).toHaveProperty('id');
  });

  describe('deleting it', () => {
    beforeEach(async () => {
      await withAliceAuthenticated(async firestore => {
        await _deleteShoppingListItem(firestore)(createdItem);
      });
    });

    it('does not retreive it back', () =>
      expect(withAliceAuthenticated(
        firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), shoppingList)
      )).resolves.toEqual([])
    );

    it('can still be searched for', () =>
      expect(withAliceAuthenticated(firestore =>
        _searchForItems(firestore)(shoppingList, 'c')
      )).resolves.toEqual([expect.objectContaining(createdItem)])
    );

    describe('readding the item', () => {
      beforeEach(() =>
        withAliceAuthenticated(firestore =>
          _readdShoppingListItem(firestore)(createdItem)
        )
      );

      it('retrieves it back', () =>
        expect(withAliceAuthenticated(
          firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), shoppingList)
        )).resolves.toEqual([expect.objectContaining(createdItem)])
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
      await withAliceAuthenticated(firestore => _updateShoppingListItem(firestore)(updatedItem));
    });

    it('retrieves it back with the new name and quantity', () =>
      expect(withAliceAuthenticated(
        firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), shoppingList)
      )).resolves.toEqual([
        expect.objectContaining({
          name: 'Brand new name',
          quantity: { scalar: 100 }
        })
      ])
    );

    it('retrieves it back when searching with new search query', () =>
      expect(withAliceAuthenticated(firestore =>
        _searchForItems(firestore)(shoppingList, 'new')
      )).resolves.toEqual([expect.objectContaining({name: 'Brand new name'})])
    );
  });

  it('retrieves it back, when searching', () =>
    expect(withAliceAuthenticated(firestore =>
      _searchForItems(firestore)(shoppingList, 'c')
    )).resolves.toEqual([expect.objectContaining(createdItem)])
  );

  it('does not retrieve it back, when searching with non-matching search', () =>
    expect(withAliceAuthenticated(firestore =>
      _searchForItems(firestore)(shoppingList, 'z')
    )).resolves.toEqual([])
  );

  it('retrieves it back, when querying by the matching list', () =>
    expect(withAliceAuthenticated(
      firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), shoppingList)
    )).resolves.toEqual([expect.objectContaining(createdItem)])
  );

  it('does not retrieve it back, when querying with a different list', async () => {
    await withAliceAuthenticated(async firestore => {
      const notMatchingShoppingList = await _createShoppingList(firestore)({
        name: 'Not the party list',
        owner_uids: [alice.uid]
      });

      await expect(fetchFromRealtimeService(_listShoppingListItems(firestore), notMatchingShoppingList)).resolves.toEqual([]);
    });
  });
});

describe('Creating 10 shopping list items', () => {
  const orderedListNames = new Array(10).fill(0).map((_, index) => `Item ${index}`);

  let list: ShoppingList;

  beforeEach(() => withAliceAuthenticated(async firestore => {
    list = await _createShoppingList(firestore)({
      name: 'Multi-item list',
      owner_uids: [alice.uid]
    });

    for(const name of orderedListNames) {
      await _addShoppingListItem(firestore)({ name, list, search_queries: [] });
    }
  }));

  it('retrieves them back in the same order', async () => {
    const items = await withAliceAuthenticated(firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), list));
    expect(items.map(i => i.name)).toEqual(orderedListNames);
  });
});

describe('firebase.rules', () => {
  let jeffsShoppingList: ShoppingList;
  let jeffsShoppingItem: ShoppingListItem;
  beforeEach(async () => {
    await withJeffAuthenticated(async firestore => {
      jeffsShoppingList = await _createShoppingList(firestore)({ name: 'List of Jeff', owner_uids: [jeff.uid] });
      jeffsShoppingItem = await _addShoppingListItem(firestore)({ name: 'Crab stick', list: jeffsShoppingList, search_queries: ['crab'] });
    });
  });

  const nonExistentList: ShoppingList = {
    id: 'fake-list',
    name: 'Big old fake list',
    owner_uids: [alice.uid]
  };

  it('Does not read items a different users list', () =>
    assertFails(withAliceAuthenticated(firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), jeffsShoppingList)))
  );

  it('Does not read items from a non-existent list', () =>
    assertFails(withAliceAuthenticated(firestore => fetchFromRealtimeService(_listShoppingListItems(firestore), nonExistentList)))
  );

  it('Does not allow creating items for a different users list', () =>
    assertFails(withAliceAuthenticated(firestore =>
      _addShoppingListItem(firestore)({
        name: 'Devils apple',
        list: jeffsShoppingList,
        search_queries: ['apple']
      })
    ))
  );

  it('Does not allow creating items for a non-existent list', () =>
    assertFails(withAliceAuthenticated(firestore =>
      _addShoppingListItem(firestore)({
        name: 'Devils apple',
        list: nonExistentList,
        search_queries: ['apple']
      })
    ))
  );

  it('Does not allow deleting items for a different users list', () =>
    assertFails(withAliceAuthenticated(firebase => _deleteShoppingListItem(firebase)(jeffsShoppingItem)))
  );

  it('Does not allow updating items for a different users list', () =>
    assertFails(withAliceAuthenticated(firestore => _updateShoppingListItem(firestore)({
      ...jeffsShoppingItem,
      search_queries: ['alices malicious update']
    })))
  );
});