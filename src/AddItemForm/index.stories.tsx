import React from 'react';
import AddItemFormConstructor from "./";
import {action} from '@storybook/addon-actions';

const AddItemForm = AddItemFormConstructor({addShoppingListItem: action('addShoppingListItem')})

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};

export const Example = () => <AddItemForm shoppingList={{ id: '0800', name: 'Butchers list', owner_uid: 'meat-dr' }} />
