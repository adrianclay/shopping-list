import React from 'react';

import ItemListConstructor from "./ShoppingList/ItemList";
import EditItemFormConstructor from './ShoppingList/ItemList/EditItemForm';
import AddItemFormConstructor from './ShoppingList/AddItemForm';
import ShoppingListViewerConstructor from './ShoppingListViewer';
import ListSelectorConstructor from './ListSelector';
import CreateShoppingListFormConstructor from './CreateShoppingListForm';

import { Container } from 'semantic-ui-react'
import AlphaBanner from './AlphaBanner';
import LoginConstructor, { Authenticator } from './Login';
import { _createShoppingList, _listShoppingLists } from './services/Firestore/ShoppingLists';
import { prefixGeneratedSearchForItems, prefixGeneratedSaveItem } from './services/PrefixGeneratingItemSearchingService';
import { _createEvent, _listEvents } from './services/Firestore/ShoppingListEvent';
import { _listShoppingListItems, _searchForItems, _saveShoppingListItem } from './services/Firestore/ShoppingListItems';
import _AddToShoppingList from './use_cases/AddToShoppingList';
import _BuyItemOnShoppingList from './use_cases/BuyItemOnShoppingList';
import _EventLogViewer from './ShoppingList/EventLogViewer';
import _ShoppingList from './ShoppingList';


function AppConstructor(authenticator: Authenticator, firebase: firebase.app.App) {
  const firestore = firebase.firestore();

  const createEvent = _createEvent(firestore);

  const saveShoppingListItem = prefixGeneratedSaveItem(_saveShoppingListItem(firebase.firestore()));
  const searchForItems = prefixGeneratedSearchForItems(_searchForItems(firestore));

  const Login = LoginConstructor(authenticator);
  const EditItemForm = EditItemFormConstructor(saveShoppingListItem);

  const ShoppingList = _ShoppingList(
    AddItemFormConstructor(_AddToShoppingList(searchForItems, saveShoppingListItem, createEvent), searchForItems),
    ItemListConstructor(_listShoppingListItems(firestore), _BuyItemOnShoppingList(saveShoppingListItem, createEvent), EditItemForm),
    _EventLogViewer(_listEvents(firestore)),
  );

  const ShoppingListViewer = ShoppingListViewerConstructor(
    ListSelectorConstructor(_listShoppingLists(firestore)),
    ShoppingList,
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
