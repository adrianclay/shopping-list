import ShoppingList from "./ShoppingList";

export default interface ShoppingListEvent {
  type: 'item_added' | 'item_deleted';
  item: {
    name: string;
    id: string;
  },
  created_on: Date;
  list: ShoppingList;
};
