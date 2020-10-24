import { initializeTestApp } from "@firebase/rules-unit-testing";

export type FirestoreAction<T> = (firestore: firebase.firestore.Firestore) => Promise<T>;

export const alice = { uid: 'alice', displayName: 'Alice' };
export const jeff = { uid: 'jeff', displayName: 'Jeff' };

export async function loginToFirestoreAs<T>(callback: FirestoreAction<T>, projectId: string, authenticatedAs?: { uid: string }) {
  const firebase = initializeTestApp({ projectId, auth: authenticatedAs });
  try {
    return await callback(firebase.firestore());
  } finally {
    firebase.delete();
  }
}
