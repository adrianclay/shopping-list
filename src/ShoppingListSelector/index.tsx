import React from "react";
import ShoppingList from "../domain/ShoppingList";
import { ListSelectorProps } from "../ListSelector";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import { LoggedInUserContext } from "../Login";
import { useNavigate } from "react-router-dom";

type Redirectable<Params> = (params: Params) => string;

function _ShoppingListSelector(
  ListSelector: React.FunctionComponent<ListSelectorProps>,
  CreateShoppingListForm: React.FunctionComponent<CreateShoppingListFormProps>,
  ShoppingListPath: Redirectable<{shoppingListId: string}>
) {
  return function ShoppingListSelector() {
    const navigate = useNavigate();

    function switchToShoppingList(shoppingList: ShoppingList) {
      navigate(ShoppingListPath({ shoppingListId: shoppingList.id }), { replace: true });
    }

    return <LoggedInUserContext.Consumer>
      { loggedInUser => <>
          <ListSelector onSelect={switchToShoppingList} loggedInUser={loggedInUser!} />
          <h2>Create shopping list</h2>
          <CreateShoppingListForm loggedInUser={loggedInUser!} onCreate={switchToShoppingList} />
        </>
      }
    </LoggedInUserContext.Consumer>;
  }
}

export default _ShoppingListSelector;
