import firebase from "firebase";
import ShoppingListItem from "../domain/ShoppingListItem";

export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  subscribeToItemChanges(onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void {
    return this.shoppingListItemCollection().onSnapshot(collection => {
      const items = collection.docs.map(item => item.data() as ShoppingListItem);
      onUpdate(items);
    }, onError);
  }

  async addShoppingListItem(item: ShoppingListItem) {
    await this.shoppingListItemCollection().add(item);
  }

  private shoppingListItemCollection() {
    return this.firebase.firestore().collection('shopping-list-items');
  }
}
