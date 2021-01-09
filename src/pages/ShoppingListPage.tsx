import React from "react";
import { generatePath, useRouteMatch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ShoppingList from "../domain/ShoppingList";
import { ShoppingListProps } from "../ShoppingList";
import _useService, { RealtimeService } from "../useService";

type GetShoppingListServce = RealtimeService<string, ShoppingList | null>;

const path = '/shopping-list/:shoppingListId';
type PathParams = { shoppingListId: string };
export const ShoppingListPath = (params: PathParams) => generatePath(path, params);

function _ShoppingListPage(
  ShoppingList: React.FunctionComponent<ShoppingListProps>,
  getShoppingList: GetShoppingListServce
) {
  const useService = _useService(getShoppingList);
  return function ShoppingListRoute() {
    const match = useRouteMatch<PathParams>(path);
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
