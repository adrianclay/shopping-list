import { assertFails, initializeTestApp } from "@firebase/rules-unit-testing";
import FirestoreService from "../FirestoreService";

export const projectId = 'my-test-project';

type FirestoreServiceAction<T> = (firestoreService: FirestoreService) => Promise<T>;

export const assertAliceCant = <T>(action: FirestoreServiceAction<T>) => assertFails(withAliceAuthenticated(action));
export const assertUnauthenticatedCant = <T>(action: FirestoreServiceAction<T>) => assertFails(withUnauthenticated(action));

export const alice = { uid: 'alice', displayName: 'Alice' };
export function withAliceAuthenticated<T>(action: FirestoreServiceAction<T>) {
  return withAuth(action, alice);
}

export const jeff = { uid: 'jeff', displayName: 'Jeff' };
export function withJeffAuthenticated<T>(action: FirestoreServiceAction<T>) {
  return withAuth(action, jeff);
}

function withUnauthenticated<T>(action: FirestoreServiceAction<T>) {
  return withAuth(action, undefined);
}

async function withAuth<T>(action: FirestoreServiceAction<T>, auth?: { uid: string }) {
  const firebase = initializeTestApp({ projectId, auth });
  const firestoreService = new FirestoreService(firebase);
  try {
    return await action(firestoreService);
  } finally {
    firebase.delete();
  }
}
