import React from 'react';

import FirestoreService from "./services/FirestoreService";

import ItemListConstructor from "./ItemList";
import AddItemFormConstructor from './AddItemForm';
import ShoppingListViewerConstructor from './ShoppingListViewer';
import ListSelectorConstructor from './ListSelector';
import CreateShoppingListFormConstructor from './CreateShoppingListForm';

import { Container } from 'semantic-ui-react'
import AlphaBanner from './AlphaBanner';
import LoginConstructor, { Authenticator } from './Login';

function AppConstructor(authenticator: Authenticator, firebase: firebase.app.App) {
  const firestoreService = new FirestoreService(firebase);
  const Login = LoginConstructor(authenticator);
  const ShoppingListViewer = ShoppingListViewerConstructor(
    ListSelectorConstructor(firestoreService),
    AddItemFormConstructor(firestoreService),
    ItemListConstructor(firestoreService, firestoreService, firestoreService),
    CreateShoppingListFormConstructor(firestoreService)
  );

  return function App() {
    return (
      <Container>
        <h1>Shopping List</h1>
        <AlphaBanner />
        <Login>
          <ShoppingListViewer />
        </Login>
      </Container>
    );
  }
}

export default AppConstructor;
