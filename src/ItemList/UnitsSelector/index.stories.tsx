import React from "react";
import UnitsSelector from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: 'ItemList/UnitsSelector',
  component: UnitsSelector,
};

export const Selector = () => <UnitsSelector onChange={action('onChange')} />;
