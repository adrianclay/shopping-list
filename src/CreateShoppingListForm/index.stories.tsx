import React from 'react';
import CreateShoppingListFormConstructor from "./";
import {action} from '@storybook/addon-actions';
import ShoppingList from '../domain/ShoppingList';

const simulatedSaveDelayInMs = 500;

const CreateShoppingListForm = CreateShoppingListFormConstructor({
  addShoppingList: (list) => {
    action('addShoppingList')(list);

    return new Promise<ShoppingList>((resolve) => setTimeout(() => resolve({
      ...list, id: 'random-' + Math.floor(Math.random() * 900 + 100)
    }), simulatedSaveDelayInMs));
  }
});

export default {
  title: 'CreateShoppingListForm',
  component: CreateShoppingListForm,
};

export const Example = () => <CreateShoppingListForm loggedInUser={{
  displayName: 'Dmitri',
  uid: 'dmitri',
}} onCreate={action('onCreate')} />
