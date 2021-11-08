import { workLogsUrl } from "../constants/urlForFiresore";
import StorageService from "./StorageService";
import uploadCommentsToFirebase from "../helpers/UploadCommentToFirebase";
import { firestore } from "../Firebase/firebase";
import AuthService from "./AuthService";
import ToastrService from "./ToastrService";
import { WRONG_USER } from "../constants/validationErrors";

class WorkLogService {
  addWorkLog(model) {
    const { taskId, workLogComment, loggedTime, boardId, assignee } = model;
    const currentUser = StorageService.user.value.email;

    if (assignee === currentUser) {
      const timeStamp = new Date().getTime();
      const dataForStorage = {
        workLogCreator: currentUser,
        workLogComment,
        loggedTime,
        taskId,
        boardId,
        timeStamp,
      };
      return uploadCommentsToFirebase(dataForStorage, taskId, workLogsUrl).then(
        () => {
          return { taskId };
        }
      );
    } else {
      ToastrService.error(WRONG_USER);
    }
  }

  async getWorkLogs(model) {
    const workLogsList = [];
    let totalWorkLog = 0;
    const query = await firestore
      .collection(workLogsUrl)
      .doc(model)
      .collection(workLogsUrl)
      .get();

    for (let i = 0; i < query.docs.length; i++) {
      const creatorData = await AuthService.getUser(
        query.docs[i].data().workLogCreator
      );
      totalWorkLog += query.docs[i].data().loggedTime;
      workLogsList.push({ creatorData, ...query.docs[i].data() });
    }
    return { workLogsList, totalWorkLog };
  }
}
export default new WorkLogService();
