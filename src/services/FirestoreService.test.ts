import {initializeTestApp, firestore} from "@firebase/testing";
import FirestoreService from './FirestoreService'
import { emptyCollection } from "../setupTests";

const firebase = initializeTestApp({
  projectId: 'my-test-project',
  auth: { uid: 'alice', email: 'alice@example.com' }
});
const firestoreService = new FirestoreService(firebase);

it('Creates a shopping list and retrieves it back', async (done) => {
  const addedShoppingList = await firestoreService.addShoppingList({
    name: 'Adrians fantastic shopping list'
  });

  const unsubscribe = firestoreService.subscribeToListChanges((lists) => {
    unsubscribe();
    expect(lists).toEqual([addedShoppingList]);
    done();
  }, () => {
    throw new Error();
  })
})

afterAll(async () => {
  await emptyCollection(firebase, 'shopping-list');
  firebase.firestore().terminate();
})
