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
import { _createShoppingList, _listShoppingLists } from './services/Firestore/ShoppingLists';
import { searchForItems, searchingAddShoppingListItem, searchingUpdateItem } from './services/ItemSearchingService';

function AppConstructor(authenticator: Authenticator, firebase: firebase.app.App) {
  const firestoreService = new FirestoreService(firebase);
  const Login = LoginConstructor(authenticator);
  const ShoppingListViewer = ShoppingListViewerConstructor(
    ListSelectorConstructor(_listShoppingLists(firebase.firestore())),
    AddItemFormConstructor(firestoreService.readdShoppingListItem.bind(firestoreService), searchingAddShoppingListItem(firestoreService.addShoppingListItem.bind(firestoreService)), searchForItems(firestoreService.searchForItems.bind(firestoreService))),
    ItemListConstructor(firestoreService.subscribeToItemChanges.bind(firestoreService), firestoreService.deleteItem.bind(firestoreService), EditItemFormConstructor(searchingUpdateItem(firestoreService.updateItem.bind(firestoreService)))),
    CreateShoppingListFormConstructor(_createShoppingList(firebase.firestore()))
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
