import styles from "../components/tasks/index.module.scss";
import { COMPLETED, DELETED } from "../constants/taskStatuses";

const classStatus = (status) => {
  switch (status) {
    case COMPLETED:
      return styles.tasksStatusCompleted;
      break;
    case DELETED:
      return styles.tasksStatusDeleted;
      break;

    default:
      return styles.tasksStatusPending;
  }
};

export default classStatus;
