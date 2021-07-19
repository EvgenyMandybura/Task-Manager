import { workLogsUrl, tasksUrl } from "../constants/urlForFiresore";
import { firestore } from "../Firebase/firebase";
import StorageService from "./StorageService";
import BoardsService from "./BoardsService";
import { ALL_REPORTS, FILTERED_BY_BOARD } from "../constants/reportsQuery";

class ReportsService {
  async getWorkLogs(model) {
    const currentUser = StorageService.user.value.email;
    const queryTasks = await firestore.collection(tasksUrl).get();
    const tempWorkLogArray = [];
    const tempTasksArray = [];
    const filteredByTask = [];
    const boardsArray = [];
    const boardsLogs = [];
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
        if (!boardsArray.includes(tempArrTasks[0].boardId)) {
          boardsArray.push(tempArrTasks[0].boardId);
          const model = {
            boardId: tempArrTasks[0].boardId,
            logs: [],
          };
          boardsLogs.push(model);
        }
        filteredByTask.push(tempArrTasks);
      }
      await tempArrTasks.push(sum);
    }
    switch (model) {
      case ALL_REPORTS:
        await tempWorkLogArray.sort((a, b) => b.timeStamp - a.timeStamp);
        return tempWorkLogArray;
        break;

      case FILTERED_BY_BOARD:
        for (let board of boardsLogs) {
          board.sum = 0;
          for (let task of filteredByTask) {
            console.log(task.taskId, task[task.length - 1]);
            if (board.boardId == task[0].boardId) {
              board.sum += task[task.length - 1];
              board.logs.push(task);
            }
          }
        }
        return boardsLogs;
        break;

      default:
        return filteredByTask;
        break;
    }
  }
}
export default new ReportsService();
