import { render, act } from "@testing-library/react";
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

const loggedInUser = {
  uid: 'rihanna',
  displayName: 'Rihanna'
}

let onSelectSpy: jest.Mock
function renderListSelection() {
  onSelectSpy = jest.fn();
  const ListSelector = ListSelectorConstructor(shoppingListFetcherStub);
  return render(<ListSelector onSelect={onSelectSpy} loggedInUser={loggedInUser} />);
}

test('displays loading message before fetch is resolved', async () => {
  const { findByText } = renderListSelection();

  expect(await findByText(/loading/i)).toBeInTheDocument()
});

test('passes the loggedInUser to the fetcher', () => {
  renderListSelection();

  expect(loggedInUserSpy).toEqual(loggedInUser);
});

test('hides loading message after fetch is resolved', async () => {
  const { queryByText } = renderListSelection();

  act(() => {
    makeUpdate([]);
  });

  expect(await queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  const { findByText, queryByText } = renderListSelection();

  act(() => {
    makeError();
  });

  expect(await findByText(/error/i)).toBeInTheDocument()
  expect(await queryByText(/loading/i)).toBeNull()
})

test('displays latest set of lists when updating twice', async () => {
  const { findByText } = renderListSelection();

  act(() => {
    makeUpdate([]);
    makeUpdate([{
      id: 'xmas',
      name: 'Adrians Christmas List'
    }]);
  });

  expect(await findByText(/Adrians Christmas List/i)).toBeInTheDocument();
})

test('calls the unsubscribe method when unmounting', async () => {
  const { unmount } = renderListSelection();

  unmount();

  expect(unsubscribeSpy).toBeCalledWith();
})

test('raises onSelect event when interacting with dropdown', async () => {
  const { findByText } = renderListSelection();

  const list = {
    id: 'xmas',
    name: 'Adrians Christmas List'
  };

  act(() => {
    makeUpdate([list]);
  });

  (await findByText(list.name)).click();

  expect(onSelectSpy).toHaveBeenCalledWith(list);
});
