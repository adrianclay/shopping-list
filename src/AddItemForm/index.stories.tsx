import React from 'react';
import AddItemFormConstructor from "./";
import {action} from '@storybook/addon-actions';

const AddItemForm = AddItemFormConstructor(
  action('readdShoppingListItem'),
  {
    addShoppingListItem: action('addShoppingListItem')
  }, {
    searchForItems: (list, query) => { action('searchForItems')(list, query); return Promise.resolve([]); }
  }
);

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};

const shoppingList = { id: '0800', name: 'Butchers list', owner_uids: ['meat-dr'] };

export const Example = () => <AddItemForm shoppingList={shoppingList} />
