import AddItemFormConstructor, { ItemToAdd } from "./";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingListFactory from "../factories/ShoppingList";

let itemSearchBox: HTMLElement, addItemButton: HTMLElement
let readdShoppingListItem: jest.Mock<void, [ShoppingListItem]>
let addShoppingListItemMock: jest.Mock<void, [ItemToAdd]>

const shoppingList = ShoppingListFactory.build({
  name: 'Cake ingredients'
});

const searchForItemSpy = jest.fn((list) => {return Promise.resolve([{list, id: 'x', name: 'Granulated Sugar' }])});

beforeEach(() => {
  readdShoppingListItem = jest.fn<void, [ShoppingListItem]>();
  addShoppingListItemMock = jest.fn<void, [ItemToAdd]>();
  const AddItemForm = AddItemFormConstructor(readdShoppingListItem, addShoppingListItemMock, searchForItemSpy);

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

    test('calls readdShoppingListItem', () => {
      expect(readdShoppingListItem).toBeCalledWith<[ShoppingListItem]>(
        expect.objectContaining({ id: 'x', list: shoppingList })
      );
    });

    test('empties the search box', () => {
      expect(itemSearchBox).toHaveValue('')
    });
  });

  describe('clicking on "Add Granulated"', () => {
    beforeEach(async () => {
      fireEvent.click(await screen.findByRole((role, element) => {
        return role == 'option' && element.textContent == "Add Granulated";
      }));
    });

    test('displays "Granulated" in search box', async () => {
      expect(await screen.getByRole('alert')).toHaveTextContent('Granulated');
    });

    describe('and clicking on add', () => {
      beforeEach(() => {
        fireEvent.click(addItemButton);
      });

      test('calls the addShoppingListItem service', () => {
        expect(addShoppingListItemMock).toBeCalledWith<[ShoppingListItem]>({
          name: 'Granulated',
          list: shoppingList,
        })
      });

      test('empties the search box', () => {
        expect(itemSearchBox).toHaveValue('')
      });
    });
  });
});
