import { render, fireEvent, screen, waitForElementToBeRemoved, act } from "@testing-library/react";
import React from "react";
import CreateShoppingListFormConstructor from ".";

let addShoppingListSpy: jest.Mock;
let nameTextBox: HTMLElement;
let createButton: HTMLElement;
let finishAddingShoppingList: () => void;

const loggedInUser = {
  displayName: 'Mickey',
  uid: '777'
};

beforeEach(() => {
  addShoppingListSpy = jest.fn(() => new Promise(resolve => {
    finishAddingShoppingList = resolve;
  }));
  const CreateShoppingListForm = CreateShoppingListFormConstructor({ addShoppingList: addShoppingListSpy });
  const { getByLabelText, getByText } = render(<CreateShoppingListForm loggedInUser={loggedInUser} />);

  nameTextBox = getByLabelText(/name/i);
  createButton = getByText(/create/i);
});

describe('populating the name', () => {

  beforeEach(() => {
    fireEvent.change(nameTextBox, {target: {value: 'Underwear list'}});
  })

  test('displays item text in text box', () => {
    expect(nameTextBox).toHaveValue('Underwear list');
  });

  describe('submitting the form', () => {
    beforeEach(() => {
      fireEvent.click(createButton);
    });

    test('adds shopping list', () => {
      expect(addShoppingListSpy).toBeCalledWith({name: 'Underwear list', owner_uids: [loggedInUser.uid]});
    });

    test('displays loading message', () => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('finish loading, hides the loading message', () =>
      act(async () => {
        finishAddingShoppingList();
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
      })
    );
  });

});
