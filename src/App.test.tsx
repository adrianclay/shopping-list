import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import App, {ShoppingListItem} from './App';
import {initializeTestApp} from "@firebase/testing";

const firebase = initializeTestApp({
  projectId: 'my-test-project',
  auth: { uid: 'alice', email: 'alice@example.com' }
});

async function emptyCollection(collectionName: string) {
  const firestore = firebase.firestore();
  const collection = firestore.collection(collectionName);
  const documents = (await collection.get()).docs;
  const deleteBatch = firestore.batch();
  documents.forEach(doc => deleteBatch.delete(doc.ref));
  await deleteBatch.commit();
}

afterAll(async () => {
  try {
    await emptyCollection('shopping-list-items');
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
  render(<App firebase={firebase}/>);

  await addShoppingListItem({ name: 'Ketchup' });
  await addShoppingListItem({ name: 'Cake' });

  expect(await screen.findByText('Ketchup')).toBeInTheDocument()
  expect(await screen.findByText('Cake')).toBeInTheDocument()
});
