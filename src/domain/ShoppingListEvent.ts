export default interface ShoppingListEvent {
  type: 'added' | 'deleted';
  item: {
    name: string;
    id: string;
  },
  created_on: Date;
};
