import { firebase_app, firestore } from "../components/Firebase/firebase";
import firebase from "firebase";
import uploadToFirebase from "../helpers/uploadToFirebase";
import { boardsUrl } from "../constants/urlForFiresore";

class BoardsService {
  createBoard(model) {
    const timeStamp = new Date().getTime();
    const creatorId = firebase_app.auth().currentUser.uid;
    const boardId = `${creatorId}_${timeStamp}`;
    const storage = firebase.storage().ref().child(`${boardsUrl}/${boardId}`);
    return uploadToFirebase(model, storage, creatorId, boardId, boardsUrl).then(
      function () {
        return boardId;
      }
    );
  }

  getBoard(boardId) {
    const docRef = firestore.collection(boardsUrl).doc(boardId);
    return docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          return "No such document!";
        }
      })
      .catch((error) => {
        return "Error getting documents: ", error;
      });
  }

  getAllList() {
    const docRef = firestore.collection(boardsUrl);
    const currentUserID = firebase_app.auth().currentUser.uid;
    const query = docRef.where("creatorId", "==", currentUserID);
    return query
      .get()
      .then((querySnapshot) => {
        const tempDoc = [];
        querySnapshot.forEach((doc) => {
          tempDoc.push({ ...doc.data() });
        });
        return tempDoc;
      })
      .catch((error) => {
        return "Error getting documents: ", error;
      });
  }
}
export default new BoardsService();
