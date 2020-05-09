import React, {useEffect, useState} from "react";
import {ShoppingListItem} from "./App";

interface ShoppingListItemFetcher {
  fetchShoppingListItems(): Promise<ShoppingListItem[]>;
}

interface ItemListProps {
  shoppingListItemFetcher: ShoppingListItemFetcher
}

function ItemList({ shoppingListItemFetcher }: ItemListProps) {
  const [shoppingListItems, setShoppingListItems] = useState([] as ShoppingListItem[]);

  useEffect(() => {
    shoppingListItemFetcher.fetchShoppingListItems().then(stuff => {
      setShoppingListItems(stuff);
    })
  }, [shoppingListItemFetcher]);

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
