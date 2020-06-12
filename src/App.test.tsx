import React from 'react';
import {render, screen, fireEvent, waitForElementToBeRemoved} from '@testing-library/react';
import {AuthenticatedApp} from './App';
import {initializeTestApp, clearFirestoreData} from "@firebase/testing";
import FirestoreService from './services/FirestoreService';
import { act } from 'react-dom/test-utils';
import Login from './Login';

const projectId = 'app-test-tsx';

const firebase = initializeTestApp({
  projectId,
  auth: { uid: 'alice', email: 'alice@example.com' }
});

afterAll(async () => {
  try {
    await clearFirestoreData({ projectId });
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

async function createShoppingList(shoppingListName: string, loggedInUserId: string) {
  // TODO: Swap out with UI interaction when it exists.
  const service = new FirestoreService(firebase);
  await act(async () => {
    const shoppingList = await service.addShoppingList({ name: shoppingListName, owner_uids: [loggedInUserId] });
    shoppingListId = shoppingList.id;
  });
}

async function selectShoppingList(listName: string) {
  (await screen.findByText(listName)).click();
}

test('As a user I can add items to the shopping list', async () => {
  const loggedInUser = { uid: 'alice', displayName: 'bobby' };
  render(<Login.LoggedInUserContext.Provider value={loggedInUser}>
    <AuthenticatedApp firebase={firebase}/>
  </Login.LoggedInUserContext.Provider>);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await createShoppingList('Supermarket list', loggedInUser.uid)
  await selectShoppingList('Supermarket list');

  await addShoppingListItem('Ketchup');
  await addShoppingListItem('Cake');

  expect(await screen.findByText('Ketchup')).toBeInTheDocument();
  expect(await screen.findByText('Cake')).toBeInTheDocument();
});
