import React from "react";
import { action } from "@storybook/addon-actions";
import EditItemFormConstructor from ".";
import ShoppingListItemFactory from "../../factories/ShoppingListItem";

const EditItemForm = EditItemFormConstructor(item => {
  action('updateItem')(item);
  return Promise.resolve(100);
});

const item = ShoppingListItemFactory.build({
  name: 'Grapes'
});

export default {
  title: 'ItemList/EditItemForm',
  component: EditItemForm,
};

export const Example = () => <EditItemForm item={item} onSave={action('onSave')} />
