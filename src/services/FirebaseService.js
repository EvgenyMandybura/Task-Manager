import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebase from "firebase/app";
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.auth
      .signInWithPopup(provider)
      .then((result) => {
        let credential = result.credential;
        let user = result.user;
        let accessToken = credential.accessToken;
        return result;
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
      });
  }

  logout() {
    return this.auth.signOut();
  }
  async register({ name, email, password }) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}
export default new Firebase();
