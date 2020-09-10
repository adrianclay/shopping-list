import React from 'react';

import FirestoreService from "./services/FirestoreService";

import ItemListConstructor from "./ItemList";
import EditItemFormConstructor from './ItemList/EditItemForm';
import AddItemFormConstructor from './AddItemForm';
import ShoppingListViewerConstructor from './ShoppingListViewer';
import ListSelectorConstructor from './ListSelector';
import CreateShoppingListFormConstructor from './CreateShoppingListForm';

import { Container } from 'semantic-ui-react'
import AlphaBanner from './AlphaBanner';
import LoginConstructor, { Authenticator } from './Login';
import ItemSearchingService from './services/ItemSearchingService';

function AppConstructor(authenticator: Authenticator, firebase: firebase.app.App) {
  const firestoreService = new FirestoreService(firebase);
  const Login = LoginConstructor(authenticator);
  const searchAdaptor = new ItemSearchingService(firestoreService);
  const ShoppingListViewer = ShoppingListViewerConstructor(
    ListSelectorConstructor(firestoreService.subscribeToListChanges.bind(firestoreService)),
    AddItemFormConstructor(firestoreService.readdShoppingListItem.bind(firestoreService), searchAdaptor.addShoppingListItem.bind(searchAdaptor), searchAdaptor.searchForItems.bind(searchAdaptor)),
    ItemListConstructor(firestoreService.subscribeToItemChanges.bind(firestoreService), firestoreService.deleteItem.bind(firestoreService), EditItemFormConstructor(searchAdaptor)),
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
