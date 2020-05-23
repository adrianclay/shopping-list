import React from 'react';
import {render, screen, fireEvent, waitForElementToBeRemoved} from '@testing-library/react';
import ShoppingListItem from './domain/ShoppingListItem';
import {AuthenticatedApp} from './App';
import {initializeTestApp} from "@firebase/testing";
import { emptyCollection } from './setupTests';

const firebase = initializeTestApp({
  projectId: 'my-test-project',
  auth: { uid: 'alice', email: 'alice@example.com' }
});

afterAll(async () => {
  try {
    await emptyCollection(firebase, 'shopping-list-items');
  } finally {
    firebase.firestore().terminate()
  }
});

async function addShoppingListItem(shoppingListItem: ShoppingListItem) {
  fireEvent.change(
    screen.getByLabelText(/item/i),
    { target: { value: shoppingListItem.name } }
  )

  fireEvent.click(screen.getByText(/add/i))
}

test('As a user I can add items to the shopping list', async () => {
  render(<AuthenticatedApp firebase={firebase}/>);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await addShoppingListItem({ name: 'Ketchup' });
  await addShoppingListItem({ name: 'Cake' });

  expect(await screen.findByText('Ketchup')).toBeInTheDocument()
  expect(await screen.findByText('Cake')).toBeInTheDocument()
});
