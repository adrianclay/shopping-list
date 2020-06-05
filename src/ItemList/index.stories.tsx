import React from 'react';
import ItemListConstructor from '.';

const ItemList = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    onUpdate([
      { name: 'Pickles', list, id: 'pickles' },
      { name: 'Cream soda', list, id: 'cream-soda' }
    ]);
    return () => {};
  }
});

export default {
  title: 'ItemList',
  component: ItemList,
};

export const WithItems = () => <ItemList shoppingList={{ id: 'adrians-list', name: 'Bits and Bobs', owner_uid: 'adrian' }}/>


const ItemListWithoutItems = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    onUpdate([]);
    return () => {};
  }
});

export const WithoutItems = () => <ItemListWithoutItems shoppingList={{ id: 'adrians-list', name: 'Bits and Bobs', owner_uid: 'adrian' }}/>

const ItemListLoading = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    return () => {};
  }
});

export const Loading = () => <ItemListLoading shoppingList={{ id: 'adrians-list', name: 'Bits and Bobs', owner_uid: 'adrian' }}/>
