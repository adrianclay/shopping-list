import React, {useEffect, useState} from 'react';
import './App.css';
import firebase from "firebase";

interface AppProps {
  firebase: firebase.app.App
}

export interface ShoppingListItem {
  name: string
}

function App({ firebase }: AppProps) {
  const [shoppingListItems, setShoppingListItems] = useState([] as ShoppingListItem[]);

  useEffect(() => {
    const firestore = firebase.firestore();
    const shoppingListCollection = firestore.collection('shopping-list-items')
    shoppingListCollection.get().then(stuff => {
      setShoppingListItems(stuff.docs.map(s => s.data() as ShoppingListItem));
    })
  }, [firebase]);

  return (
    <div className="App">
      <header className="App-header">
        Shopping List
        <ul>
          { shoppingListItems.map(shoppingListItem =>
            <li key={shoppingListItem.name}>
              {shoppingListItem.name}
            </li>
          ) }
        </ul>
      </header>
    </div>
  );
}

export default App;
