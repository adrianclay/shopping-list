import { render, fireEvent, screen, act } from "@testing-library/react";
import React from "react";
import EditItemFormConstructor from ".";

const shoppingListItemUpdaterSpy = {
  updateItem: jest.fn()
};

const shoppingList = {
  name: 'Art supplies',
  id: '1ARTYlist',
  owner_uids: ['neil']
};

const lasagneSheetItem = {
  name: 'Lasagne Sheets',
  id: '190',
  list: shoppingList
};

const onSaveSpy = jest.fn();

beforeEach(async () => {
  const EditItemForm = EditItemFormConstructor(shoppingListItemUpdaterSpy);
  render(<EditItemForm item={lasagneSheetItem} onSave={onSaveSpy} />);
});

describe('saving a new name', () => {
  beforeEach(async () => {
    fireEvent.change(
      await screen.findByLabelText(/name/i),
      { target: { value: 'Chicken nuggets' } }
    );

    await act(async () => {
      fireEvent.click(await screen.findByText(/save/i));
    });
  });

  test('calls the shoppingListItemUpdater', async () => {
    expect(shoppingListItemUpdaterSpy.updateItem).toHaveBeenLastCalledWith({
      ...lasagneSheetItem,
      name: 'Chicken nuggets'
    });
  });

  test('calls the onSave prop', () => {
    expect(onSaveSpy).toHaveBeenCalled();
  });
});

describe('saving a quantity without units', () => {
  beforeEach(async () => {
    fireEvent.change(
      await screen.findByLabelText(/quantity/i),
      { target: { value: '900' } }
    );

    await act(async () => {
      fireEvent.click(await screen.findByText(/save/i));
    });
  });

  test('calls the shoppingListItemUpdater', async () => {
    expect(shoppingListItemUpdaterSpy.updateItem).toHaveBeenLastCalledWith({
      ...lasagneSheetItem,
      quantity: { scalar: 900 }
    });
  });
});

describe('saving a quantity with units', () => {
  beforeEach(async () => {
    fireEvent.change(
      await screen.findByLabelText(/quantity/i),
      { target: { value: '10' } }
    );

    screen.getByRole('listbox').click();
    screen.getByText('ml').click();

    await act(async () => {
      fireEvent.click(await screen.findByText(/save/i));
    });
  });

  test('calls the shoppingListItemUpdater', async () => {
    expect(shoppingListItemUpdaterSpy.updateItem).toHaveBeenLastCalledWith({
      ...lasagneSheetItem,
      quantity: { scalar: 10, units: 'ml' }
    });
  });
});

test('prepopulates the name field', async () => {
  expect(await screen.getByLabelText(/name/i)).toHaveValue(lasagneSheetItem.name);
});
