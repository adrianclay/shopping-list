import * as firebase from "firebase/app";
import ShoppingListItem from "../domain/ShoppingListItem";
import ShoppingList from "../domain/ShoppingList";
import User from "../domain/User";

interface ShoppingListRecord {
  name: string;
  owner_uid: string;
}
export default class FirestoreService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void {
    return this.shoppingListItemCollection(shoppingList).onSnapshot(collection => {
      const items = collection.docs.map(item => {
        return {
          ...item.data() as { name: string },
          list: shoppingList
        };
      });
      onUpdate(items);
    }, onError);
  }

  subscribeToListChanges(loggedInUser: User, onUpdate: (items: ShoppingList[]) => void, onError: (error: Error) => void): () => void {
    const shoppingListCollection = this.firebase.firestore().collection('shopping-list');
    const shoppingListsFilteredByLoggedInUser = shoppingListCollection.where('owner_uid', '==', loggedInUser.uid);
    return shoppingListsFilteredByLoggedInUser.onSnapshot(collection => {
      const items = collection.docs.map(item => {
        return {
          id: item.id,
          ...item.data() as ShoppingListRecord
        }
      });
      onUpdate(items);
    }, onError);
  }

  async addShoppingListItem({ name, list }: ShoppingListItem) {
    await this.shoppingListItemCollection(list).add({
      name
    });
  }

  async addShoppingList(list: ShoppingListRecord): Promise<ShoppingList> {
    const thing = await this.firebase.firestore().collection('shopping-list').add(list);
    return {
      id: thing.id,
      ...list,
    }
  }

  private shoppingListItemCollection(shoppingList: ShoppingList) {
    return this.firebase.firestore().collection(`shopping-list/${shoppingList.id}/items`);
  }
}
