import React from 'react';
import ItemListConstructor from './';
import {render, act, fireEvent, screen} from '@testing-library/react';
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from '../domain/ShoppingList';
import { EditItemFormProps } from './EditItemForm';
import ShoppingListFactory from '../factories/ShoppingList';
import ShoppingListItemFactory from '../factories/ShoppingListItem';


let stubOnUpdate: (value: ShoppingListItem[]) => void;
let stubOnError: (error: Error) => void;
let unsubscribeSpy = jest.fn();

function performItemsUpdate(items: ShoppingListItem[]) {
  act(() => {
    stubOnUpdate(items);
  });
}

const error = new Error("Unhealthy snake, please check snake health.");

function performItemsUpdateError() {
  act(() => {
    stubOnError(error);
  });
}

const shoppingListItemFetcherStub = (shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void) => {
  expect(shoppingList).toEqual(shoppingList);
  stubOnUpdate = onUpdate;
  stubOnError = onError;

  return unsubscribeSpy;
}

const shoppingListItemDeleterSpy = jest.fn<void, [ShoppingListItem]>();

const editItemFormSpy = jest.fn<JSX.Element, [EditItemFormProps]>(() => <p>EditItemForm</p>);

const ItemList = ItemListConstructor(shoppingListItemFetcherStub, shoppingListItemDeleterSpy, editItemFormSpy);

const shoppingList = ShoppingListFactory.build({
  name: 'Art supplies',
});

const lasagneSheetItem = ShoppingListItemFactory.build({
  name: 'Lasagne Sheets',
  list: shoppingList
});

test('displays "no items in list" with zero items', async () => {
  const { findByText } = render(<ItemList shoppingList={shoppingList} />);

  performItemsUpdate([]);

  expect(await findByText(/no items in Art supplies./i)).toBeInTheDocument();
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

  const errorMessage = await findByText(/error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(error.message);
  expect(await queryByText(/loading/i)).toBeNull();
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

describe('with one item on the shopping list', () => {
  beforeEach(() => {
    render(<ItemList shoppingList={shoppingList} />);

    performItemsUpdate([lasagneSheetItem]);
  });

  test('it displays the items name', async () => {
    expect(await screen.findByText(/lasagne/i)).toBeInTheDocument();
  });

  test('calls the shoppingListItemDeleter when clicking the delete button', async () => {
    fireEvent.click(await screen.findByText(/delete/i));

    expect(shoppingListItemDeleterSpy).toBeCalledWith(lasagneSheetItem);
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
      expect(screen.queryByText('EditItemForm')).toBeInTheDocument();
    });

    test('hides the delete button', () => {
      expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
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

    performItemsUpdate([manyLasagneSheetItem]);
  });

  test('it displays the items quantity', async () => {
    expect(await screen.findByText(/9900\s*g/)).toBeInTheDocument();
  });
});
