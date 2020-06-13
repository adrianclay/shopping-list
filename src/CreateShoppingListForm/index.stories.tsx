import React from 'react';
import CreateShoppingListFormConstructor from "./";
import {action} from '@storybook/addon-actions';

const CreateShoppingListForm = CreateShoppingListFormConstructor({ addShoppingList: action('addShoppingList') })

export default {
  title: 'CreateShoppingListForm',
  component: CreateShoppingListForm,
};

export const Example = () => <CreateShoppingListForm />
