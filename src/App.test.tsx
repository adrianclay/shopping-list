import React from 'react';
import {render, fireEvent, waitForElementToBeRemoved, RenderResult} from '@testing-library/react';
import AppConstructor from './App';
import {initializeTestApp, clearFirestoreData} from "@firebase/testing";
import { act } from 'react-dom/test-utils';
import { LoggedInUserContext } from './Login';

const projectId = 'app-test-tsx';

const firebase = initializeTestApp({
  projectId,
  auth: { uid: 'alice', email: 'alice@example.com' }
});

let screen: RenderResult;

afterAll(async () => {
  try {
    await clearFirestoreData({ projectId });
  } finally {
    firebase.firestore().terminate()
  }
});

async function addShoppingListItem(itemName: string) {
  act(() => {
    fireEvent.change(
      screen.getByLabelText(/item/i),
      { target: { value: itemName } }
    );
  });

  act(() => {
    fireEvent.click(screen.getByText(/add/i));
  });
}

async function createShoppingList(shoppingListName: string) {
  await act(async () => {
    (await screen.findByText(/create list/i)).click();

    fireEvent.change(
      screen.getByLabelText(/name/i),
      { target: { value: shoppingListName } }
    );

    (await screen.findByText('Create')).click();
  });
}

async function selectShoppingList(listName: string) {
  (await screen.findByText(listName)).click();
}

const loggedInUser = { uid: 'alice', displayName: 'bobby' };
const LoginStub = ({children}: React.PropsWithChildren<{}>) => <LoggedInUserContext.Provider value={loggedInUser}>{children}</LoggedInUserContext.Provider>

test('As a user I can add items to the shopping list', async () => {
  const App = AppConstructor(LoginStub, firebase)
  screen = render(<App />);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await createShoppingList('Supermarket list');
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await addShoppingListItem('Ketchup');
  await addShoppingListItem('Cake');

  expect(await screen.findByText('Ketchup')).toBeInTheDocument();
  expect(await screen.findByText('Cake')).toBeInTheDocument();
});
