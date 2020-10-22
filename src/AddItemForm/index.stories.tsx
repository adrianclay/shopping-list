import React from 'react';
import AddItemFormConstructor from "./";
import {action} from '@storybook/addon-actions';
import ShoppingListFactory from '../factories/ShoppingList';

const AddItemForm = AddItemFormConstructor(
  action('addShoppingListItem'),
  (list, query) => {
    action('searchForItems')(list, query);
    return Promise.resolve([]);
  }
);

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};

const shoppingList = ShoppingListFactory.build({
  name: 'Butchers list'
});

export const Example = () => <AddItemForm shoppingList={shoppingList} />
