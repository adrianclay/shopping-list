import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ShoppingList from "../domain/ShoppingList";
import { ShoppingListProps } from "../ShoppingList";
import _useService, { RealtimeService } from "../useService";

type GetShoppingListServce = RealtimeService<string, ShoppingList | null>;

function _ShoppingListPage(
  ShoppingList: React.FunctionComponent<ShoppingListProps>,
  getShoppingList: GetShoppingListServce
) {
  const useService = _useService(getShoppingList);
  return function ShoppingListRoute() {
    const match = useRouteMatch<{ shoppingListId: string}>('/shopping-list/:shoppingListId');
    if (!match) {
      return null;
    }
    const { shoppingListId } = match.params;
    return <ShoppingListPage shoppingListId={shoppingListId} />
  }

  function ShoppingListPage({ shoppingListId }: { shoppingListId: string}) {
    const [ , error, shoppingList] = useService(null, shoppingListId);

    if (shoppingList) {
      return <ShoppingList shoppingList={shoppingList} />
    }
    if (error) {
      return <Container>{error.message}</Container>
    }
    return null;
  }
}

export default _ShoppingListPage;
