import React from "react";
import { action } from "@storybook/addon-actions";
import EditItemFormConstructor from ".";

const ShoppingListItemUpdaterSpy = {
  updateItem: (item: any) => {
    action('updateItem')(item);
    return Promise.resolve(100);
  }
};

const EditItemForm = EditItemFormConstructor(ShoppingListItemUpdaterSpy);

const item = {
  list: { id: '200', name: 'Itemz', owner_uids: ['bob'] },
  id: '100',
  name: 'Grapes',
};

export default {
  title: 'ItemList/EditItemForm',
  component: EditItemForm,
};

export const Example = () => <EditItemForm item={item} onSave={action('onSave')} />
