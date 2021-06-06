import { firestore } from "../components/Firebase/firebase";
import { tasksUrl, boardsUrl } from "../constants/urlForFiresore";
import AuthService from "./AuthService";
import StorageService from "./StorageService";
import uploadTaskToFirebase from "../helpers/uploadTaskToFirebase";
import { PENDING } from "../constants/taskStatuses";
import firebase from "firebase";

class TasksService {
  async getAllList(data) {
    const { boardId } = data;
    const tempDoc = [];
    const docBoardRef = firestore.collection(boardsUrl);
    const docTaskRef = firestore.collection(tasksUrl);
    const boardTasksIds = (await docBoardRef.doc(boardId).get()).data().tasks;
    for (const taskId of boardTasksIds) {
      const boardTask = (await docTaskRef.doc(taskId).get()).data();
      boardTask.assigneeData = await AuthService.getUser(boardTask.assignee);
      await tempDoc.push(boardTask);
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
      taskStatus: PENDING,
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
      function () {
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

    const query = await docTaskRef
      .where("boardId", "==", data.boardId)
      .where("taskStatus", "==", status)
      .where("assignee", "==", assignee)
      .get();

    for (const doc of query.docs) {
      await tempDoc.push({ ...doc.data() });
    }

    for (const taskId of tempDoc) {
      taskId.assigneeData = await AuthService.getUser(taskId.assignee);
    }
    return tempDoc;
  }
}
export default new TasksService();
