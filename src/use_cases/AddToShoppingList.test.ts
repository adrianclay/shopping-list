import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingListFactory from "../factories/ShoppingList";
import _AddToShoppingList from "./AddToShoppingList";

const list = ShoppingListFactory.build();
const saveShoppingListItemSpy = jest.fn<Promise<unknown>, [ShoppingListItem]>();
const AddToShoppingList = _AddToShoppingList(saveShoppingListItemSpy);
let createdItem: ShoppingListItem;

beforeEach(async () => {
  saveShoppingListItemSpy.mockReset();

  await AddToShoppingList({ name: 'Jelly babies', list });

  createdItem = saveShoppingListItemSpy.mock.calls[0][0];
});

it('generates an id', () => {
  expect(createdItem).toHaveProperty('id');
});

it('populates the name', () => {
  expect(createdItem).toHaveProperty('name', 'Jelly babies');
});

it('populates the list', () => {
  expect(createdItem).toHaveProperty('list', list);
});

it('marks the item as to be bought', () => {
  expect(createdItem).toHaveProperty('has_been_bought', false);
});

it('defaults to an undefined quantity', () => {
  expect(createdItem).toHaveProperty('quantity', undefined);
});
