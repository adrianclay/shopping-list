import React from 'react';
import {render, screen} from '@testing-library/react';
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
  await emptyCollection('shopping-list-items');
  firebase.firestore().terminate()
});

async function addShoppingListItem(shoppingListItem: ShoppingListItem) {
  await firebase.firestore().collection('shopping-list-items').add(shoppingListItem);
}

test('renders shopping list items', async () => {
  await addShoppingListItem({ name: 'Ketchup' });
  await addShoppingListItem({ name: 'Cake' });

  render(<App firebase={firebase}/>);

  expect(await screen.findByText('Ketchup')).toBeInTheDocument()
  expect(await screen.findByText('Cake')).toBeInTheDocument()
});
