import React from 'react';
import AddItemForm from "./";
import {action} from '@storybook/addon-actions';

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};

export const Example = () => <AddItemForm shoppingListItemAdder={{addShoppingListItem: action('addShoppingListItem')}}/>


