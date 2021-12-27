import {render, fireEvent, waitForElementToBeRemoved, screen} from '@testing-library/react';
import AppConstructor from './App';
import {initializeTestEnvironment} from "@firebase/rules-unit-testing";
import { act } from 'react-dom/test-utils';
import User from './domain/User';
import { Firestore } from '@firebase/firestore';

const projectId = 'app-test-tsx';

const testEnvironment = initializeTestEnvironment({
  projectId,
});

afterAll(async () => {
  const firebase = await testEnvironment;
  try {
    firebase.clearFirestore();
  } finally {
    firebase.cleanup();
  }
});

async function addShoppingListItem(itemName: string) {
  fireEvent.change(
    await screen.findByRole('textbox'),
    { target: { value: itemName } }
  );

  fireEvent.click(await screen.findByRole((role, element) => role === 'option' && element && element.textContent === 'Add ' + itemName))
  fireEvent.click(await screen.findByText(/add/i));
}

async function createShoppingList(shoppingListName: string) {
  await act(async () => {
    fireEvent.change(
      screen.getByLabelText(/name/i),
      { target: { value: shoppingListName } }
    );

    (await screen.findByText('Create')).click();
  });
}

test('As a user I can add items to the shopping list', async () => {
  const authenticatorStub = {
    onAuthStateChanged: (onUpdate: (currentUser: User | null) => void) => {
      const loggedInUser = { uid: 'alice', displayName: 'bobby' };
      onUpdate(loggedInUser)
    },
    signInWithRedirect: () => { throw new Error('signInWithRedirect not implemented')},
  };
  // @ts-expect-error
  const firestore : Firestore = (await testEnvironment).authenticatedContext('alice').firestore();
  const App = AppConstructor(authenticatorStub, firestore);
  render(<App />);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await createShoppingList('Supermarket list');
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  await addShoppingListItem('Ketchup');
  await addShoppingListItem('Cake');

  expect(await screen.findByText('Ketchup')).toBeInTheDocument();
  expect(await screen.findByText('Cake')).toBeInTheDocument();

  expect(await screen.findByText('Ketchup was added')).toBeInTheDocument();
});
