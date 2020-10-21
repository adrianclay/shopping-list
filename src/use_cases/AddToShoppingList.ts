import { v4 as uuidv4 } from 'uuid';
import ShoppingList from '../domain/ShoppingList';
import ShoppingListEvent from '../domain/ShoppingListEvent';
import ShoppingListItem from "../domain/ShoppingListItem";

type SaveShoppingListItem = (item: ShoppingListItem) => Promise<unknown>;
type CreateShoppingListEvent = (event: ShoppingListEvent) => Promise<unknown>;
type SearchShoppingListItems = (shoppingList: ShoppingList, name: string) => Promise<ShoppingListItem[]>;

export interface AddToShoppingListRequest {
  name: string;
  list: ShoppingList;
}

function _AddToShoppingList(searchShoppingList: SearchShoppingListItems, saveShoppingListItem: SaveShoppingListItem, createShoppingListEvent: CreateShoppingListEvent) {
  return async function({ name, list } : AddToShoppingListRequest) {

    const searchResults = (await searchShoppingList(list, name)).filter(item => item.name === name);

    let shoppingListItem: ShoppingListItem;
    if(searchResults.length) {
      shoppingListItem = searchResults[0];
      shoppingListItem.has_been_bought = false;
    } else  {
      shoppingListItem = {
        id: uuidv4(),
        name,
        list,
        has_been_bought: false,
        added_to_list_on: new Date(),
        quantity: null,
      };
    }

    await saveShoppingListItem(shoppingListItem);
    await createShoppingListEvent({
      list,
      type: 'item_added',
      item: {
        id: shoppingListItem.id,
        name
      },
      created_on: new Date(),
    });
  };
}

export default _AddToShoppingList;
