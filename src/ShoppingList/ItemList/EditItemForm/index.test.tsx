import { render, fireEvent, screen, act } from "@testing-library/react";
import React from "react";
import EditItemFormConstructor from ".";
import ShoppingListItem from "../../../domain/ShoppingListItem";
import ShoppingListItemFactory from "../../../factories/ShoppingListItem";

const saveShoppingListItemSpy = jest.fn<Promise<unknown>, [ShoppingListItem]>();

const lasagneSheetItem = ShoppingListItemFactory.build({
  name: 'Lasagne Sheets',
  quantity: {
    scalar: 314,
    units: null,
  }
});

const onSaveSpy = jest.fn();

beforeEach(async () => {
  const EditItemForm = EditItemFormConstructor(saveShoppingListItemSpy);
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

  test('calls saveShoppingListItem with the new name ', async () => {
    expect(saveShoppingListItemSpy).toHaveBeenLastCalledWith({
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

  test('calls saveShoppingListItem with the new quantity', async () => {
    expect(saveShoppingListItemSpy).toHaveBeenLastCalledWith<[ShoppingListItem]>({
      ...lasagneSheetItem,
      quantity: { scalar: 900, units: null }
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

  test('calls saveShoppingListItem with the new quantity', async () => {
    expect(saveShoppingListItemSpy).toHaveBeenLastCalledWith({
      ...lasagneSheetItem,
      quantity: { scalar: 10, units: 'ml' }
    });
  });
});

describe('saving a non-numeric quantity', () => {
  beforeEach(async () => {
    fireEvent.change(
      await screen.findByLabelText(/quantity/i),
      { target: { value: 'a few, but not too many' } }
    );

    await act(async () => {
      fireEvent.click(await screen.findByText(/save/i));
    });
  });

  test('displays the original value in the text box', async () => {
    const quantityBox = await screen.findByLabelText(/quantity/i);
    expect(quantityBox).toHaveValue('a few, but not too many');
  });

  test('calls saveShoppingListItem without a quantity', async () => {
    expect(saveShoppingListItemSpy).toHaveBeenLastCalledWith<[ShoppingListItem]>({
      ...lasagneSheetItem,
      quantity: null
    });
  });
});

test('prepopulates the name field', async () => {
  expect(await screen.getByLabelText(/name/i)).toHaveValue(lasagneSheetItem.name);
});

test('prepopulates the quantity field', async () => {
  expect(await screen.getByLabelText(/quantity/i)).toHaveValue('314')
});
