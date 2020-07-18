import ItemSearchingService from "./ItemSearchingService";

const persistanceSpy = {
  addShoppingListItem: jest.fn(),
  updateItem: jest.fn(),
};
const itemSearchingService = new ItemSearchingService(persistanceSpy);

beforeEach(() => {
  persistanceSpy.addShoppingListItem.mockClear();
  persistanceSpy.updateItem.mockClear();
});

describe('adding an item', () => {
  test('with one single letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'C' });
    expect(persistanceSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c'] }));
  });

  test('with one two letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'Ca' });
    expect(persistanceSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca'] }));
  });

  test('with one three letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'Can' });
    expect(persistanceSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can'] }));
  });

  test('with one eleven letter word name', () => {
    itemSearchingService.addShoppingListItem({ name: 'Candlestick' });
    expect(persistanceSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'ca', 'can', 'cand', 'candl'] }));
  });

  test('with two one letter words name', () => {
    itemSearchingService.addShoppingListItem({ name: 'a z' });
    expect(persistanceSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });

  test('with leading and trailing spaces', () => {
    itemSearchingService.addShoppingListItem({ name: ' a  z ' });
    expect(persistanceSpy.addShoppingListItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['a', 'z'] }));
  });
});

describe('updating an item', () => {
  test('with one five letter word', () => {
    itemSearchingService.updateItem({ name: 'Cream' });
    expect(persistanceSpy.updateItem).toHaveBeenLastCalledWith(expect.objectContaining({ search_queries: ['c', 'cr', 'cre', 'crea', 'cream'] }));
  });
});
