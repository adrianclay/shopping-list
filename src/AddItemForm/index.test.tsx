import AddItemFormConstructor from "./";
import React from "react";
import {fireEvent, render} from "@testing-library/react";
import ShoppingListItem from '../domain/ShoppingListItem';

let itemTextBox: HTMLElement, addItemButton: HTMLElement
let addShoppingListItemMock: jest.Mock<void, ShoppingListItem[]>

const shoppingList = {
  name: 'Cake ingredients',
  id: '08CAKE90'
};

beforeEach(() => {
  addShoppingListItemMock = jest.fn<void, ShoppingListItem[]>();
  const AddItemForm = AddItemFormConstructor({ addShoppingListItem: addShoppingListItemMock });

  const { getByLabelText, getByText } = render(<AddItemForm shoppingList={shoppingList} />);

  itemTextBox = getByLabelText(/item/i);
  addItemButton = getByText(/add/i);
})

test('displays item text in text box', () => {
  fireEvent.change(
    itemTextBox,
    { target: { value: 'input text'} }
  )

  expect(itemTextBox).toHaveValue('input text')
})

test('adds shopping list item', () => {
  fireEvent.change(
    itemTextBox,
    { target: { value: 'Granulated Sugar'} }
  )
  fireEvent.click(addItemButton)

  expect(addShoppingListItemMock).toBeCalledWith<[ShoppingListItem]>({
    name: 'Granulated Sugar',
    list: shoppingList,
  })
});

test('clears item name when adding an item', () => {
  fireEvent.change(
    itemTextBox,
    { target: { value: 'Maple Syrup'} }
  )
  fireEvent.click(addItemButton)

  expect(itemTextBox).toHaveValue('')
})
