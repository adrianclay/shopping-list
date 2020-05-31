import React, { useState } from "react";
import ShoppingList from "../domain/ShoppingList";
import { AddItemFormProps } from "../AddItemForm";
import { ItemListProps } from "../ItemList";
import { ListSelectorProps } from "../ListSelector";
import Login from "../Login";

function ShoppingListViewerConstructor(ListSelector: React.FunctionComponent<ListSelectorProps>, AddItemForm: React.FunctionComponent<AddItemFormProps>, ItemList: React.FunctionComponent<ItemListProps>) {
  return function ShoppingListViewer() {
    const [shoppingList, setShoppingList] = useState<ShoppingList|undefined>();

    const itemList = () => {
      if(shoppingList) {
        return (<div>
          <AddItemForm shoppingList={shoppingList} />
          <ItemList shoppingList={shoppingList} />
        </div>);
      }
    }

    const onListSelect = (list: ShoppingList) => {
      setShoppingList(list);
    };

    return <Login.LoggedInUserContext.Consumer>
      { loggedInUser => <>
          <ListSelector onSelect={onListSelect} loggedInUser={loggedInUser!} />
          {itemList()}
        </>
      }
    </Login.LoggedInUserContext.Consumer>;
  }
}

export default ShoppingListViewerConstructor;
