import firebase from "firebase/app";
import User from "../domain/User";

export default class AuthenticationService {
  private firebase: firebase.app.App;

  constructor(firebase: firebase.app.App) {
    this.firebase = firebase;
  }

  onAuthStateChanged(onUpdate: (currentUser: User | null) => void) {
    this.firebase.auth().onAuthStateChanged(onUpdate);
  }

  signInWithRedirect() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.firebase.auth().signInWithRedirect(provider);
  }

}
