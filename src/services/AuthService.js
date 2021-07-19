import { firebase_app, firestore } from "../components/Firebase/firebase";
import firebase from "firebase";
import { usersUrl } from "../constants/urlForFiresore";
import uploadToFirebase from "../helpers/uploadToFirebase";
import StorageService from "./StorageService";

const REMEMBER_ME_DEFAULT = true;

class AuthService {
  login({ email, password, remember = REMEMBER_ME_DEFAULT }) {
    this.clearUser();
    return firebase_app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        const user = firebase_app.auth().currentUser;
        this.storeUser(user, remember);
        return authUser;
      });
  }

  loginWithFacebook(remember = REMEMBER_ME_DEFAULT) {
    this.clearUser();
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase_app
      .auth()
      .signInWithPopup(provider)
      .then((authUser) => {
        const user = firebase_app.auth().currentUser;
        this.storeUser(user, remember);
        return authUser;
      });
  }

  logout() {
    return firebase_app
      .auth()
      .signOut()
      .then(() => {
        this.clearUser();
      });
  }

  async register({ name, email, password, remember = REMEMBER_ME_DEFAULT }) {
    this.clearUser();
    return await firebase_app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        const user = firebase_app.auth().currentUser;
        this.storeUser(user, remember);
        return authUser;
      });
  }

  completeProfile(model) {
    const { firstName, lastName, email } = model.values;
    const user = firebase_app.auth().currentUser;
    user.updateProfile({ displayName: `${firstName} ${lastName}` });
    user.updateEmail(email);
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
      email,
      file,
      usersUrl
    ).then(function () {
      return true;
    });
  }

  storeUser(userData, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    StorageService.user.storage = storage;
    StorageService.user.value = userData;
  }

  clearUser() {
    StorageService.user.clear();
  }

  async getUser(userEmail) {
    const userData = (
      await firestore.collection(usersUrl).doc(userEmail).get()
    ).data();
    return userData;
  }

  async getMemberList(members) {
    const tempDoc = [];
    const docUsersRef = firestore.collection(usersUrl);
    for (const member of members) {
      const query = (await docUsersRef.doc(member).get()).data();
      await tempDoc.push(query);
    }
    return tempDoc;
  }
}
export default new AuthService();
