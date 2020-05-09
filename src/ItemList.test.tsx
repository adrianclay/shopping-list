import React from 'react';
import ItemList from './ItemList';
import {render} from '@testing-library/react';
import {ShoppingListItem} from "./App";

const shoppingListItemFetcherStub = {
  fetchShoppingListItems(): Promise<ShoppingListItem[]> {
    return Promise.resolve([{
      name: 'Cheese'
    }]);
  }
}

test('with one item', async () => {
  const { findByText } = render(<ItemList shoppingListItemFetcher={shoppingListItemFetcherStub}/>)

  expect(await findByText('Cheese')).toBeInTheDocument()
});
