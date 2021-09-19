import { FirebaseApp } from 'firebase/app';
import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getAuth } from 'firebase/auth'
import User from "../domain/User";

export default class AuthenticationService {
  private firebase: FirebaseApp;

  constructor(firebase: FirebaseApp) {
    this.firebase = firebase;
  }

  onAuthStateChanged(onUpdate: (currentUser: User | null) => void) {
    onAuthStateChanged(getAuth(this.firebase), onUpdate);
  }

  signInWithRedirect() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(getAuth(this.firebase), provider);
  }

}
