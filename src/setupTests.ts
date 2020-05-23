// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import * as firebase from "firebase/app";

export async function emptyCollection(firebase: firebase.app.App, collectionName: string) {
  const firestore = firebase.firestore();
  const collection = firestore.collection(collectionName);
  const documents = (await collection.get()).docs;
  const deleteBatch = firestore.batch();
  documents.forEach(doc => deleteBatch.delete(doc.ref));
  await deleteBatch.commit();
}
