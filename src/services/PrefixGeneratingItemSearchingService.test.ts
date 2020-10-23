import { Searchable, prefixGeneratedSearchForItems, prefixGeneratedSaveItem } from "./PrefixGeneratingItemSearchingService";
import ShoppingList from "../domain/ShoppingList";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingListItemFactory from "../factories/ShoppingListItem";

const shoppingListDummy : ShoppingList = {
  id: '',
  name: '',
  owner_uids: []
};

const itemStoreSpy = {
  saveShoppingListItem: jest.fn(),
  searchForItems: jest.fn(),
};

beforeEach(() => {
  itemStoreSpy.saveShoppingListItem.mockClear();
  itemStoreSpy.searchForItems.mockClear();
});

describe('saving an item', () => {
  const saveShoppingListItem = (name: string) => prefixGeneratedSaveItem(itemStoreSpy.saveShoppingListItem)(ShoppingListItemFactory.build({ name }));

  test('with one single letter word name', () => {
    saveShoppingListItem('C');
    expect(itemStoreSpy.saveShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c'] }));
  });

  test('with one two letter word name', () => {
    saveShoppingListItem('Ca');
    expect(itemStoreSpy.saveShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca'] }));
  });

  test('with one three letter word name', () => {
    saveShoppingListItem('Can');
    expect(itemStoreSpy.saveShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can'] }));
  });

  test('with one eleven letter word name', () => {
    saveShoppingListItem('Candlestick');
    expect(itemStoreSpy.saveShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can', 'cand', 'candl'] }));
  });

  test('with two one letter words name', () => {
    saveShoppingListItem('a z');
    expect(itemStoreSpy.saveShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });

  test('with leading and trailing spaces', () => {
    saveShoppingListItem(' a  z ');
    expect(itemStoreSpy.saveShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });
});

describe('searching for items', () => {
  test('passes short search terms through to itemStore', () => {
    prefixGeneratedSearchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'a');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });

  test('trims long searches down to 5 letters', () => {
    prefixGeneratedSearchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'fantastic');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'fanta');
  });

  test('lowercases search term', () => {
    prefixGeneratedSearchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'A');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });

  test('searches using only the first word', () => {
    prefixGeneratedSearchForItems(itemStoreSpy.searchForItems)(shoppingListDummy, 'a b');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });
});

describe('saving an item and searching for it back', () => {
  const inMemoryItemStore = {
    next_id: 0,
    items: {} as { [Id : string] : Searchable<ShoppingListItem> },
    saveShoppingListItem: function(item: Searchable<ShoppingListItem>) {
      inMemoryItemStore.items[item.id] = item;
      return Promise.resolve();
    },
    searchForItems: function(list: ShoppingList, name: string) {
      const filteredResults = Object.values(inMemoryItemStore.items).filter(i => i.list.id === list.id && i.search_queries.includes(name));
      return Promise.resolve(filteredResults);
    }
  };
  let addedItem: ShoppingListItem;

  beforeAll(async () => {
    addedItem = ShoppingListItemFactory.build({
      name: 'Soup in a can',
      list: shoppingListDummy,
    });
    await prefixGeneratedSaveItem(inMemoryItemStore.saveShoppingListItem)(addedItem);
  });

  const prefixesOf = function(s: string) {
    const prefixes = Array<string>();
    for(let i = 1; i <= s.length; i++){
      prefixes.push(s.substr(0, i));
    }
    return prefixes;
  };

  test.each(prefixesOf('Soup in a can'))('Searching with prefix "%s" returns the item', async (prefix) => {
    expect(await prefixGeneratedSearchForItems(inMemoryItemStore.searchForItems)(shoppingListDummy, prefix)).toEqual([expect.objectContaining(addedItem)]);
  });
});
