import React from 'react';
import './App.css';
import firebase from "firebase";
import ItemList from "./ItemList";

interface AppProps {
  firebase: firebase.app.App
}

export interface ShoppingListItem {
  name: string
}

function App({ firebase }: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        Shopping List
        <ItemList firebase={firebase} />
      </header>
    </div>
  );
}

export default App;
