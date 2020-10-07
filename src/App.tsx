import React from 'react';

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
import { searchForItems, searchingSaveItem } from './services/ItemSearchingService';
import { _createEvent } from './services/Firestore/ShoppingListEvent';
import { _deleteShoppingListItem, _listShoppingListItems, _readdShoppingListItem, _searchForItems, _saveShoppingListItem } from './services/Firestore/ShoppingListItems';
import _AddToShoppingList from './use_cases/AddToShoppingList';

function AppConstructor(authenticator: Authenticator, firebase: firebase.app.App) {
  const firestore = firebase.firestore();
  const Login = LoginConstructor(authenticator);
  const EditItemForm = EditItemFormConstructor(searchingSaveItem(_saveShoppingListItem(firebase.firestore())));
  const ShoppingListViewer = ShoppingListViewerConstructor(
    ListSelectorConstructor(_listShoppingLists(firestore)),
    AddItemFormConstructor(_readdShoppingListItem(firestore), _AddToShoppingList(searchingSaveItem(_saveShoppingListItem(firestore)), _createEvent(firestore)), searchForItems(_searchForItems(firestore))),
    ItemListConstructor(_listShoppingListItems(firestore), _deleteShoppingListItem(firestore), EditItemForm),
    CreateShoppingListFormConstructor(_createShoppingList(firestore))
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
