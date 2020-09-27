import * as Factory from "factory.ts";
import ShoppingListFactory from "./ShoppingList";

import ShoppingListEvent from "../domain/ShoppingListEvent";

const ShoppingListEventFactory = Factory.Sync.makeFactory<ShoppingListEvent>({
  list: ShoppingListFactory.build(),
  type: 'item_added',
  item: {
    name: 'Cake',
    id: 'kipling-100'
  },
  created_on: new Date(),
});

export default ShoppingListEventFactory;
