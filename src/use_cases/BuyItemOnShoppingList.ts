import ShoppingListEvent from "../domain/ShoppingListEvent";
import ShoppingListItem from "../domain/ShoppingListItem";

type ItemUpdater = (shoppingListItem: ShoppingListItem) => Promise<unknown>;
type EventCreator = (shoppingListEvent: ShoppingListEvent) => Promise<unknown>;

export default function _BuyItemOnShoppingList(itemUpdater: ItemUpdater, eventCreator: EventCreator) {
  return async function(shoppingListItem: ShoppingListItem) {
    shoppingListItem.has_been_bought = true;
    await itemUpdater(shoppingListItem);
    await eventCreator({
      list: shoppingListItem.list,
      type: 'item_bought',
      item: {
        name: shoppingListItem.name,
        id: shoppingListItem.id
      },
      created_on: new Date()
    });
  };
}
