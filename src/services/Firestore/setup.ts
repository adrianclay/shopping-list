import { initializeTestApp } from "@firebase/rules-unit-testing";

export const projectId = 'my-test-project';

type FirestoreAction<T> = (firestore: firebase.firestore.Firestore) => Promise<T>;

export const alice = { uid: 'alice', displayName: 'Alice' };
export const withAliceAuthenticated = <T>(callback: FirestoreAction<T>) => loginToFirestoreAs(callback, alice);


export const jeff = { uid: 'jeff', displayName: 'Jeff' };
export const withJeffAuthenticated = <T>(action: FirestoreAction<T>) => loginToFirestoreAs(action, jeff);

export async function loginToFirestoreAs<T>(callback: FirestoreAction<T>, authenticatedAs?: { uid: string }) {
  const firebase = initializeTestApp({ projectId, auth: authenticatedAs });
  try {
    return await callback(firebase.firestore());
  } finally {
    firebase.delete();
  }
}
