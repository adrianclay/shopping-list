import ShoppingListEvent from "./ShoppingListEvent";

export default interface ShoppingList {
  id: string;
  name: string;
  owner_uids: string[];
  recent_events: ShoppingListEvent[];
}
