import React, { useState } from "react";
import ShoppingList from "../domain/ShoppingList";
import { ListSelectorProps } from "../ListSelector";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import { LoggedInUserContext } from "../Login";
import { Button } from "semantic-ui-react";
import User from "../domain/User";
import { Redirect } from "react-router-dom";

type Redirectable<Params> = (params: Params) => string;

function _ShoppingListSelector(
  ListSelector: React.FunctionComponent<ListSelectorProps>,
  CreateShoppingListForm: React.FunctionComponent<CreateShoppingListFormProps>,
  ShoppingListPath: Redirectable<{shoppingListId: string}>
) {
  return function ShoppingListSelector() {
    const [shoppingList, setShoppingList] = useState<ShoppingList|undefined|null>();

    const itemList = (loggedInUser: User) => {
      if(shoppingList) {
        return <Redirect push to={ShoppingListPath({ shoppingListId: shoppingList.id })} />;
      }

      if(null === shoppingList) {
        return <CreateShoppingListForm loggedInUser={loggedInUser} onCreate={(list: ShoppingList) => {setShoppingList(list)}} />
      }
    }

    const onListSelect = (list: ShoppingList) => {
      setShoppingList(list);
    };

    return <LoggedInUserContext.Consumer>
      { loggedInUser => <>
          <ListSelector onSelect={onListSelect} loggedInUser={loggedInUser!} value={shoppingList} />
          <Button icon='add' content='Create list' onClick={() => { setShoppingList(null) }} />
          {itemList(loggedInUser!)}
        </>
      }
    </LoggedInUserContext.Consumer>;
  }
}

export default _ShoppingListSelector;
