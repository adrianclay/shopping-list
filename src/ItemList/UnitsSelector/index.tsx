import UnitsOfMeasurement from "../../domain/UnitsOfMeasurement";

import React from "react";
import { Select, SelectProps } from "semantic-ui-react";

const EMPTY_DROPDOWN_VALUE = 'units';

const options = [
  {text: 'Units', value: EMPTY_DROPDOWN_VALUE},
  {text: 'ml', value: 'ml'},
  {text: 'g', value: 'g'},
];

interface UnitsSelectorProps {
  value?: UnitsOfMeasurement;
  onChange?: (value?: UnitsOfMeasurement) => void;
};

function UnitsSelector({ value, onChange }: UnitsSelectorProps) {
  const selectProps : SelectProps = {
    options,
    defaultValue: EMPTY_DROPDOWN_VALUE,
  };

  if (value) {
    selectProps.value = value;
  }

  if (onChange) {
    selectProps.onChange = (_, { value }) => {
      if (value === EMPTY_DROPDOWN_VALUE) {
        value = undefined;
      }
      onChange(value as UnitsOfMeasurement | undefined);
    }
  }

  return <Select {...selectProps} />;
}

export default UnitsSelector;
