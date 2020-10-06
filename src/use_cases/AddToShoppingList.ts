import { v4 as uuidv4 } from 'uuid';
import { ItemToAdd } from '../AddItemForm';

import ShoppingList from "../domain/ShoppingList";
import ShoppingListItem from "../domain/ShoppingListItem";

type SaveShoppingListItem = (item: ShoppingListItem) => Promise<unknown>;

export function _AddToShoppingList(saveShoppingListItem: SaveShoppingListItem) {
  return async function({ name, list } : ItemToAdd) {
    await saveShoppingListItem({
      id: uuidv4(),
      name,
      list,
      has_been_bought: false,
      added_to_list_on: new Date(),
      quantity: undefined,
    });
  };
}
