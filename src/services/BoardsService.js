import { firebase_app, firestore } from "../components/Firebase/firebase";
import firebase from "firebase";
import uploadToFirebase from "../helpers/uploadToFirebase";
import { boardsUrl, usersUrl } from "../constants/urlForFiresore";
import StorageService from "./StorageService";
import ToastrService from "./ToastrService";
import updateFirestoreDocument from "../helpers/updateFirestoreDocument";
import { COLUMN_NAMES_ARRAY } from "../constants/taskStatuses";

class BoardsService {
  createBoard(model) {
    const timeStamp = new Date().getTime();
    const creatorEmail = StorageService.user.value.email;
    const boardId = `${creatorEmail}_${timeStamp}`;
    const storage = firebase.storage().ref().child(`${boardsUrl}/${boardId}`);
    const file = model.fileModel.files[0];
    const dataForStorage = {
      boardId,
      creatorEmail,
      boardCreatorStatus: true,
      title: model.values.title,
      description: model.values.description,
      members: model.values.members,
      statuses: COLUMN_NAMES_ARRAY,
    };
    return uploadToFirebase(
      dataForStorage,
      storage,
      boardId,
      file,
      boardsUrl
    ).then(() => {
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
    const currentUserID = StorageService.user.value.email;
    const docUsersRef = firestore.collection(usersUrl);
    const docBoardRef = firestore.collection(boardsUrl);
    const query = await docBoardRef
      .where("creatorEmail", "==", currentUserID)
      .where("boardCreatorStatus", "==", true)
      .get();
    for (const doc of query.docs) {
      const queryUser = (await docUsersRef.doc(currentUserID).get()).data();
      await tempDoc.push({ queryUser, ...doc.data() });
    }
    const queryMembers = await docBoardRef
      .where("members", "array-contains", `${currentUserID}`)
      .get();
    for (const doc of queryMembers.docs) {
      const creatorEmail = await doc.data().creatorEmail;
      const queryUser = (await docUsersRef.doc(creatorEmail).get()).data();
      await tempDoc.push({ queryUser, ...doc.data() });
    }
    return tempDoc;
  }

  editBoard(model) {
    const { boardId } = model.values;
    const storage = firebase.storage().ref().child(`${boardsUrl}/${boardId}`);
    const file = model.fileModel.files[0];
    const dataForStorage = {
      boardId,
      title: model.values.title,
      description: model.values.description,
      members: model.values.members,
    };
    return updateFirestoreDocument(
      dataForStorage,
      storage,
      boardId,
      file,
      boardsUrl
    ).then(() => {
      return boardId;
    });
  }

  async checkUniqueMembers({ members }) {
    let error = false;
    const docUsersRef = firestore.collection(usersUrl);
    if (!members) {
      return true;
    }

    for (const member of members) {
      await docUsersRef
        .doc(member)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            ToastrService.error(`${member} don't found`);
            error = true;
          }
        });
    }
    if (!error) {
      return true;
    }
  }

  async leaveBoard(boardId) {
    const currentUserEmail = StorageService.user.value.email;
    const board = await this.getBoard(boardId);
    const boardCreatorEmail = board.creatorEmail;
    const boardMembers = board.members;
    const docRef = firestore.collection(boardsUrl).doc(boardId);

    if (boardCreatorEmail == currentUserEmail) {
      docRef.update({
        boardCreatorStatus: false,
      });
    }
    const indexOfMember = boardMembers.indexOf(currentUserEmail);
    if (indexOfMember >= 0) {
      boardMembers.splice(indexOfMember, 1);
      docRef.update({
        members: boardMembers,
      });
    }
  }
}
export default new BoardsService();
