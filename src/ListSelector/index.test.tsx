import { render, screen } from "@testing-library/react";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";
import ListSelectorConstructor from ".";
import ShoppingListFactory from "../factories/ShoppingList";
import { realtimeServiceStub } from "../setupTests";

const shoppingListFetcherStub = realtimeServiceStub<User, ShoppingList[]>();

const ListSelector = ListSelectorConstructor(shoppingListFetcherStub.service);

const loggedInUser = {
  uid: 'rihanna',
  displayName: 'Rihanna'
};

const shoppingList = ShoppingListFactory.build({
  id: 'xmas',
  name: 'Adrians Christmas List',
});

function renderListSelection() {
  return render(<ListSelector onSelect={onSelectSpy} loggedInUser={loggedInUser} />);
}

const onSelectSpy = jest.fn<void, [ShoppingList]>();
beforeEach(() => {
  onSelectSpy.mockReset();
  renderListSelection();
});

test('displays loading message before fetch is resolved', async () => {
  expect(await screen.findByText(/loading/i)).toBeInTheDocument()
});

test('passes the loggedInUser to the fetcher', () => {
  expect(shoppingListFetcherStub.service.mock.calls[1][0]).toEqual(loggedInUser);
});

test('hides loading message after fetch is resolved', async () => {
  shoppingListFetcherStub.performUpdate([]);

  expect(await screen.queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  shoppingListFetcherStub.performError(new Error('Fetch failure message'));

  expect(await screen.findByText(/error/i)).toBeInTheDocument()
  expect(await screen.queryByText(/loading/i)).toBeNull()
})

test('displays latest set of lists when updating twice', async () => {
  shoppingListFetcherStub.performUpdate([]);
  shoppingListFetcherStub.performUpdate([shoppingList]);

  expect(await screen.findByText(/Adrians Christmas List/i)).toBeInTheDocument();
})

test('calls the unsubscribe method when unmounting', async () => {
  const { unmount } = renderListSelection();

  unmount();

  expect(shoppingListFetcherStub.unsubscribeSpy).toBeCalledWith();
})

describe('with one shopping list', () => {
  function withOneShoppingList() {
    shoppingListFetcherStub.performUpdate([shoppingList]);
  }

  test('raises onSelect event when interacting with dropdown', async () => {
    withOneShoppingList();

    (await screen.findByText(shoppingList.name)).click();

    expect(onSelectSpy).toHaveBeenCalledWith(shoppingList);
  });

  test('with shopping list selected, displays item as selected', async () => {
    render(<ListSelector loggedInUser={loggedInUser} onSelect={onSelectSpy} value={shoppingList} />);
    withOneShoppingList();

    expect(await screen.findByRole('alert')).toHaveTextContent(shoppingList.name);
  });

  test('with no shopping list selected, displays blank', async () => {
    render(<ListSelector loggedInUser={loggedInUser} onSelect={onSelectSpy} value={null} />);
    withOneShoppingList();

    expect(await screen.findByRole('alert')).toHaveTextContent('Switch shopping list');
  });
});
