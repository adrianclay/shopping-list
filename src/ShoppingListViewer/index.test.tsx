import React from "react";
import { render, act, screen } from "@testing-library/react";

import ShoppingListViewerConstructor from ".";
import { ItemListProps } from "../ItemList";
import { ListSelectorProps } from "../ListSelector";
import { AddItemFormProps } from "../AddItemForm";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import { LoggedInUserContext } from "../Login";
import ShoppingListFactory from "../factories/ShoppingList";
import { EventLogViewerProps } from "../EventLogViewer";
import _ShoppingList from "../ShoppingList";

const loggedInUser = {
  uid: '100',
  displayName: 'Barry'
};

let addItemFormSpy: jest.Mock<JSX.Element, [AddItemFormProps]>;
let itemListSpy: jest.Mock<JSX.Element, [ItemListProps]>;
let listSelectorSpy: jest.Mock<JSX.Element, [ListSelectorProps]>;
let eventLogViewerSpy: jest.Mock<JSX.Element, [EventLogViewerProps]>;
let createShoppingListFormSpy: jest.Mock<JSX.Element, [CreateShoppingListFormProps]>;

beforeEach(() => {
  addItemFormSpy = jest.fn<JSX.Element, [AddItemFormProps]>(() => <p>AddItemForm</p>);
  itemListSpy = jest.fn<JSX.Element, [ItemListProps]>(() => <p>ItemList</p>);
  listSelectorSpy = jest.fn<JSX.Element, [ListSelectorProps]>(() => <p>ListSelector</p>);
  eventLogViewerSpy = jest.fn<JSX.Element, [EventLogViewerProps]>(() => <p>EventLogViewer</p>);
  createShoppingListFormSpy = jest.fn<JSX.Element, [CreateShoppingListFormProps]>(() => <p>CreateShoppingListForm</p>)

  const ShoppingList = _ShoppingList(addItemFormSpy, itemListSpy, eventLogViewerSpy);
  const ShoppingListViewer = ShoppingListViewerConstructor(listSelectorSpy, ShoppingList, createShoppingListFormSpy);

  render(<LoggedInUserContext.Provider value={loggedInUser}>
    <ShoppingListViewer />
  </LoggedInUserContext.Provider>);
})

test('renders the ListSelector', async () => {
  expect(await screen.findByText('ListSelector')).toBeInTheDocument();
});

test('passes the loggedInUser to the ListSelector', async () => {
  expect(listSelectorSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ loggedInUser }),
    {}
  )
});

describe('without selecting a shopping list', () => {
  test('ItemList is not displayed', () => {
    expect(itemListSpy).not.toBeCalled();
  });

  test('EventLogViewer is not displayed', () => {
    expect(eventLogViewerSpy).not.toBeCalled();
  });

  test('AddItemForm is not displayed', () => {
    expect(addItemFormSpy).not.toBeCalled();
  });
});

describe('clicking create list', () => {
  beforeEach(async () => {
    await act(async () => {
      (await screen.findByText(/create list/i)).click();
    });
  });

  test('renders the CreateShoppingListForm', async () => {
    expect(await screen.findByText('CreateShoppingListForm')).toBeInTheDocument();
  });

  test('passes the loggedInUser to the CreateShoppingListForm', () => {
    expect(createShoppingListFormSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ loggedInUser }),
      {}
    );
  });

  test('clears the ListSelector value', () => {
    expect(listSelectorSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: null }),
      {}
    );
  });

  describe('and creating a list', () => {
    const newlyCreatedShoppingList = ShoppingListFactory.build({
      id: 'fresh-list',
      name: 'List of freshness',
    });

    beforeEach(() => {
      act(() => {
        const createShoppingListFormProps = createShoppingListFormSpy.mock.calls[0][0];
        createShoppingListFormProps.onCreate!(newlyCreatedShoppingList);
      });
    });

    test('switches the ListSelector to the newly created list', () => {
      expect(listSelectorSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: newlyCreatedShoppingList }),
        {}
      );
    });
  });
});

describe('selecting a shopping list', () => {
  const selectedShoppingList = ShoppingListFactory.build({
    id: '200',
    name: 'Adrians fantastic list',
  });

  beforeEach(() => {
    act(() => {
      const listSelectorProps = listSelectorSpy.mock.calls[0][0];
      listSelectorProps.onSelect(selectedShoppingList);
    });
  });

  test('passes the list to the ListSelector', () => {
    expect(listSelectorSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: selectedShoppingList }),
      {}
    );
  });

  test('renders the ItemList', async () => {
    expect(await screen.findByText('ItemList')).toBeInTheDocument();
  });

  test('passes the shoppingList prop to the ItemList', () => {
    expect(itemListSpy).toHaveBeenLastCalledWith({ shoppingList: selectedShoppingList }, {});
  })

  test('renders the EventLogViewer', async () => {
    expect(await screen.findByText('EventLogViewer')).toBeInTheDocument();
  });

  test('passes the shoppingList prop to the EventLogViewer', () => {
    expect(eventLogViewerSpy).toHaveBeenLastCalledWith({ shoppingList: selectedShoppingList }, {});
  })

  test('renders the AddItemForm', async () => {
    expect(await screen.findByText('AddItemForm')).toBeInTheDocument();
  });

  test('passes the shoppingList prop to the AddItemForm', () => {
    expect(addItemFormSpy).toHaveBeenLastCalledWith({ shoppingList: selectedShoppingList }, {});
  })
});
