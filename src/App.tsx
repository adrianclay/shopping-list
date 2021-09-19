import React from 'react';
import { Firestore } from 'firebase/firestore';

import { BrowserRouter as Router } from 'react-router-dom';

import ItemListConstructor from "./ShoppingList/ItemList";
import EditItemFormConstructor from './ShoppingList/ItemList/EditItemForm';
import AddItemFormConstructor from './ShoppingList/AddItemForm';
import _ShoppingListSelector from './ShoppingListSelector';
import ListSelectorConstructor from './ListSelector';
import CreateShoppingListFormConstructor from './CreateShoppingListForm';

import { Container } from 'semantic-ui-react'
import AlphaBanner from './AlphaBanner';
import LoginConstructor, { Authenticator } from './Login';
import { _createShoppingList, _getShoppingList, _listShoppingLists } from './services/Firestore/ShoppingLists';
import { prefixGeneratedSearchForItems, prefixGeneratedSaveItem } from './services/PrefixGeneratingItemSearchingService';
import { _createEvent, _listEvents } from './services/Firestore/ShoppingListEvent';
import { _listShoppingListItems, _searchForItems, _saveShoppingListItem } from './services/Firestore/ShoppingListItems';
import _AddToShoppingList from './use_cases/AddToShoppingList';
import _BuyItemOnShoppingList from './use_cases/BuyItemOnShoppingList';
import _EventLogViewer from './ShoppingList/EventLogViewer';
import _ShoppingList from './ShoppingList';
import _ShoppingListPage, { ShoppingListPath } from './pages/ShoppingListPage';
import _ShoppingListsPage from './pages/ShoppingListsPage';


function AppConstructor(authenticator: Authenticator, firestore: Firestore) {
  const createEvent = _createEvent(firestore);

  const saveShoppingListItem = prefixGeneratedSaveItem(_saveShoppingListItem(firestore));
  const searchForItems = prefixGeneratedSearchForItems(_searchForItems(firestore));

  const Login = LoginConstructor(authenticator);
  const EditItemForm = EditItemFormConstructor(saveShoppingListItem);

  const ShoppingList = _ShoppingList(
    AddItemFormConstructor(_AddToShoppingList(searchForItems, saveShoppingListItem, createEvent), searchForItems),
    ItemListConstructor(_listShoppingListItems(firestore), _BuyItemOnShoppingList(saveShoppingListItem, createEvent), EditItemForm),
    _EventLogViewer(_listEvents(firestore)),
  );

  const ShoppingListSelector = _ShoppingListSelector(
    ListSelectorConstructor(_listShoppingLists(firestore)),
    CreateShoppingListFormConstructor(_createShoppingList(firestore)),
    ShoppingListPath
  );

  const ShoppingListPage = _ShoppingListPage(
    ShoppingList,
    _getShoppingList(firestore)
  );

  const ShoppingListsPage = _ShoppingListsPage(ShoppingListSelector);

  return function App() {
    return (
      <Router>
        <Container>
          <h1>Shopping List</h1>
          <AlphaBanner />
          <Login>
            <ShoppingListsPage />
            <ShoppingListPage />
          </Login>
        </Container>
      </Router>
    );
  }
}

export default AppConstructor;
