import React from 'react';
import ItemListConstructor from '.';
import { action } from '@storybook/addon-actions';
import { Segment } from 'semantic-ui-react';

const ShoppingListItemDeleterSpy = {
  deleteItem: action('deleteItem')
};

const ShoppingListItemUpdaterSpy = {
  updateItem: (item: any) => {
    action('updateItem')(item);
    return Promise.resolve(100);
  }
};

const ItemList = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    onUpdate([
      { name: 'Pickles', list, id: 'pickles' },
      { name: 'Cream soda', list, id: 'cream-soda' }
    ]);
    return () => {};
  }
}, ShoppingListItemDeleterSpy, ShoppingListItemUpdaterSpy);

const shoppingList= {
  id: 'adrians-list',
  name: 'Bits and Bobs',
  owner_uids: ['adrian']
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
}, ShoppingListItemDeleterSpy, ShoppingListItemUpdaterSpy);

export const WithoutItems = () => <ItemListWithoutItems shoppingList={shoppingList}/>

const ItemListLoading = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    return () => {};
  }
}, ShoppingListItemDeleterSpy, ShoppingListItemUpdaterSpy);

export const Loading = () => <ItemListLoading shoppingList={shoppingList}/>
