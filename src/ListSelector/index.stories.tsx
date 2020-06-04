import React from 'react';
import { action } from '@storybook/addon-actions';
import ListSelectorConstructor from './';

const loggedInUser = {
  uid: 'rianne',
  displayName: 'Rianne'
};

const ListSelectorWithItems = ListSelectorConstructor({ subscribeToListChanges: (loggedInUser, onUpdate, onError) => {
  onUpdate([{
    id: '101',
    name: 'Christmas wish list',
    owner_uid: 'you',
  },{
    id: '102',
    name: 'Weekly shop',
    owner_uid: 'you',
  }]);
  return () => {};
} });
export const WithItems = () => <ListSelectorWithItems onSelect={action('onSelect')} loggedInUser={loggedInUser} />

const ListSelectorWithError = ListSelectorConstructor({ subscribeToListChanges: (loggedInUser, onUpdate, onError) => {
  onError();
  return () => {};
} });
export const WithError = () => <ListSelectorWithError onSelect={action('onSelect')} loggedInUser={loggedInUser} />

const ListSelectorLoading = ListSelectorConstructor({ subscribeToListChanges: (loggedInUser, onUpdate, onError) => {
  return () => {};
} });
export const Loading = () => <ListSelectorLoading onSelect={action('onSelect')} loggedInUser={loggedInUser} />


export default {
  title: 'ListSelector',
  component: ListSelectorWithItems,
};
