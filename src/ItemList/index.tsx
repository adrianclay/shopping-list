import React, {useEffect, useState} from "react";
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from "../domain/ShoppingList";

interface ShoppingListItemFetcher {
  subscribeToItemChanges(onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void;
}

export interface ItemListProps {
  shoppingList?: ShoppingList;
}

function ItemListConstructor(shoppingListItemFetcher: ShoppingListItemFetcher) {
  return function ItemList(_ : ItemListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrored, setFetchError] = useState(false);
    const [shoppingListItems, setShoppingListItems] = useState([] as ShoppingListItem[]);

    useEffect(() => {
      return shoppingListItemFetcher.subscribeToItemChanges(stuff => {
        setIsLoading(false);
        setShoppingListItems(stuff);
      }, () => {
        setFetchError(true);
      });
    }, []);

    if (fetchErrored) {
      return <p>Error</p>
    }

    if (isLoading) {
      return <p>Loading</p>
    }

    return (
      <ul>
        { shoppingListItems.map(shoppingListItem =>
          <li key={shoppingListItem.name}>
            {shoppingListItem.name}
          </li>
        ) }
      </ul>
    )
  }
};

export default ItemListConstructor;
