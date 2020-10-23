import AddItemFormConstructor from "./";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import ShoppingListFactory from "../factories/ShoppingList";
import ShoppingListItemFactory from "../factories/ShoppingListItem";
import { AddToShoppingListRequest } from "../use_cases/AddToShoppingList";

let itemSearchBox: HTMLElement, addItemButton: HTMLElement
let addToShoppingListMock: jest.Mock<void, [AddToShoppingListRequest]>

const shoppingList = ShoppingListFactory.build({
  name: 'Cake ingredients'
});

const searchForItemSpy = jest.fn((list) => {return Promise.resolve([ShoppingListItemFactory.build({list, id: 'x', name: 'Granulated Sugar' })])});

beforeEach(() => {
  addToShoppingListMock = jest.fn<void, [AddToShoppingListRequest]>();
  const AddItemForm = AddItemFormConstructor(addToShoppingListMock, searchForItemSpy);

  render(<AddItemForm shoppingList={shoppingList} />);

  itemSearchBox = screen.getByRole('textbox');
  expect(itemSearchBox).toBeInTheDocument();

  addItemButton = screen.getByText(/add/i);
  expect(addItemButton).toBeInTheDocument();
});

describe('Searching for "Granulated"', () => {
  beforeEach(async () => {
    fireEvent.change(
      itemSearchBox,
      { target: { value: 'Granulated'} }
    );

    await screen.findByRole('listbox');
  });

  test('calls the shoppingListItemSearcher', () => {
    expect(searchForItemSpy).toHaveBeenLastCalledWith(shoppingList, 'Granulated')
  });

  test('displays "Granulated sugar" search result', async () => {
    expect(await screen.findByText(/Granulated sugar/i)).toBeInTheDocument();
  });

  test('displays option to "Add Granulated"', async () => {
    const options = await screen.findAllByRole('option');
    expect(options.map(o => o.textContent)).toContain('Add Granulated');
  });

  describe('and adding "Granulated Sugar" to the list', () => {
    beforeEach(async () => {
      fireEvent.click(await screen.findByText(/Granulated Sugar/i));

      fireEvent.click(addItemButton);
    });

    test('calls addToShoppingList UseCase', () => {
      expect(addToShoppingListMock).toBeCalledWith<[AddToShoppingListRequest]>(
        { name: 'Granulated Sugar', list: shoppingList }
      );
    });

    test('empties the search box', () => {
      expect(itemSearchBox).toHaveValue('')
    });
  });

  describe('clicking on "Add Granulated"', () => {
    beforeEach(async () => {
      fireEvent.click(await screen.findByRole((role, element) => {
        return role === 'option' && element.textContent === "Add Granulated";
      }));
    });

    test('displays "Granulated" in search box', async () => {
      expect(await screen.getByRole('alert')).toHaveTextContent('Granulated');
    });

    describe('and clicking on add', () => {
      beforeEach(() => {
        fireEvent.click(addItemButton);
      });

      test('calls the addToShoppingList UseCase', () => {
        expect(addToShoppingListMock).toBeCalledWith<[AddToShoppingListRequest]>({
          name: 'Granulated',
          list: shoppingList,
        });
      });

      test('empties the search box', () => {
        expect(itemSearchBox).toHaveValue('')
      });
    });
  });
});
