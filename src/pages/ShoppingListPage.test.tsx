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

  test('calls getShoppingList with the URIs shoppingListId', async () => {
    expect(getShoppingList).toHaveBeenLastCalledWith('super-shopping-list-id', expect.anything(), expect.anything());
  });

  test('shows a loading message', async () => {
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  describe('with a valid shopping list', () => {
    test('renders the ShoppingList component with the shoppingList', async () => {
      const shoppingList = ShoppingListFactory.build();
      getShoppingListServiceStub.performUpdate(shoppingList);

      expect(ShoppingListStub).toHaveBeenCalledWith({ shoppingList }, {});
    });
  });

  describe('with an error', () => {
    test('displays an error message', async () => {
      getShoppingListServiceStub.performError(new Error('Pandemic'));

      expect(await screen.findByText('Pandemic')).toBeInTheDocument();
    });
  });

  describe('with a null shopping list', () => {
    test('displays a not found message', async () => {
      getShoppingListServiceStub.performUpdate(null);

      expect(await screen.findByText(/can't be found/)).toBeInTheDocument();
    });
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
