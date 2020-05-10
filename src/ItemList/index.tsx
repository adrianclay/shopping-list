import React, {useEffect, useState} from "react";
import {ShoppingListItem} from "../App";

interface ShoppingListItemFetcher {
  subscribeToItemChanges(onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void;
}

interface ItemListProps {
  shoppingListItemFetcher: ShoppingListItemFetcher
}

function ItemList({ shoppingListItemFetcher }: ItemListProps) {
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
  }, [shoppingListItemFetcher]);

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

export default ItemList;
