import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";

export type FirestoreAction<T> = (firestore: Firestore) => Promise<T>;

export const alice = { uid: 'alice', displayName: 'Alice' };
export const jeff = { uid: 'jeff', displayName: 'Jeff' };

export async function loginToFirestoreAs<T>(callback: FirestoreAction<T>, projectId: string, authenticatedAs?: { uid: string }) {
  const firebase = await initializeTestEnvironment({ projectId });
  const context = authenticatedAs ? firebase.authenticatedContext(authenticatedAs.uid) : firebase.unauthenticatedContext();
  try {
    // @ts-expect-error
    return await callback(context.firestore());
  } finally {
    await firebase.cleanup();
  }
}

export async function clearFirestore(projectId: string) {
  const firebase = await initializeTestEnvironment({ projectId });
  await firebase.clearFirestore();
  await firebase.cleanup();
}
