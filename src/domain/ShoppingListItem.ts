import ItemQuantity from "./ItemQuantity";
import ShoppingList from "./ShoppingList";

export default interface ShoppingListItem {
  list: ShoppingList;
  id: string;
  name: string;
  quantity?: ItemQuantity;
  has_been_bought: boolean;
}
