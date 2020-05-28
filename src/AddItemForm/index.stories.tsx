import React from 'react';
import AddItemFormConstructor from "./";
import {action} from '@storybook/addon-actions';

const AddItemForm = AddItemFormConstructor({addShoppingListItem: action('addShoppingListItem')})

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};

export const Example = () => <AddItemForm />
