import React from 'react';
import ItemListConstructor from './';
import {render, fireEvent, screen} from '@testing-library/react';
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from '../domain/ShoppingList';
import { EditItemFormProps } from './EditItemForm';
import ShoppingListFactory from '../factories/ShoppingList';
import ShoppingListItemFactory from '../factories/ShoppingListItem';
import { realtimeServiceStub } from '../setupTests';

const error = new Error("Unhealthy snake, please check snake health.");

const shoppingListItemFetcherStub = realtimeServiceStub<ShoppingList, ShoppingListItem[]>();

const buyItemOnShoppingListSpy = jest.fn<void, [ShoppingListItem]>();

const editItemFormSpy = jest.fn<JSX.Element, [EditItemFormProps]>(() => <p>EditItemForm</p>);

const ItemList = ItemListConstructor(shoppingListItemFetcherStub.service, buyItemOnShoppingListSpy, editItemFormSpy);

const shoppingList = ShoppingListFactory.build({
  name: 'Art supplies',
});

const lasagneSheetItem = ShoppingListItemFactory.build({
  name: 'Lasagne Sheets',
  list: shoppingList
});

test('displays "no items in list" with zero items', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />);

  shoppingListItemFetcherStub.performUpdate([])

  expect(await findByText(/no items in Art supplies./i)).toBeInTheDocument();
});

test('displays loading message before fetch is resolved', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />)

  expect(await findByText(/loading art supplies items/i)).toBeInTheDocument()
});

test('hides loading message after fetch is resolved', async () => {
  render(<ItemList shoppingList={shoppingList} />)

  shoppingListItemFetcherStub.performUpdate([lasagneSheetItem])
  await screen.findByText(/lasagne/i);

  expect(screen.queryByText(/loading/i)).toBeNull()
});

test('displays error message if fetch fails', async () => {
  render(<ItemList shoppingList={shoppingList} />)

  shoppingListItemFetcherStub.performError(error);

  const errorMessage = await screen.findByText(/error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(error.message);
  expect(screen.queryByText(/loading/i)).toBeNull();
})

test('displays latest set of items when updating twice', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />)

  shoppingListItemFetcherStub.performUpdate([]);
  shoppingListItemFetcherStub.performUpdate([lasagneSheetItem])

  expect(await findByText(/lasagne sheets/i)).toBeInTheDocument();
})

test('calls the unsubscribe method when unmounting', async () => {
  const { unmount } = render(<ItemList shoppingList={shoppingList} />);

  unmount();

  expect(shoppingListItemFetcherStub.unsubscribeSpy).toBeCalledWith();
})

describe('with one item on the shopping list', () => {
  beforeEach(() => {
    render(<ItemList shoppingList={shoppingList} />);

    shoppingListItemFetcherStub.performUpdate([lasagneSheetItem]);
  });

  test('it displays the items name', async () => {
    expect(await screen.findByText(/lasagne/i)).toBeInTheDocument();
  });

  test('calls the buyItemOnShoppingList when clicking the buy button', async () => {
    fireEvent.click(await screen.findByText(/buy/i));

    expect(buyItemOnShoppingListSpy).toBeCalledWith(lasagneSheetItem);
  });

  test('hides the edit form', () => {
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/save/i)).not.toBeInTheDocument();
  });

  describe('editing the item', () => {
    beforeEach(async () => {
      fireEvent.click(await screen.findByText(/edit/i));
    });

    test('passes the item into the editItemFormSpy', () => {
      expect(editItemFormSpy).toHaveBeenLastCalledWith(expect.objectContaining({
        item: lasagneSheetItem
      }), {});
    });

    test('displays the EditItemForm', () => {
      expect(screen.getByText('EditItemForm')).toBeInTheDocument();
    });

    test('hides the buy button', () => {
      expect(screen.queryByText(/buy/i)).not.toBeInTheDocument();
    });

    test('hides the edit button', () => {
      expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    });

  });
});

describe('with an item with a quantity', () => {
  const manyLasagneSheetItem: ShoppingListItem = {
    ...lasagneSheetItem,
    quantity: {
      scalar: 9900,
      units: 'g'
    }
  };

  beforeEach(() => {
    render(<ItemList shoppingList={shoppingList} />);

    shoppingListItemFetcherStub.performUpdate([manyLasagneSheetItem]);
  });

  test('it displays the items quantity', async () => {
    expect(await screen.findByText(/9900\s*g/)).toBeInTheDocument();
  });
});
