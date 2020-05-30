import * as firebase from "firebase/app";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingList from "../domain/ShoppingList";

export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: () => void): () => void {
    return this.shoppingListItemCollection().onSnapshot(collection => {
      const items = collection.docs.map(item => {
        return {
          ...item.data() as { name: string },
          list: shoppingList
        };
      });
      onUpdate(items);
    }, onError);
  }

  subscribeToListChanges(onUpdate: (items: ShoppingList[]) => void, onError: () => void): () => void {
    return this.firebase.firestore().collection('shopping-list').onSnapshot(collection => {
      const items = collection.docs.map(item => {
        return {
          id: item.id,
          ...item.data() as { name: string }
        }
      });
      onUpdate(items);
    }, onError);
  }

  async addShoppingListItem({ name }: ShoppingListItem) {
    await this.shoppingListItemCollection().add({
      name
    });
  }

  async addShoppingList(list: { name: string}): Promise<ShoppingList> {
    const thing = await this.firebase.firestore().collection('shopping-list').add(list);
    return {
      id: thing.id,
      ...list,
    }
  }

  private shoppingListItemCollection() {
    return this.firebase.firestore().collection('shopping-list-items');
  }
}
