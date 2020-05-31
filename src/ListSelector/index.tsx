import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";

interface ShoppingListFetcher {
  subscribeToListChanges(onUpdate: (lists: ShoppingList[]) => void, onError: () => void): () => void;
}

export interface ListSelectorProps {
  onSelect: (item: ShoppingList) => void;
  loggedInUser?: User;
}

function ListSelectorConstructor(shoppingListFetcher: ShoppingListFetcher) {

  return function ListSelector({ onSelect }: ListSelectorProps) {
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
    }, []);

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

}

export default ListSelectorConstructor;
