import { render, fireEvent, screen, waitForElementToBeRemoved, act } from "@testing-library/react";
import React from "react";
import CreateShoppingListFormConstructor from ".";
import ShoppingList from "../domain/ShoppingList";

let addShoppingListSpy: jest.Mock;
let nameTextBox: HTMLElement;
let createButton: HTMLElement;
let finishAddingShoppingList: (list: ShoppingList) => void;
let onCreateSpy: jest.Mock;

const loggedInUser = {
  displayName: 'Mickey',
  uid: '777'
};

beforeEach(() => {
  addShoppingListSpy = jest.fn<Promise<ShoppingList>, []>(() => new Promise(resolve => {
    finishAddingShoppingList = resolve;
  }));
  const CreateShoppingListForm = CreateShoppingListFormConstructor({ addShoppingList: addShoppingListSpy });
  onCreateSpy = jest.fn();
  const { getByLabelText, getByText } = render(<CreateShoppingListForm loggedInUser={loggedInUser} onCreate={onCreateSpy} />);

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

    describe('finish loading, hides the loading message', () => {
      const shoppingList = {
        name: 'Underwear list',
        id: 'underwear-list',
        owner_uids: [],
      };

      beforeEach(() =>
        act(async () => {
          finishAddingShoppingList(shoppingList);
          await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        })
      );

      it('and calls onCreate with created shopping list', () => {
        expect(onCreateSpy).toHaveBeenCalledWith(shoppingList);
      });
    });
  });

});
