import * as Factory from "factory.ts";
import ShoppingList from "../domain/ShoppingList";

const ShoppingListFactory = Factory.Sync.makeFactory<ShoppingList>({
  id: Factory.each(i => i.toString()),
  name: 'List o Shopping',
  owner_uids: [
    'bob'
  ],
  recent_events: [],
});

export default ShoppingListFactory;
