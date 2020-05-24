import React, { useEffect, useState } from "react";
import ShoppingList from "../domain/ShoppingList";
import { Dropdown, DropdownProps } from "semantic-ui-react";

interface ListSelectorProps {
  shoppingListFetcher: {
    subscribeToListChanges(onUpdate: (lists: ShoppingList[]) => void, onError: () => void): () => void;
  };
  onSelect: (item: ShoppingList) => void;
}

function ListSelector({ shoppingListFetcher, onSelect }: ListSelectorProps) {
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

  const onChangeHandler = (_: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    const list = shoppingLists.find(sl => sl.id === value);
    if(list) {
      onSelect(list);
    }
  };

  return <Dropdown selection options={options} placeholder='Switch shopping list' onChange={onChangeHandler}/>;
}

export default ListSelector;
