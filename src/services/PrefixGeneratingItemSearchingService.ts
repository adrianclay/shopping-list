import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingList from "../domain/ShoppingList";

export type Searchable<T> = T & { search_queries: string[] };

export function prefixGeneratedSaveItem(_updateItem: (shoppingListItem: Searchable<ShoppingListItem>) => Promise<unknown>) {
  return function(item: ShoppingListItem) {
    return _updateItem({ ...item, search_queries: searchQueries(item.name) });
  }
}

export function prefixGeneratedSearchForItems(_searchForItems: (shoppingList: ShoppingList, search: string) => Promise<ShoppingListItem[]>) {
  return function(shoppingList: ShoppingList, query: string) {
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
