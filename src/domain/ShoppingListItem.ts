import ShoppingList from "./ShoppingList";

export default interface ShoppingListItem {
  list: ShoppingList;
  id: string;
  name: string;
  quantity?: {
    scalar: number;
    units?: 'g' | 'ml'
  }
}
