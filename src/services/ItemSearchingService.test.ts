import ItemSearchingService, { Searchable } from "./ItemSearchingService";
import ShoppingList from "../domain/ShoppingList";
import { ItemToAdd } from "../AddItemForm";
import ShoppingListItem from "../domain/ShoppingListItem";

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
const itemSearchingService = new ItemSearchingService(itemStoreSpy);

beforeEach(() => {
  itemStoreSpy.addShoppingListItem.mockClear();
  itemStoreSpy.updateItem.mockClear();
  itemStoreSpy.searchForItems.mockClear();
});

describe('adding an item', () => {
  test('with one single letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'C' });
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c'] }));
  });

  test('with one two letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'Ca' });
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca'] }));
  });

  test('with one three letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'Can' });
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can'] }));
  });

  test('with one eleven letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'Candlestick' });
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can', 'cand', 'candl'] }));
  });

  test('with two one letter words name', () => {
    itemSearchingService.addShoppingListItem({ name: 'a z' });
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });

  test('with leading and trailing spaces', () => {
    itemSearchingService.addShoppingListItem({ name: ' a  z ' });
    expect(itemStoreSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });
});

describe('updating an item', () => {
  test('with one five letter word', () => {
    itemSearchingService.updateItem({ name: 'Cream' });
    expect(itemStoreSpy.updateItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'cr', 'cre', 'crea', 'cream'] }));
  });
});

describe('searching for items', () => {
  test('passes short search terms through to itemStore', () => {
    itemSearchingService.searchForItems(shoppingListDummy, 'a');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });

  test('trims long searches down to 5 letters', () => {
    itemSearchingService.searchForItems(shoppingListDummy, 'fantastic');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'fanta');
  });

  test('lowercases search term', () => {
    itemSearchingService.searchForItems(shoppingListDummy, 'A');
    expect(itemStoreSpy.searchForItems).toHaveBeenLastCalledWith(shoppingListDummy, 'a');
  });

  test('searches using only the first word', () => {
    itemSearchingService.searchForItems(shoppingListDummy, 'a b');
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
        id: (this.next_id++).toString()
      };
      this.items.push(x);
      return Promise.resolve(x);
    },
    updateItem: function(item: Searchable<ShoppingListItem>) {
      throw new Error();
    },
    searchForItems: function(list: ShoppingList, name: string) {
      const filteredResults = this.items.filter(i => i.list == list && i.search_queries.includes(name));
      return Promise.resolve(filteredResults);
    }
  };
  const itemSearchingService = new ItemSearchingService(inMemoryItemStore);
  let addedItem: ShoppingListItem;

  beforeAll(async () => {
    addedItem = await itemSearchingService.addShoppingListItem({
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
    expect(await itemSearchingService.searchForItems(shoppingListDummy, prefix)).toEqual([addedItem]);
  });
});
