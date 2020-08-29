import { render, act, screen } from "@testing-library/react";
import React from "react";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";
import ListSelectorConstructor from ".";

let makeUpdate: (lists: ShoppingList[]) => void;
let makeError: () => void;
let unsubscribeSpy = jest.fn();
let loggedInUserSpy: User | undefined;

const shoppingListFetcherStub = {
  subscribeToListChanges: (loggedInUser: User, onUpdate: (lists: ShoppingList[]) => void, onError: () => void) => {
    loggedInUserSpy = loggedInUser;
    makeUpdate = onUpdate;
    makeError = onError;
    return unsubscribeSpy;
  }
};
const ListSelector = ListSelectorConstructor(shoppingListFetcherStub);

const loggedInUser = {
  uid: 'rihanna',
  displayName: 'Rihanna'
};

const shoppingList: ShoppingList = {
  id: 'xmas',
  name: 'Adrians Christmas List',
  owner_uids: []
};

let onSelectSpy: jest.Mock;
beforeEach(() => {
  onSelectSpy = jest.fn();
});

function renderListSelection() {
  return render(<ListSelector onSelect={onSelectSpy} loggedInUser={loggedInUser} />);
}

test('displays loading message before fetch is resolved', async () => {
  renderListSelection();

  expect(await screen.findByText(/loading/i)).toBeInTheDocument()
});

test('passes the loggedInUser to the fetcher', () => {
  renderListSelection();

  expect(loggedInUserSpy).toEqual(loggedInUser);
});

test('hides loading message after fetch is resolved', async () => {
  renderListSelection();

  act(() => {
    makeUpdate([]);
  });

  expect(await screen.queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  renderListSelection();

  act(() => {
    makeError();
  });

  expect(await screen.findByText(/error/i)).toBeInTheDocument()
  expect(await screen.queryByText(/loading/i)).toBeNull()
})

test('displays latest set of lists when updating twice', async () => {
  renderListSelection();

  act(() => {
    makeUpdate([]);
    makeUpdate([shoppingList]);
  });

  expect(await screen.findByText(/Adrians Christmas List/i)).toBeInTheDocument();
})

test('calls the unsubscribe method when unmounting', async () => {
  const { unmount } = renderListSelection();

  unmount();

  expect(unsubscribeSpy).toBeCalledWith();
})

describe('with one shopping list', () => {
  function withOneShoppingList() {
    act(() => {
      makeUpdate([shoppingList]);
    });
  }

  test('raises onSelect event when interacting with dropdown', async () => {
    renderListSelection();
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
