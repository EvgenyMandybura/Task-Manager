import { firestore } from "../components/Firebase/firebase";
import { tasksUrl, boardsUrl } from "../constants/urlForFiresore";
import AuthService from "./AuthService";

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
}
export default new TasksService();
