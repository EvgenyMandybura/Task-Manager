import { firebase_app, firestore } from "../components/Firebase/firebase";
import firebase from "firebase";
import uploadToFirebase from "../helpers/uploadToFirebase";
import { boardsUrl, usersUrl } from "../constants/urlForFiresore";

class BoardsService {
  createBoard(model) {
    const timeStamp = new Date().getTime();
    const creatorId = firebase_app.auth().currentUser.uid;
    const boardId = `${creatorId}_${timeStamp}`;
    const storage = firebase.storage().ref().child(`${boardsUrl}/${boardId}`);
    const file = model.fileModel.files[0];
    const dataForStorage = {
      boardId,
      creatorId,
      title: model.values.title,
      description: model.values.description,
      members: model.values.members,
    };
    return uploadToFirebase(
      dataForStorage,
      storage,
      boardId,
      file,
      boardsUrl
    ).then(function () {
      return boardId;
    });
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

  async getAllList() {
    const tempDoc = [];
    const currentUserID = firebase_app.auth().currentUser.uid;
    const docUsersRef = firestore.collection(usersUrl);
    const docBoardRef = firestore.collection(boardsUrl);
    const query = await docBoardRef
      .where("creatorId", "==", currentUserID)
      .get();
    for (const doc of query.docs) {
      const queryUser = (await docUsersRef.doc(currentUserID).get()).data();
      await tempDoc.push({ queryUser, ...doc.data() });
    }
    return tempDoc;
  }
}
export default new BoardsService();
