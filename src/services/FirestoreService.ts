import firebase from "firebase";
import ShoppingListItem from "../domain/ShoppingListItem";

export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  subscribeToItemChanges(onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void {
    const firestore = this.firebase.firestore();
    const shoppingListCollection = firestore.collection('shopping-list-items')
    return shoppingListCollection.onSnapshot(collection => {
      const items = collection.docs.map(item => item.data() as ShoppingListItem);
      onUpdate(items);
    }, onError);
  }

  async addShoppingListItem(item: ShoppingListItem) {
    await this.firebase.firestore().collection('shopping-list-items').add(item);
  }
}
