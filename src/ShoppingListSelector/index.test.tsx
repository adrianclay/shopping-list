import { render, act, screen } from "@testing-library/react";

import _ShoppingListSelector from ".";
import { ListSelectorProps } from "../ListSelector";
import { CreateShoppingListFormProps } from "../CreateShoppingListForm";
import { LoggedInUserContext } from "../Login";
import ShoppingListFactory from "../factories/ShoppingList";
import _ShoppingList from "../ShoppingList";
import { ShoppingListPath } from "../pages/ShoppingListPage";
import { MemoryRouter, useLocation, Location } from "react-router-dom";

const loggedInUser = {
  uid: '100',
  displayName: 'Barry'
};

let listSelectorSpy: jest.Mock<JSX.Element, [ListSelectorProps]>;
let createShoppingListFormSpy: jest.Mock<JSX.Element, [CreateShoppingListFormProps]>;
let locationSpy: Location;

beforeEach(() => {
  listSelectorSpy = jest.fn<JSX.Element, [ListSelectorProps]>(() => <p>ListSelector</p>);
  createShoppingListFormSpy = jest.fn<JSX.Element, [CreateShoppingListFormProps]>(() => <p>CreateShoppingListForm</p>)

  const ShoppingListSelector = _ShoppingListSelector(listSelectorSpy, createShoppingListFormSpy, ShoppingListPath);

  const SpyOnLocation = () => {
    locationSpy = useLocation();
    return null;
  };
  render(<MemoryRouter>
    <SpyOnLocation></SpyOnLocation>
    <LoggedInUserContext.Provider value={loggedInUser}>
      <ShoppingListSelector />
    </LoggedInUserContext.Provider>
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

test('passes the loggedInUser to the CreateShoppingListForm', () => {
  expect(createShoppingListFormSpy).toHaveBeenLastCalledWith(
    expect.objectContaining({ loggedInUser }),
    {}
  );
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

  test('redirects to the shopping-list page', () => {
    const expectedLocation = ShoppingListPath({ shoppingListId: selectedShoppingList.id });
    expect(locationSpy.pathname).toBe(expectedLocation);
  });
});
