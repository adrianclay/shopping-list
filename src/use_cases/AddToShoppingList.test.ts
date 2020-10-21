import ShoppingList from "../domain/ShoppingList";
import ShoppingListEvent from "../domain/ShoppingListEvent";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingListFactory from "../factories/ShoppingList";
import ShoppingListItemFactory from "../factories/ShoppingListItem";
import _AddToShoppingList from "./AddToShoppingList";

const list = ShoppingListFactory.build();
const whiteCabbage = ShoppingListItemFactory.build({ name: 'cabbage white', has_been_bought: true, list });
const redCabbage = ShoppingListItemFactory.build({ name: 'Red cabbage', has_been_bought: true, list });

const searchShoppingListSpy = jest.fn<Promise<ShoppingListItem[]>, [ShoppingList, String]>(() => {
  return Promise.resolve([ redCabbage, whiteCabbage ]);
});
const saveShoppingListItemSpy = jest.fn<Promise<unknown>, [ShoppingListItem]>();
const createShoppingListEventSpy = jest.fn<Promise<unknown>, [ShoppingListEvent]>();
const AddToShoppingList = _AddToShoppingList(searchShoppingListSpy, saveShoppingListItemSpy, createShoppingListEventSpy);

describe('Adding an item which has not been on the list before', () => {
  beforeEach(async () => {
    saveShoppingListItemSpy.mockReset();
    createShoppingListEventSpy.mockReset();

    await AddToShoppingList({ name: 'Jelly babies', list });
  });

  test('does not mark the searched result as to be bought', () => {
    expect(whiteCabbage.has_been_bought).toBe(true);
  });

  describe('The saved shoppingListItem', () => {
    let createdItem: ShoppingListItem;
    beforeEach(() => {
      createdItem = saveShoppingListItemSpy.mock.calls[0][0];
    });

    test('has a generated id', () => {
      expect(createdItem).toHaveProperty('id');
    });

    test('has been populated with the name', () => {
      expect(createdItem).toHaveProperty('name', 'Jelly babies');
    });

    test('has been populated with the list', () => {
      expect(createdItem).toHaveProperty('list', list);
    });

    test('is marked as to be bought', () => {
      expect(createdItem).toHaveProperty('has_been_bought', false);
    });

    test('has a null quantity', () => {
      expect(createdItem).toHaveProperty('quantity', null);
    });
  });

  describe('The generated shoppingListEvent', () => {
    let createdEvent: ShoppingListEvent;
    beforeEach(() => {
      createdEvent = createShoppingListEventSpy.mock.calls[0][0];
    });

    test('has been populated with the list', () => {
      expect(createdEvent).toHaveProperty('list', list);
    });

    test('has the type as item_added', () => {
      expect(createdEvent).toHaveProperty('type', 'item_added');
    });

    test('has the same item id as the saved shoppingListItem', () => {
      expect(createdEvent.item).toHaveProperty('id', saveShoppingListItemSpy.mock.calls[0][0].id);
    });

    test('has the same item name as was passed in', () => {
      expect(createdEvent.item).toHaveProperty('name', 'Jelly babies');
    });
  });

});

describe('Adding an item which already exists', () => {
  beforeEach(async () => {
    saveShoppingListItemSpy.mockReset();
    createShoppingListEventSpy.mockReset();

    await AddToShoppingList({ name: whiteCabbage.name, list });
  });

  test('marks the item as to be bought', () => {
    expect(whiteCabbage.has_been_bought).toBe(false);
  });

  test('saves the cabbage white', () => {
    expect(saveShoppingListItemSpy).toBeCalledTimes(1);
    expect(saveShoppingListItemSpy).toBeCalledWith(whiteCabbage);
  });
});
