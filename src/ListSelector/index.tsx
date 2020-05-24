import React, { useEffect, useState } from "react";
import ShoppingList from "../domain/ShoppingList";
import { Dropdown } from "semantic-ui-react";

interface ListSelectorProps {
  shoppingListFetcher: {
    subscribeToListChanges(onUpdate: (lists: ShoppingList[]) => void, onError: () => void): () => void;
  }
}

function ListSelector({ shoppingListFetcher }: ListSelectorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchErrored, setFetchError] = useState(false);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    return shoppingListFetcher.subscribeToListChanges(shoppingLists => {
      setIsLoading(false);
      setShoppingLists(shoppingLists);
    }, () => {
      setFetchError(true);
    });
  }, [shoppingListFetcher]);

  if(fetchErrored) {
    return <p>Error</p>;
  }

  if(isLoading) {
    return <p>loading</p>;
  }

  const options = shoppingLists.map(shoppingList => {
    return {
      text: shoppingList.name,
      value: shoppingList.id,
    };
  });

  return <Dropdown selection options={options} placeholder='Switch shopping list' />;
}

export default ListSelector;
