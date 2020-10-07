import { v4 as uuidv4 } from 'uuid';
import { ItemToAdd } from '../AddItemForm';
import ShoppingListEvent from '../domain/ShoppingListEvent';

import ShoppingListItem from "../domain/ShoppingListItem";

type SaveShoppingListItem = (item: ShoppingListItem) => Promise<unknown>;
type CreateShoppingListEvent = (event: ShoppingListEvent) => Promise<unknown>;

function _AddToShoppingList(saveShoppingListItem: SaveShoppingListItem, createShoppingListEvent: CreateShoppingListEvent) {
  return async function({ name, list } : ItemToAdd) {
    const id = uuidv4();
    await saveShoppingListItem({
      id,
      name,
      list,
      has_been_bought: false,
      added_to_list_on: new Date(),
      quantity: null,
    });
    await createShoppingListEvent({
      list,
      type: 'item_added',
      item: {
        id,
        name
      },
      created_on: new Date(),
    });
  };
}

export default _AddToShoppingList;
