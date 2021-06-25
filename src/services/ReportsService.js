import { workLogsUrl, tasksUrl } from "../constants/urlForFiresore";

import { firestore } from "../components/Firebase/firebase";
import StorageService from "./StorageService";
import BoardsService from "./BoardsService";

class ReportsService {
  async getWorkLogs(model) {
    const currentUser = StorageService.user.value.email;
    const queryTasks = await firestore.collection(tasksUrl).get();
    const tempWorkLogArray = [];
    const tempTasksArray = [];
    for (let doc of queryTasks.docs) {
      const { taskId, summary, boardId } = doc.data();

      tempTasksArray.push({ taskId, summary, boardId });
    }
    for (let task of tempTasksArray) {
      const query = await firestore
        .collection(workLogsUrl)
        .doc(task.taskId)
        .collection(workLogsUrl)
        .where("workLogCreator", "==", currentUser)
        .get();
      const boardData = await BoardsService.getBoard(task.boardId);

      for (const workLog of query.docs) {
        let model = { ...workLog.data() };
        model.taskTitle = task.summary;
        model.boardTitle = boardData.title;
        await tempWorkLogArray.push(model);
      }
    }
    return tempWorkLogArray;
  }
}
export default new ReportsService();
