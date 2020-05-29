import React from 'react';
import ItemListConstructor from './';
import {render, act} from '@testing-library/react';
import ShoppingListItem from '../domain/ShoppingListItem';


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
  subscribeToItemChanges(onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void {
    stubOnUpdate = onUpdate;
    stubOnError = onError;

    return unsubscribeSpy;
  }
}

const ItemList = ItemListConstructor(shoppingListItemFetcherStub);

const dummyShoppingList = {
  name: '',
  id: ''
};

test('with one item', async () => {
  const { findByText } = render(<ItemList shoppingList={dummyShoppingList} />);

  performItemsUpdate([{name: 'Cheese'}]);

  expect(await findByText('Cheese')).toBeInTheDocument();
});

test('displays loading message before fetch is resolved', async () => {
  const { findByText } = render(<ItemList shoppingList={dummyShoppingList} />)

  expect(await findByText(/loading/i)).toBeInTheDocument()
});

test('hides loading message after fetch is resolved', async () => {
  const { queryByText, findByText } = render(<ItemList shoppingList={dummyShoppingList} />)

  performItemsUpdate([{name: 'Cheese' }])
  await findByText(/cheese/i);

  expect(await queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  const { findByText, queryByText } = render(<ItemList shoppingList={dummyShoppingList} />)

  performItemsUpdateError();

  expect(await findByText(/error/i)).toBeInTheDocument()
  expect(await queryByText(/loading/i)).toBeNull()
})

test('displays latest set of items when updating twice', async () => {
  const { findByText } = render(<ItemList shoppingList={dummyShoppingList} />)

  performItemsUpdate([]);
  performItemsUpdate([{ name: 'Lasagne Sheets' }])

  expect(await findByText(/lasagne sheets/i)).toBeInTheDocument();
})

test('calls the unsubscribe method when unmounting', async () => {
  const { unmount } = render(<ItemList shoppingList={dummyShoppingList} />);

  unmount();

  expect(unsubscribeSpy).toBeCalledWith();
})
