import React from 'react';
import {render, screen, fireEvent, waitForElementToBeRemoved} from '@testing-library/react';
import {AuthenticatedApp} from './App';
import {initializeTestApp} from "@firebase/testing";
import { emptyCollection } from './setupTests';
import FirestoreService from './services/FirestoreService';
import { act } from 'react-dom/test-utils';

const firebase = initializeTestApp({
  projectId: 'my-test-project',
  auth: { uid: 'alice', email: 'alice@example.com' }
});

afterAll(async () => {
  try {
    await emptyCollection(firebase, `shopping-list/${shoppingListId}/shopping-list-items`);
    await emptyCollection(firebase, 'shopping-list');
  } finally {
    firebase.firestore().terminate()
  }
});

async function addShoppingListItem(itemName: string) {
  fireEvent.change(
    screen.getByLabelText(/item/i),
    { target: { value: itemName } }
  )

  fireEvent.click(screen.getByText(/add/i))
}

let shoppingListId: string

async function createShoppingList(shoppingListName: string) {
  // TODO: Swap out with UI interaction when it exists.
  const service = new FirestoreService(firebase);
  await act(async () => {
    const shoppingList = await service.addShoppingList({ name: shoppingListName });
    shoppingListId = shoppingList.id;
  });
}

async function selectShoppingList(listName: string) {
  (await screen.findByText(listName)).click();
}

test('As a user I can add items to the shopping list', async () => {
  render(<AuthenticatedApp firebase={firebase}/>);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await createShoppingList('Supermarket list')
  await selectShoppingList('Supermarket list');

  await addShoppingListItem('Ketchup');
  await addShoppingListItem('Cake');

  expect(await screen.findByText('Ketchup')).toBeInTheDocument();
  expect(await screen.findByText('Cake')).toBeInTheDocument();
});
