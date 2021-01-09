import React from "react";
import { generatePath, Route } from "react-router-dom";


const path = '/';
export const ShoppingListsPath = () => generatePath(path);

function _ShoppingListsPage(
  ShoppingListSelector: React.FunctionComponent<{}>
) {
  return function ShoppingListRoute() {
    return <Route exact path={path}>
      <ShoppingListSelector />
    </Route>;
  }
}

export default _ShoppingListsPage;
