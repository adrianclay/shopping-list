import React from 'react';
import './App.css';
import * as firebase from "firebase/app";

import FirestoreService from "./services/FirestoreService";
import AuthenticationService from './services/AuthenticationService';

import ItemList from "./ItemList";
import AddItemForm from "./AddItemForm";
import Login from "./Login";

interface AppProps {
  firebase: firebase.app.App
}

function App({ firebase }: AppProps) {
  const authenticationService = new AuthenticationService(firebase);

  return (
    <div className="App">
      <header className="App-header">
        Shopping List
        <Login authenticator={authenticationService}>
          <AuthenticatedApp firebase={firebase} />
        </Login>
      </header>
    </div>
  );
}

export function AuthenticatedApp({ firebase }: AppProps) {
  const firestoreService = new FirestoreService(firebase);
  return <div>
    <AddItemForm shoppingListItemAdder={firestoreService} />
    <ItemList shoppingListItemFetcher={firestoreService} />
  </div>;
}

export default App;
