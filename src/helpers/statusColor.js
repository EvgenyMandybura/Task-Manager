import styles from "../components/tasks/index.module.scss";

const classStatus = (status) => {
  switch (status) {
    case "completed":
      return styles.tasksStatusCompleted;
      break;
    case "deleted":
      return styles.tasksStatusDeleted;
      break;

    default:
      return styles.tasksStatusPending;
  }
};

export default classStatus;
