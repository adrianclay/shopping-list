import React from "react";
import { render, act, screen } from "@testing-library/react";

import ShoppingList from "../domain/ShoppingList";
import ShoppingListViewerConstructor from ".";
import { ItemListProps } from "../ItemList";
import { ListSelectorProps } from "../ListSelector";
import { AddItemFormProps } from "../AddItemForm";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import Login from "../Login";

const loggedInUser = {
  uid: '100',
  displayName: 'Barry'
};

let addItemFormSpy: jest.Mock<JSX.Element, [AddItemFormProps]>;
let itemListSpy: jest.Mock<JSX.Element, [ItemListProps]>;
let listSelectorSpy: jest.Mock<JSX.Element, [ListSelectorProps]>;
let createShoppingListFormSpy: jest.Mock<JSX.Element, [CreateShoppingListFormProps]>;

beforeEach(() => {
  addItemFormSpy = jest.fn<JSX.Element, [AddItemFormProps]>(() => <p>AddItemForm</p>);
  itemListSpy = jest.fn<JSX.Element, [ItemListProps]>(() => <p>ItemList</p>);
  listSelectorSpy = jest.fn<JSX.Element, [ListSelectorProps]>(() => <p>ListSelector</p>);
  createShoppingListFormSpy = jest.fn<JSX.Element, [CreateShoppingListFormProps]>(() => <p>CreateShoppingListForm</p>)

  const ShoppingListViewer = ShoppingListViewerConstructor(listSelectorSpy, addItemFormSpy, itemListSpy, createShoppingListFormSpy);

  render(<Login.LoggedInUserContext.Provider value={loggedInUser}>
    <ShoppingListViewer />
  </Login.LoggedInUserContext.Provider>);
})

test('renders the ListSelector', async () => {
  expect(await screen.findByText('ListSelector')).toBeInTheDocument();
});

test('passes the loggedInUser to the ListSelector', async () => {
  expect(listSelectorSpy).toBeCalledWith(
    expect.objectContaining({ loggedInUser }),
    {}
  )
});

describe('without selecting a shopping list', () => {
  test('ItemList is not displayed', () => {
    expect(itemListSpy).not.toBeCalled();
  });

  test('AddItemForm is not displayed', () => {
    expect(addItemFormSpy).not.toBeCalled();
  });
});

describe('creating a shopping list', () => {
  beforeEach(async () => {
    await act(async () => {
      (await screen.findByText(/create/i)).click();
    });
  });

  test('renders the CreateShoppingListForm', async () => {
    expect(await screen.findByText('CreateShoppingListForm')).toBeInTheDocument();
  });

  test('passes the loggedInUser to the CreateShoppingListForm', () => {
    expect(createShoppingListFormSpy).toBeCalledWith({ loggedInUser }, {});
  });
});

describe('selecting a shopping list', () => {
  const stubShoppingList: ShoppingList = {
    name: 'Adrians fantastic list',
    id: '200',
    owner_uids: []
  };

  beforeEach(() => {
    act(() => {
      const listSelectorProps = listSelectorSpy.mock.calls[0][0];
      listSelectorProps.onSelect(stubShoppingList);
    });
  });

  test('renders the ItemList', async () => {
    expect(await screen.findByText('ItemList')).toBeInTheDocument();
  });

  test('passes the shoppingList prop to the ItemList', () => {
    expect(itemListSpy).toBeCalledWith({ shoppingList: stubShoppingList }, {});
  })

  test('renders the AddItemForm', async () => {
    expect(await screen.findByText('AddItemForm')).toBeInTheDocument();
  });

  test('passes the shoppingList prop to the AddItemForm', () => {
    expect(addItemFormSpy).toBeCalledWith({ shoppingList: stubShoppingList }, {});
  })
});
