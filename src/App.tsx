import React from 'react';
import './App.css';
import firebase from "firebase";
import ItemList from "./ItemList";
import FirestoreService from "./services/FirestoreService";

interface AppProps {
  firebase: firebase.app.App
}

export interface ShoppingListItem {
  name: string
}

function App({ firebase }: AppProps) {
  const firestoreService = new FirestoreService(firebase);

  return (
    <div className="App">
      <header className="App-header">
        Shopping List
        <ItemList shoppingListItemFetcher={firestoreService} />
      </header>
    </div>
  );
}

export default App;
