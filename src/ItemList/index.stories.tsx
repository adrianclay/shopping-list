import React from 'react';
import ItemListConstructor from '.';
import { action } from '@storybook/addon-actions';
import { Button, Segment } from 'semantic-ui-react';
import { EditItemFormProps } from './EditItemForm';
import ShoppingListFactory from '../factories/ShoppingList';
import ShoppingListItemFactory from '../factories/ShoppingListItem';

const EditItemForm = ({ onSave }: EditItemFormProps) => {
  return <>
    Edit Form
    <Button floated='right' size='mini' onClick={onSave}>
      Close
    </Button>
  </>;
}

const ItemList = ItemListConstructor(
  (list, onUpdate, onError) => {
    onUpdate([
      ShoppingListItemFactory.build({ name: 'Pickles', list }),
      ShoppingListItemFactory.build({ name: 'Cream soda', list, quantity: { scalar: 12 } }),
      ShoppingListItemFactory.build({ name: 'Cream', list, id: 'cream', quantity: { scalar: 150, units: 'ml' } }),
    ]);
    return () => {};
  }
, action('deleteItem'), EditItemForm);

const shoppingList = ShoppingListFactory.build();

export default {
  title: 'ItemList',
  component: ItemList,
};

export const WithItems = () => <Segment.Group>
  <ItemList shoppingList={shoppingList}/>
</Segment.Group>


const ItemListWithoutItems = ItemListConstructor(
  (list, onUpdate, onError) => {
    onUpdate([]);
    return () => {};
  }
, action('deleteItem'), EditItemForm);

export const WithoutItems = () => <ItemListWithoutItems shoppingList={shoppingList}/>

const ItemListLoading = ItemListConstructor(
  (list, onUpdate, onError) => {
    return () => {};
  }
, action('deleteItem'), EditItemForm);

export const Loading = () => <ItemListLoading shoppingList={shoppingList}/>
