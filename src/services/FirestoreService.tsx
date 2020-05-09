import {ShoppingListItem} from "../App";
import firebase from "firebase";

export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  fetchShoppingListItems(): Promise<ShoppingListItem[]> {
    const firestore = this.firebase.firestore();
    const shoppingListCollection = firestore.collection('shopping-list-items')
    return shoppingListCollection.get().then(collection => {
      return collection.docs.map(item => item.data() as ShoppingListItem)
    });
  }
}
