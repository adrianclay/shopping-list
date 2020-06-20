import React, { useEffect, useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";

interface ShoppingListFetcher {
  subscribeToListChanges(loggedInUser: User, onUpdate: (lists: ShoppingList[]) => void, onError: () => void): () => void;
}

export interface ListSelectorProps {
  value?: ShoppingList | null;
  onSelect: (item: ShoppingList) => void;
  loggedInUser: User;
}

function ListSelectorConstructor(shoppingListFetcher: ShoppingListFetcher) {

  return function ListSelector({ onSelect, loggedInUser, value }: ListSelectorProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrored, setFetchError] = useState(false);
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    useEffect(() => {
      return shoppingListFetcher.subscribeToListChanges(loggedInUser, shoppingLists => {
        setIsLoading(false);
        setShoppingLists(shoppingLists);
      }, () => {
        setFetchError(true);
      });
    }, [loggedInUser]);

    if(fetchErrored) {
      return <p>Error</p>;
    }

    if(isLoading) {
      return <p>loading</p>;
    }

    return <Dropdown selection {...dropdownProps(shoppingLists, onSelect, value)} />;
  }

  function dropdownProps(shoppingLists: ShoppingList[], onSelect: (item: ShoppingList) => void, value: ShoppingList | null | undefined) {
    const onChangeHandler = (_: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
      const list = shoppingLists.find(sl => sl.id === value);
      if(list) {
        onSelect(list);
      }
    };

    const options = shoppingLists.map(shoppingList => {
      return {
        text: shoppingList.name,
        value: shoppingList.id,
      };
    });
    const dropdownProps: DropdownProps = {
      options,
      onChange: onChangeHandler,
      placeholder: 'Switch shopping list',
    };

    if (value) {
      dropdownProps.value = value.id;
    }

    if (value === null) {
      dropdownProps.value = '';
    }

    return dropdownProps;
  }
}

export default ListSelectorConstructor;
