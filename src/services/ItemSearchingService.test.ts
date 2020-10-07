import { Searchable, searchForItems, searchingAddShoppingListItem, searchingUpdateItem } from "./ItemSearchingService";
import ShoppingList from "../domain/ShoppingList";
import { ItemToAdd } from "../AddItemForm";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingListItemFactory from "../factories/ShoppingListItem";

const shoppingListDummy : ShoppingList = {
  id: '',
  name: '',
  owner_uids: []
};

const itemStoreSpy = {
  addShoppingListItem: jest.fn(),
  updateItem: jest.fn(),
  searchForItems: jest.fn(),
};

beforeEach(() => {
  itemStoreSpy.addShoppingListItem.mockClear();
  itemStoreSpy.updateItem.mockClear();
  itemStoreSpy.searchForItems.mockClear();
});

describe('adding an item', () => {
  const addShoppingListItem = (name: string) => searchingAddShoppingListItem(itemStoreSpy.addShoppingListItem)({ name, list: shoppingListDummy });

  test('with one single letter word name', () => {
    addShoppingListItem('C');
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c'] }));
  });

  test('with one two letter word name', () => {
    addShoppingListItem('Ca');
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca'] }));
  });

  test('with one three letter word name', () => {
    addShoppingListItem('Can');
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can'] }));
  });

  test('with one eleven letter word name', () => {
    addShoppingListItem('Candlestick');
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can', 'cand', 'candl'] }));
  });

  test('with two one letter words name', () => {
    addShoppingListItem('a z');
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });

  test('with leading and trailing spaces', () => {
    addShoppingListItem(' a  z ');
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });
});

describe('updating an item', () => {
  test('with one five letter word', () => {
    searchingUpdateItem(itemStoreSpy.updateItem)(ShoppingListItemFactory.build({ name: 'Cream' }));
    expect(itemStoreSpy.updateItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'cr', 'cre', 'crea', 'cream'] }));
  });
});

describe('searching for items', () => {
  test('passes short search terms through to itemStore', () => {
    searchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'a');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });

  test('trims long searches down to 5 letters', () => {
    searchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'fantastic');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'fanta');
  });

  test('lowercases search term', () => {
    searchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'A');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });

  test('searches using only the first word', () => {
    searchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'a b');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });
});

describe('adding an item and searching for it back', () => {
  const inMemoryItemStore = {
    next_id: 0,
    items: new Array<Searchable<ShoppingListItem>>(),
    addShoppingListItem: function(item: Searchable<ItemToAdd>) {
      const x: Searchable<ShoppingListItem> = {
        ...item,
        has_been_bought: false,
        added_to_list_on: new Date(),
        quantity: null,
        id: (inMemoryItemStore.next_id++).toString()
      };
      inMemoryItemStore.items.push(x);
      return Promise.resolve(x);
    },
    updateItem: function(item: Searchable<ShoppingListItem>) {
      throw new Error();
    },
    searchForItems: function(list: ShoppingList, name: string) {
      const filteredResults = inMemoryItemStore.items.filter(i => i.list == list && i.search_queries.includes(name));
      return Promise.resolve(filteredResults);
    }
  };
  let addedItem: ShoppingListItem;

  beforeAll(async () => {
    addedItem = await searchingAddShoppingListItem(inMemoryItemStore.addShoppingListItem)({
      name: 'Soup in a can',
      list: shoppingListDummy,
    });
  });

  const prefixesOf = function(s: string) {
    const prefixes = Array<string>();
    for(let i = 1; i <= s.length; i++){
      prefixes.push(s.substr(0, i));
    }
    return prefixes;
  };

  test.each(prefixesOf('Soup in a can'))('Searching with prefix "%s" returns the item', async (prefix) => {
    expect(await searchForItems(inMemoryItemStore.searchForItems)(shoppingListDummy, prefix)).toEqual([addedItem]);
  });
});
