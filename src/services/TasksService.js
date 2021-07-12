import { firestore } from "../components/Firebase/firebase";
import { tasksUrl, boardsUrl } from "../constants/urlForFiresore";
import AuthService from "./AuthService";
import StorageService from "./StorageService";
import uploadTaskToFirebase from "../helpers/uploadTaskToFirebase";
import { TODO } from "../constants/taskStatuses";
import firebase from "firebase";
import fileIcons from "../helpers/fileIcons";

class TasksService {
  async getAllList(data) {
    const { boardId, sortField } = data;
    const tempDoc = [];
    const docTaskRef = firestore.collection(tasksUrl);
    const query = await (!sortField
        ? docTaskRef.where("boardId", "==", boardId).get()
        : await docTaskRef
            .where("boardId", "==", boardId)
            .orderBy(sortField)
            .get());
    for (const doc of query.docs) {
      const assigneeData = await AuthService.getUser(doc.data().assignee);
      tempDoc.push({ assigneeData, ...doc.data() });
    }
    return tempDoc;
  }

  createTask(model) {
    const creatorEmail = StorageService.user.value.email;
    const timeStamp = new Date().getTime();
    const taskId = `task_${creatorEmail}_${timeStamp}`;
    const boardId = model.values.boardId;
    const files = model.fileModel.files;

    const dataForStorage = {
      creatorEmail,
      taskId,
      taskStatus: TODO,
      boardId: model.values.boardId,
      assignee: model.values.assignee,
      summary: model.values.summary,
      description: model.values.description,
      timeEstimation: model.values.timeEstimation,
    };

    const boardRef = firestore.collection(boardsUrl).doc(boardId);
    boardRef.update({
      tasks: firebase.firestore.FieldValue.arrayUnion(taskId),
    });

    return uploadTaskToFirebase(dataForStorage, taskId, files, tasksUrl).then(
       () => {
        return boardId;
      }
    );
  }

  async searchTasks(data) {
    const { keyword } = data.values;
    const tasksArray = await this.getAllList(data);
    const newTaskArray = [];
    for (let task of tasksArray) {
      if (task.summary.includes(keyword)) {
        newTaskArray.push(task);
      }
    }
    return newTaskArray;
  }

  async filterTasks(data) {
    const tempDoc = [];
    const { status, assignee } = data.values;
    const docTaskRef = firestore.collection(tasksUrl);

    let query = [];
    if (!status && assignee) {
      query = await docTaskRef
        .where("boardId", "==", data.boardId)
        .where("assignee", "==", assignee)
        .get();
    }
    if (status && !assignee) {
      query = await docTaskRef
        .where("boardId", "==", data.boardId)
        .where("taskStatus", "==", status)
        .get();
    }
    if (status && assignee) {
      query = await docTaskRef
        .where("boardId", "==", data.boardId)
        .where("taskStatus", "==", status)
        .where("assignee", "==", assignee)
        .get();
    }

    for (const doc of query.docs) {
      await tempDoc.push({ ...doc.data() });
    }

    for (const taskId of tempDoc) {
      taskId.assigneeData = await AuthService.getUser(taskId.assignee);
    }
    return tempDoc;
  }

  async getTask(taskId) {
    const docRef = await firestore.collection(tasksUrl).doc(taskId).get();
    const tempDoc = [];
    const assigneeData = await AuthService.getUser(docRef.data().assignee);
    tempDoc.push({ ...docRef.data(), assigneeData });
    return tempDoc;
  }

  async getFiles(model) {
    const getFileMetaData = async (urlDB) => {
      await firebase.storage().refFromURL(urlDB).getMetadata();
      const metaData = await firebase.storage().refFromURL(urlDB).getMetadata();
      return metaData;
    };
    const checkFileType = async (metaData, urlDB) => {
      const { contentType } = metaData;
      if (contentType.includes(`image/`)) {
        return urlDB;
      } else {
        return fileIcons(contentType);
      }
    };
    const getUrlForDisplay = async (urlDB) => {
      const metaData = await getFileMetaData(urlDB);
      const { name } = metaData;
      const urlForDisplay = await checkFileType(metaData, urlDB);
      return { urlForDisplay, name };
    };
    const tempDoc = [];
    for (const urlDB of model) {
      const dataForDisplay = await getUrlForDisplay(urlDB);
      tempDoc.push({ urlDB, ...dataForDisplay });
    }
    return tempDoc;
  }
}
export default new TasksService();
