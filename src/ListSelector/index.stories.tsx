import React from 'react';
import { action } from '@storybook/addon-actions';
import ListSelectorConstructor from './';

const ListSelectorWithItems = ListSelectorConstructor({ subscribeToListChanges: (onUpdate, onError) => {
  onUpdate([{
    id: '101',
    name: 'Christmas wish list'
  },{
    id: '102',
    name: 'Weekly shop'
  }]);
  return () => {};
} });
export const WithItems = () => <ListSelectorWithItems onSelect={action('onSelect')} />

const ListSelectorWithError = ListSelectorConstructor({ subscribeToListChanges: (onUpdate, onError) => {
  onError();
  return () => {};
} });
export const WithError = () => <ListSelectorWithError onSelect={action('onSelect')} />

const ListSelectorLoading = ListSelectorConstructor({ subscribeToListChanges: (onUpdate, onError) => {
  return () => {};
} });
export const Loading = () => <ListSelectorLoading onSelect={action('onSelect')} />


export default {
  title: 'ListSelector',
  component: ListSelectorWithItems,
};
