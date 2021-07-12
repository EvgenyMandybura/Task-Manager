import styles from "../components/tasks/index.module.scss";
import { DONE, INPROGRESS } from "../constants/taskStatuses";

const classStatus = (status) => {
  switch (status) {
    case DONE:
      return styles.tasksStatusDone;
      break;
    case INPROGRESS:
      return styles.tasksStatusInProgress;
      break;

    default:
      return styles.tasksStatusTodo;
  }
};

export default classStatus;
