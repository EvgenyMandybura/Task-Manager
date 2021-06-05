import { firestore } from "../components/Firebase/firebase";
import { tasksUrl, boardsUrl } from "../constants/urlForFiresore";
import AuthService from "./AuthService";
import StorageService from "./StorageService";
import uploadToFirebase from "../helpers/uploadToFirebase";
import { PENDING } from "../constants/taskStatuses";
import firebase from "firebase";
//firebase_app

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

    return uploadToFirebase(dataForStorage, null, taskId, null, tasksUrl).then(
      function () {
        return boardId;
      }
    );
  }
}
export default new TasksService();
