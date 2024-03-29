import { generatePath, Link, useMatch } from "react-router-dom";
import { Breadcrumb, Container, Loader, Message } from "semantic-ui-react";
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
    const match = useMatch(path);
    if (!match) {
      return null;
    }
    const { shoppingListId } = match.params;
    return <ShoppingListPage shoppingListId={shoppingListId!} />
  }

  function ShoppingListPage({ shoppingListId }: { shoppingListId: string}) {
    const [isLoading, error, shoppingList] = useService(null, shoppingListId);

    if (isLoading) {
      return <Loader active>Loading</Loader>
    }

    if (shoppingList) {
      return <>
        <Breadcrumb icon='right angle' sections={[
          { key: 0, content: <Link to='/'>Lists</Link> },
          { key: 1, content: shoppingList.name, active: true }]}
        />
        <ShoppingList shoppingList={shoppingList} />
      </>;
    }
    if (error) {
      return <Container>{error.message}</Container>
    }
    return <>
      <Breadcrumb icon='right angle' sections={[
          { key: 0, content: <Link to='/'>Lists</Link> },
          { key: 1, content: 'Unknown', active: true }]}
      />
      <Message negative>
        <Message.Header>The shopping list on this page can't be found</Message.Header>
        <p>This could be because it doesn't exist, or you don't have permission to access it.</p>
      </Message>
    </>;
  }
}

export default _ShoppingListPage;
