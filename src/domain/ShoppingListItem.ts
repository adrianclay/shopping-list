import ItemQuantity from "./ItemQuantity";
import ShoppingList from "./ShoppingList";

export default interface ShoppingListItem {
  list: ShoppingList;
  id: string;
  name: string;
  quantity: ItemQuantity | null;
  has_been_bought: boolean;
  added_to_list_on: Date;
}
