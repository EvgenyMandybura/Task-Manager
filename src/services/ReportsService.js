import { workLogsUrl, tasksUrl } from "../constants/urlForFiresore";
import { firestore } from "../components/Firebase/firebase";
import StorageService from "./StorageService";
import BoardsService from "./BoardsService";
import {
  ALL_REPORTS,
  FILTERED_BY_TASK,
  FILTERED_BY_BOARD,
} from "../constants/reportsQuery";

class ReportsService {
  async getWorkLogs(model) {
    const currentUser = StorageService.user.value.email;
    const queryTasks = await firestore.collection(tasksUrl).get();
    const tempWorkLogArray = [];
    const tempTasksArray = [];
    const arr = [];
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
      const tempArrTasks = [];
      let sum = 0;
      for (const workLog of query.docs) {
        let model = { ...workLog.data() };
        model.taskTitle = task.summary;
        model.boardTitle = boardData.title;
        sum += model.loggedTime;
        await tempWorkLogArray.push(model);
        await tempArrTasks.push(model);
      }
      if (tempArrTasks.length > 0) {
        arr.push(tempArrTasks);
      }
      await tempArrTasks.push(sum);
    }
    switch (model) {
      case ALL_REPORTS:
        await tempWorkLogArray.sort((a, b) => b.timeStamp - a.timeStamp);
        return tempWorkLogArray;
        break;

      case FILTERED_BY_BOARD:
        let filteredByBoard = [];
        for (let i = 0, j = 0; i < arr.length; i++) {
          if (i == 0) {
            filteredByBoard[j] = [];
            filteredByBoard[j].push(arr[i]);
          } else {
            if (arr[i][0].boardId == arr[i - 1][0].boardId) {
              if (j != 0) {
                filteredByBoard[j] = [];
              }
              filteredByBoard[j].push(arr[i]);
            } else {
              j++;
              filteredByBoard[j] = [];
              filteredByBoard[j].push(arr[i]);
            }
          }
        }
        return filteredByBoard;
        break;

      default:
        return arr;
        break;
    }
  }
}
export default new ReportsService();
