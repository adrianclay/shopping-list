import React from 'react';
import CreateShoppingListFormConstructor from "./";
import {action} from '@storybook/addon-actions';

const simulatedSaveDelayInMs = 500;
const addShoppingList = (...args: any[]) => {
  action('addShoppingList')(args);
  return new Promise((resolve) => setTimeout(resolve, simulatedSaveDelayInMs));
};

const CreateShoppingListForm = CreateShoppingListFormConstructor({ addShoppingList })

export default {
  title: 'CreateShoppingListForm',
  component: CreateShoppingListForm,
};

export const Example = () => <CreateShoppingListForm loggedInUser={{
  displayName: 'Dmitri',
  uid: 'dmitri',
}} />
