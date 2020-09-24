import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import _useService from "../useService";

import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";

type ShoppingListFetcher = (loggedInUser: User, onUpdate: (lists: ShoppingList[]) => void, onError: (error: Error) => void) => () => void;

export interface ListSelectorProps {
  value?: ShoppingList | null;
  onSelect: (item: ShoppingList) => void;
  loggedInUser: User;
}

function ListSelectorConstructor(subscribeToListChanges: ShoppingListFetcher) {
  const useService = _useService(subscribeToListChanges);

  return function ListSelector({ onSelect, loggedInUser, value }: ListSelectorProps) {
    const [isLoading, fetchErrored, shoppingLists] = useService([], loggedInUser);

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
