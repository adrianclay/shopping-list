import React from "react";
import { render, screen } from "@testing-library/react";

import UnitsSelector from ".";
import UnitsOfMeasurement from "../../../domain/UnitsOfMeasurement";

describe('selecting "g" from the dropdown', () => {
  const onChangeSpy = jest.fn<void, [UnitsOfMeasurement?]>();
  beforeEach(() => {
    onChangeSpy.mockReset();
    render(<UnitsSelector onChange={onChangeSpy} />);

    openDropdown();
    screen.getByText('g').click();
  });

  test('calls onChange prop with "g"', () => {
    expect(onChangeSpy).toHaveBeenLastCalledWith('g');
  });

  describe('then selecting "Units" from the dropdown', () => {
    beforeEach(() => {
      screen.getByText('Units').click();
    });

    test('calls onChange prop with <undefined>', () => {
      expect(onChangeSpy).toHaveBeenLastCalledWith(undefined);
    });
  });
});

describe('not passing in the value prop', () => {
  test('renders select with text "Units"', () => {
    render(<UnitsSelector />);

    expect(screen.getByRole('alert')).toHaveTextContent('Units');
  });
});

describe('passing in the value prop as "l"', () => {
  test('renders select with text "l"', () => {
    render(<UnitsSelector value='l'/>);

    expect(screen.getByRole('alert')).toHaveTextContent('l');
  });
});


function openDropdown() {
  const dropDown = screen.getByRole('listbox');
  dropDown.click();
}
