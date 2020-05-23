import { render, act } from "@testing-library/react";
import React from "react";
import ListSelector from ".";
import ShoppingList from "../domain/ShoppingList";

let makeUpdate: (lists: ShoppingList[]) => void;
let makeError: () => void;
let unsubscribeSpy = jest.fn();

const shoppingListFetcherStub = {
  subscribeToListChanges: (onUpdate: (lists: ShoppingList[]) => void, onError: () => void) => {
    makeUpdate = onUpdate;
    makeError = onError;
    return unsubscribeSpy;
  }
};


beforeEach(() => {
  shoppingListFetcherStub
})

test('displays loading message before fetch is resolved', async () => {
  const { findByText } = render(<ListSelector shoppingListFetcher={shoppingListFetcherStub} />)

  expect(await findByText(/loading/i)).toBeInTheDocument()
});

test('hides loading message after fetch is resolved', async () => {
  const { queryByText } = render(<ListSelector shoppingListFetcher={shoppingListFetcherStub} />)

  act(() => {
    makeUpdate([]);
  });

  expect(await queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  const { findByText, queryByText } = render(<ListSelector shoppingListFetcher={shoppingListFetcherStub} />)

  act(() => {
    makeError();
  });

  expect(await findByText(/error/i)).toBeInTheDocument()
  expect(await queryByText(/loading/i)).toBeNull()
})

test('displays latest set of lists when updating twice', async () => {
  const { findByText } = render(<ListSelector shoppingListFetcher={shoppingListFetcherStub} />)

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
  const { unmount } = render(<ListSelector shoppingListFetcher={shoppingListFetcherStub} />);

  unmount();

  expect(unsubscribeSpy).toBeCalledWith();
})
