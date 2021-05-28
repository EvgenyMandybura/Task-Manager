import {
  firebase_app,
  firestore,
  firebase_storage,
} from "../components/Firebase/firebase";
import firebase from "firebase";
import { usersUrl } from "../constants/urlForFiresore";
import uploadToFirebase from "../helpers/uploadToFirebase";

class AuthService {
  login({ email, password }) {
    return firebase_app.auth().signInWithEmailAndPassword(email, password);
  }

  loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase_app
      .auth()
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
    return firebase_app.auth().signOut();
  }

  async register({ name, email, password }) {
    return await firebase_app
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  completeProfile(model) {
    const { firstName, lastName } = model.values;
    const user = firebase_app.auth().currentUser;
    user.updateProfile({ displayName: `${firstName} ${lastName}` });
    const storage = firebase.storage().ref().child(`${usersUrl}/${user.uid}`);
    const file = model.fileModel.files[0];
    const dataForStorage = {
      firstName,
      lastName,
      email: model.values.email,
      phone: model.values.phone,
      description: model.values.description,
    };
    return uploadToFirebase(
      dataForStorage,
      storage,
      user.uid,
      file,
      usersUrl
    ).then(function () {
      return true;
    });
  }

  getProfile(userId) {
    const docUsersRef = firestore.collection(usersUrl);
    return docUsersRef
      .doc(userId)
      .get()
      .then((docCreator) => {
        return docCreator.data();
      });
  }
}
export default new AuthService();
