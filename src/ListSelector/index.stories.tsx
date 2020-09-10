import React from 'react';
import { action } from '@storybook/addon-actions';
import ListSelectorConstructor from './';

const loggedInUser = {
  uid: 'rianne',
  displayName: 'Rianne'
};

const ListSelectorWithItems = ListSelectorConstructor((loggedInUser, onUpdate, onError) => {
  onUpdate([{
    id: '101',
    name: 'Christmas wish list',
    owner_uids: ['you'],
  },{
    id: '102',
    name: 'Weekly shop',
    owner_uids: ['you'],
  }]);
  return () => {};
});
export const WithItems = () => <ListSelectorWithItems onSelect={action('onSelect')} loggedInUser={loggedInUser} />

const ListSelectorWithError = ListSelectorConstructor((loggedInUser, onUpdate, onError) => {
  onError();
  return () => {};
});
export const WithError = () => <ListSelectorWithError onSelect={action('onSelect')} loggedInUser={loggedInUser} />

const ListSelectorLoading = ListSelectorConstructor((loggedInUser, onUpdate, onError) => {
  return () => {};
});
export const Loading = () => <ListSelectorLoading onSelect={action('onSelect')} loggedInUser={loggedInUser} />


export default {
  title: 'ListSelector',
  component: ListSelectorWithItems,
};
