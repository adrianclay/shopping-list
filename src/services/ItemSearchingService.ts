import ShoppingListItem from "../domain/ShoppingListItem";
import { ItemToAdd } from "../AddItemForm";

export type Searchable<T> = T & { search_queries: string[] };

interface ItemStore {
  addShoppingListItem(item: Searchable<ItemToAdd>): Promise<ShoppingListItem>;
  updateItem(shoppingListItem: Searchable<ShoppingListItem>): Promise<unknown>;
}

export default class ItemSearchingService {
  private itemStore: ItemStore;

  constructor(itemStore: ItemStore) {
    this.itemStore = itemStore;
  }

  addShoppingListItem(item: ItemToAdd): Promise<ShoppingListItem> {
    return this.itemStore.addShoppingListItem({ ...item, search_queries: this.searchQueries(item.name) });
  }

  updateItem(item: ShoppingListItem) {
    return this.itemStore.updateItem({ ...item, search_queries: this.searchQueries(item.name) });
  }

  private searchQueries(name: string) {
    const search_queries: string[] = [];
    name.toLowerCase().split(' ').forEach(word => {
      for(let i = 1; i <= Math.min(5, word.length); i++) {
        search_queries.push(word.substr(0, i));
      }
    });
    return search_queries;
  }
}
