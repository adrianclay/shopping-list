import React from 'react';
import ItemListConstructor from '.';
import { action } from '@storybook/addon-actions';
import { Button, Segment } from 'semantic-ui-react';
import { EditItemFormProps } from './EditItemForm';

const ShoppingListItemDeleterSpy = {
  deleteItem: action('deleteItem')
};

const EditItemForm = ({ onSave }: EditItemFormProps) => {
  return <>
    Edit Form
    <Button floated='right' size='mini' onClick={onSave}>
      Close
    </Button>
  </>;
}

const ItemList = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    onUpdate([
      { name: 'Pickles', list, id: 'pickles' },
      { name: 'Cream soda', list, id: 'cream-soda', quantity: { scalar: 12 } },
      { name: 'Cream', list, id: 'cream', quantity: { scalar: 150, units: 'ml' } }
    ]);
    return () => {};
  }
}, ShoppingListItemDeleterSpy, EditItemForm);

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
}, ShoppingListItemDeleterSpy, EditItemForm);

export const WithoutItems = () => <ItemListWithoutItems shoppingList={shoppingList}/>

const ItemListLoading = ItemListConstructor({
  subscribeToItemChanges(list, onUpdate, onError) {
    return () => {};
  }
}, ShoppingListItemDeleterSpy, EditItemForm);

export const Loading = () => <ItemListLoading shoppingList={shoppingList}/>
