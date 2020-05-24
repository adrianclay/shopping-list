import React from 'react';
import ListSelector from "./";

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
} }} />

export const WithError = () => <ListSelector shoppingListFetcher={{ subscribeToListChanges: (onUpdate, onError) => {
  onError();
  return () => {};
} }} />

export const Loading = () => <ListSelector shoppingListFetcher={{ subscribeToListChanges: (onUpdate, onError) => {
  return () => {};
} }} />
