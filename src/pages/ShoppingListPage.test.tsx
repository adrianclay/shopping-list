import React from "react";
import { screen, render } from "@testing-library/react";
import _ShoppingListPage from "./ShoppingListPage";
import { realtimeServiceStub } from "../setupTests";
import ShoppingList from "../domain/ShoppingList";
import { ShoppingListProps } from "../ShoppingList";
import ShoppingListFactory from "../factories/ShoppingList";
import { MemoryRouter } from "react-router-dom";

const ShoppingListStub = jest.fn<JSX.Element, [ShoppingListProps]>(slp => <p>{slp.shoppingList.name}</p>);

const getShoppingListServiceStub = realtimeServiceStub<string, ShoppingList | null>();
const getShoppingList = getShoppingListServiceStub.service;
const ShoppingListPage = _ShoppingListPage(
  ShoppingListStub,
  getShoppingList
);

beforeEach(() => {
  ShoppingListStub.mockClear();
  getShoppingList.mockClear();
});

describe('Visiting /shopping-list/super-shopping-list/id', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/shopping-list/super-shopping-list-id']}>
        <ShoppingListPage />
      </MemoryRouter>
    );
  });

  test('passes in the shoppingListId to getShoppingList', async () => {
    expect(getShoppingList).toHaveBeenLastCalledWith('super-shopping-list-id', expect.anything(), expect.anything());
  });

  test('renders the ShoppingList component with the shoppingList when populated', async () => {
    getShoppingListServiceStub.performUpdate(ShoppingListFactory.build());

    expect(await screen.findByText('List o Shopping')).toBeInTheDocument();
  });

  test('displays an error message', async () => {
    getShoppingListServiceStub.performError(new Error('Pandemic'));

    expect(await screen.findByText('Pandemic')).toBeInTheDocument();
  });
});

describe('Visiting a non-matching URL', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/wishywashy-list/super-shopping-list-id']}>
        <ShoppingListPage />
      </MemoryRouter>
    );
  });

  test('does not call the getShoppingList stub', async () => {
    expect(getShoppingList).not.toHaveBeenCalled();
  });
});
