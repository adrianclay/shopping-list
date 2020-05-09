import React, {useEffect, useState} from "react";
import {ShoppingListItem} from "./App";

interface ItemListProps {
  firebase: firebase.app.App
}

function ItemList({ firebase }: ItemListProps) {
  const [shoppingListItems, setShoppingListItems] = useState([] as ShoppingListItem[]);

  useEffect(() => {
    const firestore = firebase.firestore();
    const shoppingListCollection = firestore.collection('shopping-list-items')
    shoppingListCollection.get().then(stuff => {
      setShoppingListItems(stuff.docs.map(s => s.data() as ShoppingListItem));
    })
  }, [firebase]);

  return (
    <ul>
      { shoppingListItems.map(shoppingListItem =>
        <li key={shoppingListItem.name}>
          {shoppingListItem.name}
        </li>
      ) }
    </ul>
  )
}

export default ItemList;
