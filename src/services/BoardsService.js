import { firebase_app, firestore } from "../components/Firebase/firebase";
import firebase from "firebase";
import uploadToFirebase from "../helpers/uploadToFirebase";

class BoardsService {
  createBoard(model) {
    const timeStamp = new Date().getTime();
    const creatorId = firebase_app.auth().currentUser.uid;
    const boardId = `${creatorId}_${timeStamp}`;
    const collectionUrl = "boards";
    const storage = firebase.storage().ref().child(`boards/${boardId}`);

    return uploadToFirebase(
      model,
      storage,
      creatorId,
      boardId,
      collectionUrl
    ).then(function () {
      return boardId;
    });
  }
}
export default new BoardsService();
