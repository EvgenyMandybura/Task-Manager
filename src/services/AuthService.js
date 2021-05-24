import {firebase_app, firestore, firebase_storage} from "../components/Firebase/firebase";
import firebase from "firebase";


class AuthService {
    login({ email, password }) {
        return firebase_app.auth().signInWithEmailAndPassword(email, password);
    }

    loginWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return firebase_app.auth()
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
        return await firebase_app.auth().createUserWithEmailAndPassword(email, password);
    }

    completeProfile(model) {
        const { firstName, lastName, description, email, phone } = model.values;
        const user = firebase_app.auth().currentUser;
        user.updateProfile({displayName:`${firstName} ${lastName}`});

        firestore.collection("users").add({
            firstName: firstName,
            lastName: lastName,
            description: description,
            email: email,
            phone: phone,
        })

        return firebase.storage().ref().child(`images/${user.uid}/avatar`)
            .put(model.fileModel.files[0], {contentType: 'image/jpeg',
            }).then( function (){
                    return true;
                }
            )
    }

}
export default new AuthService();