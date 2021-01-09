import React from "react";
import { render, act, screen } from "@testing-library/react";

import ShoppingListViewerConstructor from ".";
import { ListSelectorProps } from "../ListSelector";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import { LoggedInUserContext } from "../Login";
import ShoppingListFactory from "../factories/ShoppingList";
import _ShoppingList from "../ShoppingList";
import { ShoppingListPath } from "../pages/ShoppingListPage";
import { MemoryRouter, Route } from "react-router-dom";
import * as H from 'history';

const loggedInUser = {
  uid: '100',
  displayName: 'Barry'
};

let listSelectorSpy: jest.Mock<JSX.Element, [ListSelectorProps]>;
let createShoppingListFormSpy: jest.Mock<JSX.Element, [CreateShoppingListFormProps]>;
let testLocation: H.Location;

beforeEach(() => {
  listSelectorSpy = jest.fn<JSX.Element, [ListSelectorProps]>(() => <p>ListSelector</p>);
  createShoppingListFormSpy = jest.fn<JSX.Element, [CreateShoppingListFormProps]>(() => <p>CreateShoppingListForm</p>)

  const ShoppingListViewer = ShoppingListViewerConstructor(listSelectorSpy, createShoppingListFormSpy, ShoppingListPath);

  render(<MemoryRouter>
    <LoggedInUserContext.Provider value={loggedInUser}>
      <ShoppingListViewer />
    </LoggedInUserContext.Provider>
    <Route path="*" render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
  </MemoryRouter>);
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

  test('redirects to the shopping-list page', () => {
    const expectedLocation = ShoppingListPath({ shoppingListId: selectedShoppingList.id });
    expect(testLocation.pathname).toBe(expectedLocation);
  });
});
