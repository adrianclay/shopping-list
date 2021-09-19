import UnitsSelector from ".";
import { action } from "@storybook/addon-actions";

const UnitsSelectorStories = {
  title: 'ItemList/UnitsSelector',
  component: UnitsSelector,
};
export default UnitsSelectorStories;

export const Selector = () => <UnitsSelector onChange={action('onChange')} />;
