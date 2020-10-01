import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingList from "../domain/ShoppingList";
import { ItemToAdd } from "../AddItemForm";

export type Searchable<T> = T & { search_queries: string[] };

export function searchingAddShoppingListItem(_addShoppingListItem: (item: Searchable<ItemToAdd>) => Promise<ShoppingListItem>) {
  return function addShoppingListItem(item: ItemToAdd): Promise<ShoppingListItem> {
    return _addShoppingListItem({ ...item, search_queries: searchQueries(item.name) });
  }
}

export function searchingUpdateItem(_updateItem: (shoppingListItem: Searchable<ShoppingListItem>) => Promise<unknown>) {
  return function updateItem(item: ShoppingListItem) {
    return _updateItem({ ...item, search_queries: searchQueries(item.name) });
  }
}

export function searchForItems(_searchForItems: (shoppingList: ShoppingList, search: string) => Promise<ShoppingListItem[]>) {
  return function searchForItems(shoppingList: ShoppingList, query: string) {
    return _searchForItems(shoppingList, query.toLowerCase().split(' ')[0].substr(0, 5));
  }
}

function searchQueries(name: string) {
  const search_queries: string[] = [];
  name.toLowerCase().split(' ').forEach(word => {
    for(let i = 1; i <= Math.min(5, word.length); i++) {
      search_queries.push(word.substr(0, i));
    }
  });
  return search_queries;
}
