import React, { useState } from "react";
import ShoppingList from "../domain/ShoppingList";
import { AddItemFormProps } from "../AddItemForm";
import { ItemListProps } from "../ItemList";
import { ListSelectorProps } from "../ListSelector";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import Login from "../Login";
import { Segment, Button } from "semantic-ui-react";
import User from "../domain/User";

function ShoppingListViewerConstructor(
  ListSelector: React.FunctionComponent<ListSelectorProps>,
  AddItemForm: React.FunctionComponent<AddItemFormProps>,
  ItemList: React.FunctionComponent<ItemListProps>,
  CreateShoppingListForm: React.FunctionComponent<CreateShoppingListFormProps>
) {
  return function ShoppingListViewer() {
    const [shoppingList, setShoppingList] = useState<ShoppingList|undefined|null>();

    const itemList = (loggedInUser: User) => {
      if(shoppingList) {
        return (<Segment.Group>
          <AddItemForm shoppingList={shoppingList} />
          <ItemList shoppingList={shoppingList} />
        </Segment.Group>);
      }

      if(null === shoppingList) {
        return <CreateShoppingListForm loggedInUser={loggedInUser} />
      }
    }

    const onListSelect = (list: ShoppingList) => {
      setShoppingList(list);
    };

    return <Login.LoggedInUserContext.Consumer>
      { loggedInUser => <>
          <ListSelector onSelect={onListSelect} loggedInUser={loggedInUser!} />
          <Button icon='add' content='Create list' onClick={() => { setShoppingList(null) }} />
          {itemList(loggedInUser!)}
        </>
      }
    </Login.LoggedInUserContext.Consumer>;
  }
}

export default ShoppingListViewerConstructor;
