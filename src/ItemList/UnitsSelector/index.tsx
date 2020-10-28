import UnitsOfMeasurement from "../../domain/UnitsOfMeasurement";

import React from "react";
import { Select, SelectProps } from "semantic-ui-react";

const EMPTY_DROPDOWN_VALUE = 'units';

type DropdownValue = UnitsOfMeasurement | typeof EMPTY_DROPDOWN_VALUE;
const options : { text: string, value: DropdownValue }[] = [
  {text: 'Units', value: EMPTY_DROPDOWN_VALUE},
  {text: 'ml', value: 'ml'},
  {text: 'l', value: 'l'},
  {text: 'g', value: 'g'},
  {text: 'kg', value: 'kg'},
];

interface UnitsSelectorProps {
  value?: UnitsOfMeasurement | null;
  onChange?: (value?: UnitsOfMeasurement) => void;
};

function UnitsSelector({ value, onChange }: UnitsSelectorProps) {
  const selectProps : SelectProps = {
    options,
  };

  if (value) {
    selectProps.value = value;
  } else {
    selectProps.defaultValue = EMPTY_DROPDOWN_VALUE;
  }

  if (onChange) {
    selectProps.onChange = (_, { value }) => {
      const unit = value as DropdownValue;
      onChange(unit === EMPTY_DROPDOWN_VALUE ? undefined : unit);
    }
  }

  return <Select {...selectProps} />;
}

export default UnitsSelector;
