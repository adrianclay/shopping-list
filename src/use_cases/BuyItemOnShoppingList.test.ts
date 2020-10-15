import ShoppingListEvent from "../domain/ShoppingListEvent";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingListItemFactory from "../factories/ShoppingListItem";
import _BuyItemOnShoppingList from "./BuyItemOnShoppingList";

const saveShoppingListItemSpy = jest.fn<Promise<unknown>, [ShoppingListItem]>();
const createShoppingListEventSpy = jest.fn<Promise<unknown>, [ShoppingListEvent]>();
const BuyItemOnShoppingList = _BuyItemOnShoppingList(saveShoppingListItemSpy, createShoppingListEventSpy);
const shoppingListItem = ShoppingListItemFactory.build();

beforeEach(async () => {
  saveShoppingListItemSpy.mockReset();
  createShoppingListEventSpy.mockReset();

  await BuyItemOnShoppingList(shoppingListItem);
});

describe('The saved shoppingListItem', () => {
  let updatedItem: ShoppingListItem;
  beforeEach(() => {
    updatedItem = saveShoppingListItemSpy.mock.calls[0][0];
  });

  test('is called with has_been_bought set to true', () => {
    expect(updatedItem).toHaveProperty('has_been_bought', true);
  });
});

describe('The generated shoppingListEvent', () => {
  let createdEvent: ShoppingListEvent;
  beforeEach(() => {
    createdEvent = createShoppingListEventSpy.mock.calls[0][0];
  });

  test('has been populated with the list', () => {
    expect(createdEvent).toHaveProperty('list', shoppingListItem.list);
  });

  test('has the type as item_bought', () => {
    expect(createdEvent).toHaveProperty('type', 'item_bought');
  });

  test('has the same item id as the saved shoppingListItem', () => {
    expect(createdEvent.item).toHaveProperty('id', saveShoppingListItemSpy.mock.calls[0][0].id);
  });

  test('has the same item name as was passed in', () => {
    expect(createdEvent.item).toHaveProperty('name', shoppingListItem.name);
  });
});
