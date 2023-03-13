import { generatePath, Route, Routes } from "react-router-dom";


const path = '/';
export const ShoppingListsPath = () => generatePath(path);

function _ShoppingListsPage(
  ShoppingListSelector: React.FunctionComponent<{}>
) {
  return function ShoppingListRoute() {
    return <Routes>
      <Route path={path} Component={ShoppingListSelector} />
    </Routes>;
  }
}

export default _ShoppingListsPage;
