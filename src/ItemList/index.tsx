import React, {useEffect, useState} from "react";
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from "../domain/ShoppingList";
import { Segment } from "semantic-ui-react";

interface ShoppingListItemFetcher {
  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void;
}

export interface ItemListProps {
  shoppingList: ShoppingList;
}

function ItemListConstructor(shoppingListItemFetcher: ShoppingListItemFetcher) {
  return function ItemList({ shoppingList } : ItemListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrored, setFetchError] = useState(false);
    const [shoppingListItems, setShoppingListItems] = useState([] as ShoppingListItem[]);

    useEffect(() => {
      return shoppingListItemFetcher.subscribeToItemChanges(shoppingList, stuff => {
        setIsLoading(false);
        setShoppingListItems(stuff);
      }, () => {
        setFetchError(true);
      });
    }, [shoppingList]);

    if (fetchErrored) {
      return <p>Error</p>
    }

    if (isLoading) {
      return <p>Loading</p>
    }

    return (
      <Segment.Group>
        { shoppingListItems.map(shoppingListItem =>
          <Segment key={shoppingListItem.name}>
            {shoppingListItem.name}
          </Segment>
        ) }
      </Segment.Group>
    )
  }
};

export default ItemListConstructor;
