import React from 'react';
import * as firebase from "firebase/app";

import FirestoreService from "./services/FirestoreService";
import AuthenticationService from './services/AuthenticationService';

import ItemListConstructor from "./ItemList";
import AddItemFormConstructor from './AddItemForm';
import ShoppingListViewerConstructor from './ShoppingListViewer';
import ListSelectorConstructor from './ListSelector';
import CreateShoppingListFormConstructor from './CreateShoppingListForm';

import LoginConstructor from './Login';

import { Container } from 'semantic-ui-react'
import AlphaBanner from './AlphaBanner';

interface AppProps {
  firebase: firebase.app.App
}

function App({ firebase }: AppProps) {
  const Login = LoginConstructor(new AuthenticationService(firebase));

  return (
    <Container>
      <h1>Shopping List</h1>
      <AlphaBanner />
      <Login>
        <AuthenticatedApp firebase={firebase} />
      </Login>
    </Container>
  );
}

export function AuthenticatedApp({ firebase }: AppProps) {
  const firestoreService = new FirestoreService(firebase);
  const ShoppingListViewer = ShoppingListViewerConstructor(
    ListSelectorConstructor(firestoreService),
    AddItemFormConstructor(firestoreService),
    ItemListConstructor(firestoreService, firestoreService, firestoreService),
    CreateShoppingListFormConstructor(firestoreService)
  );
  return <ShoppingListViewer />;
}

export default App;
