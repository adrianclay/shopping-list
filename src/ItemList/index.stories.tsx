import React from 'react';
import ItemListConstructor from '.';
import { action } from '@storybook/addon-actions';
import { Segment } from 'semantic-ui-react';

const ShoppingListItemDeleterSpy = {
  deleteItem: action('deleteItem')
};

const ItemList = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    onUpdate([
      { name: 'Pickles', list, id: 'pickles' },
      { name: 'Cream soda', list, id: 'cream-soda' }
    ]);
    return () => {};
  }
}, ShoppingListItemDeleterSpy);

const shoppingList= {
  id: 'adrians-list',
  name: 'Bits and Bobs',
  owner_uid: 'adrian'
};

export default {
  title: 'ItemList',
  component: ItemList,
};

export const WithItems = () => <Segment.Group>
  <ItemList shoppingList={shoppingList}/>
</Segment.Group>


const ItemListWithoutItems = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    onUpdate([]);
    return () => {};
  }
}, ShoppingListItemDeleterSpy);

export const WithoutItems = () => <ItemListWithoutItems shoppingList={shoppingList}/>

const ItemListLoading = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    return () => {};
  }
}, ShoppingListItemDeleterSpy);

export const Loading = () => <ItemListLoading shoppingList={shoppingList}/>
