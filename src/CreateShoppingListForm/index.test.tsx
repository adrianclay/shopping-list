import { render, fireEvent } from "@testing-library/react";
import React from "react";
import CreateShoppingListFormConstructor from ".";

let addShoppingListSpy: jest.Mock;
let nameTextBox: HTMLElement;
let createButton: HTMLElement;

beforeEach(() => {
  addShoppingListSpy = jest.fn();
  const CreateShoppingListForm = CreateShoppingListFormConstructor({ addShoppingList: addShoppingListSpy });
  const { getByLabelText, getByText } = render(<CreateShoppingListForm />);

  nameTextBox = getByLabelText(/name/i);
  createButton = getByText(/create/i);
});

test('displays item text in text box', () => {
  fireEvent.change(nameTextBox, {target: {value: 'Underwear list'}});

  expect(nameTextBox).toHaveValue('Underwear list');
})

test('adds shopping list', () => {
  fireEvent.change(nameTextBox, {target: {value: 'Party bag items'}});
  fireEvent.click(createButton);

  expect(addShoppingListSpy).toBeCalledWith({name: 'Party bag items'});
})
