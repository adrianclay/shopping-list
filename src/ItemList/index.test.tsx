import React from 'react';
import ItemListConstructor from './';
import {render, act, fireEvent} from '@testing-library/react';
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from '../domain/ShoppingList';


let stubOnUpdate: (value: ShoppingListItem[]) => void;
let stubOnError: () => void;
let unsubscribeSpy = jest.fn();

function performItemsUpdate(items: ShoppingListItem[]) {
  act(() => {
    stubOnUpdate(items);
  });
}

function performItemsUpdateError() {
  act(() => {
    stubOnError();
  });
}

const shoppingListItemFetcherStub = {
  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void {
    expect(shoppingList).toEqual(shoppingList);
    stubOnUpdate = onUpdate;
    stubOnError = onError;

    return unsubscribeSpy;
  }
}

const shoppingListItemDeleterSpy = {
  deleteItem: jest.fn()
};

const ItemList = ItemListConstructor(shoppingListItemFetcherStub, shoppingListItemDeleterSpy);

const shoppingList = {
  name: 'Art supplies',
  id: '1ARTYlist',
  owner_uids: ['neil']
};

const lasagneSheetItem = {
  name: 'Lasagne Sheets',
  id: '190',
  list: shoppingList
};

test('displays "no items in list" with zero items', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />);

  performItemsUpdate([]);

  expect(await findByText(/no items in Art supplies./i)).toBeInTheDocument();
});

test('with one item', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />);

  performItemsUpdate([lasagneSheetItem]);

  expect(await findByText(/lasagne/i)).toBeInTheDocument();
});

test('displays loading message before fetch is resolved', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />)

  expect(await findByText(/loading art supplies items/i)).toBeInTheDocument()
});

test('hides loading message after fetch is resolved', async () => {
  const { queryByText, findByText } = render(<ItemList shoppingList={shoppingList} />)

  performItemsUpdate([lasagneSheetItem])
  await findByText(/lasagne/i);

  expect(await queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  const { findByText, queryByText } = render(<ItemList shoppingList={shoppingList} />)

  performItemsUpdateError();

  expect(await findByText(/error/i)).toBeInTheDocument()
  expect(await queryByText(/loading/i)).toBeNull()
})

test('displays latest set of items when updating twice', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />)

  performItemsUpdate([]);
  performItemsUpdate([lasagneSheetItem])

  expect(await findByText(/lasagne sheets/i)).toBeInTheDocument();
})

test('calls the unsubscribe method when unmounting', async () => {
  const { unmount } = render(<ItemList shoppingList={shoppingList} />);

  unmount();

  expect(unsubscribeSpy).toBeCalledWith();
})

test('calls the shoppingListItemDeleter when clicking the delete button', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />);

  performItemsUpdate([lasagneSheetItem]);

  fireEvent.click(await findByText(/delete/i));

  expect(shoppingListItemDeleterSpy.deleteItem).toBeCalledWith(lasagneSheetItem);
});
