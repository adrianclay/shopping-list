import React from 'react';
import CreateShoppingListFormConstructor from "./";
import {action} from '@storybook/addon-actions';
import ShoppingList from '../domain/ShoppingList';
import ShoppingListFactory from '../factories/ShoppingList';

const simulatedSaveDelayInMs = 500;

const CreateShoppingListForm = CreateShoppingListFormConstructor(list => {
  action('addShoppingList')(list);

  return new Promise<ShoppingList>(resolve => setTimeout(
    () => resolve(ShoppingListFactory.build({ ...list })
  ), simulatedSaveDelayInMs));
});

const CreateShoppingListFormStories = {
  title: 'CreateShoppingListForm',
  component: CreateShoppingListForm,
};
export default CreateShoppingListFormStories;

export const Example = () => <CreateShoppingListForm loggedInUser={{
  displayName: 'Dmitri',
  uid: 'dmitri',
}} onCreate={action('onCreate')} />
