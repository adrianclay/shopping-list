import { action } from '@storybook/addon-actions';
import ListSelectorConstructor from './';
import ShoppingListFactory from '../factories/ShoppingList';

const loggedInUser = {
  uid: 'rianne',
  displayName: 'Rianne'
};

const ListSelectorWithItems = ListSelectorConstructor((loggedInUser, onUpdate, onError) => {
  onUpdate([ShoppingListFactory.build({
    name: 'Christmas wish list',
  }), ShoppingListFactory.build({
    name: 'Weekly shop',
  })]);
  return () => {};
});
export const WithItems = () => <ListSelectorWithItems onSelect={action('onSelect')} loggedInUser={loggedInUser} />

const ListSelectorWithError = ListSelectorConstructor((loggedInUser, onUpdate, onError) => {
  onError(new Error('Lack of wiggle juice'));
  return () => {};
});
export const WithError = () => <ListSelectorWithError onSelect={action('onSelect')} loggedInUser={loggedInUser} />

const ListSelectorLoading = ListSelectorConstructor((loggedInUser, onUpdate, onError) => {
  return () => {};
});
export const Loading = () => <ListSelectorLoading onSelect={action('onSelect')} loggedInUser={loggedInUser} />


const ListSelectorStories = {
  title: 'ListSelector',
  component: ListSelectorWithItems,
};
export default ListSelectorStories;
