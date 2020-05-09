import React from 'react';
import ItemList from './ItemList';
import {render} from '@testing-library/react';
import {ShoppingListItem} from "./App";

let resolve_fetch: (value: ShoppingListItem[]) => void;

const shoppingListItemFetcherStub = {
  fetchShoppingListItems(): Promise<ShoppingListItem[]> {
    return new Promise((resolve, reject) => {
      resolve_fetch = resolve;
    });
  }
}

test('with one item', async () => {
  const { findByText } = render(<ItemList shoppingListItemFetcher={shoppingListItemFetcherStub}/>);

  resolve_fetch([{name: 'Cheese'}]);

  expect(await findByText('Cheese')).toBeInTheDocument();
});

test('displays loading message before fetch is resolved', async () => {
  const { findByText } = render(<ItemList shoppingListItemFetcher={shoppingListItemFetcherStub} />)

  expect(await findByText(/loading/i)).toBeInTheDocument()
});

test('hides loading message after fetch is resolved', async () => {
  const { queryByText, findByText } = render(<ItemList shoppingListItemFetcher={shoppingListItemFetcherStub} />)

  resolve_fetch([{name: 'Cheese' }])
  await findByText(/cheese/i);

  expect(await queryByText(/loading/i)).toBeNull()
});
