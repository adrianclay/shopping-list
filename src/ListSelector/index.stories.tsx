import React from 'react';
import ListSelector from "./";
import { action } from '@storybook/addon-actions';

export default {
  title: 'ListSelector',
  component: ListSelector,
};

export const WithItems = () => <ListSelector shoppingListFetcher={{ subscribeToListChanges: (onUpdate, onError) => {
  onUpdate([{
    id: '101',
    name: 'Christmas wish list'
  },{
    id: '102',
    name: 'Weekly shop'
  }]);
  return () => {};
} }} onSelect={action('onSelect')} />

export const WithError = () => <ListSelector shoppingListFetcher={{ subscribeToListChanges: (onUpdate, onError) => {
  onError();
  return () => {};
} }} onSelect={action('onSelect')} />

export const Loading = () => <ListSelector shoppingListFetcher={{ subscribeToListChanges: (onUpdate, onError) => {
  return () => {};
} }} onSelect={action('onSelect')} />
