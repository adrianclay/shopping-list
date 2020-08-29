import React from "react";
import { render, screen } from "@testing-library/react";

import UnitsSelector from ".";
import UnitsOfMeasurement from "../../domain/UnitsOfMeasurement";

describe('selecting grammes', () => {
  const onChangeSpy = jest.fn<void, [UnitsOfMeasurement?]>();
  beforeEach(() => {
    onChangeSpy.mockReset();
    render(<UnitsSelector onChange={onChangeSpy} />);

    openDropdown();
    screen.getByText('g').click();
  });

  test('calls onChange with g', () => {
    expect(onChangeSpy).toHaveBeenLastCalledWith('g');
  });

  describe('then selecting Units', () => {
    beforeEach(() => {
      screen.getByText('Units').click();
    });

    test('calls onChange with <undefined>', () => {
      expect(onChangeSpy).toHaveBeenLastCalledWith(undefined);
    });
  });
});

test('without a value specified displays Units', () => {
  render(<UnitsSelector />);

  expect(screen.getByRole('alert')).toHaveTextContent('Units');
});


function openDropdown() {
  const dropDown = screen.getByRole('listbox');
  dropDown.click();
}
