import React from 'react';
import CreateShoppingListForm from "./";
import {action} from '@storybook/addon-actions';

export default {
  title: 'CreateShoppingListForm',
  component: CreateShoppingListForm,
};

export const Example = () => <CreateShoppingListForm shoppingListAdder={{addShoppingList: action('addShoppingList')}}/>
