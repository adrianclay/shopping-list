import * as Factory from "factory.ts";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingListFactory from "./ShoppingList";

const ShoppingListItemFactory = Factory.Sync.makeFactory<ShoppingListItem>({
  id: Factory.each(i => i.toString()),
  name: 'Bacon',
  list: ShoppingListFactory.build(),
  has_been_bought: false,
  added_to_list_on: new Date(),
});

export default ShoppingListItemFactory;
