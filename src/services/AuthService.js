import { firebase_app } from "../components/Firebase/firebase";
import firebase from "firebase";
import { usersUrl } from "../constants/urlForFiresore";
import uploadToFirebase from "../helpers/uploadToFirebase";
import StorageService from "./StorageService";

const USER_PLACEHOLDER = {
  firstName: "FirstName",
  lastName: "LastName",
};

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

  storeUser(userData, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    StorageService.user.storage = storage;
    StorageService.user.value = userData;
  }

  clearUser() {
    StorageService.user.clear();
  }

  getUser() {
    const user = StorageService.user.value;
    return user ? user : USER_PLACEHOLDER;
  }
}
export default new AuthService();
