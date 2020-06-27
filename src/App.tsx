import React from 'react';

import FirestoreService from "./services/FirestoreService";

import ItemListConstructor from "./ItemList";
import AddItemFormConstructor from './AddItemForm';
import ShoppingListViewerConstructor from './ShoppingListViewer';
import ListSelectorConstructor from './ListSelector';
import CreateShoppingListFormConstructor from './CreateShoppingListForm';

import { Container } from 'semantic-ui-react'
import AlphaBanner from './AlphaBanner';

function AppConstructor(Login: React.FunctionComponent, firebase: firebase.app.App) {
  return function App() {
    const firestoreService = new FirestoreService(firebase);
    const ShoppingListViewer = ShoppingListViewerConstructor(
      ListSelectorConstructor(firestoreService),
      AddItemFormConstructor(firestoreService),
      ItemListConstructor(firestoreService, firestoreService, firestoreService),
      CreateShoppingListFormConstructor(firestoreService)
    );

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
