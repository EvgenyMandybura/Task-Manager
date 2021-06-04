import React, { useState, useEffect } from "react";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getListTasks, getListTasksClear } from "../../redux/tasks/actions";
import styles from "./index.module.scss";
import MemberDetails from "../members/MemberDetails";
import classStatus from "../../helpers/statusColor";
import dateFormat from "../../helpers/dateHelper";
import classNames from "classnames";

const ListOfTasks = ({ getListTasks, getListTasksClear, tasksState }) => {
  const { tasksList: tasksList } = tasksState;
  const [ready, updateReady] = useState(false);
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const fetchTasks = () => {
    getListTasks(boardId);
  };
  useEffect(() => {
    fetchTasks();
    updateReady(true);
    return () => {
      getListTasksClear();
    };
  }, []);

  return (
    <div className={styles.tasks}>
      {ready && tasksList != "" ? (
        tasksList.map((task) => (
          <div key={task.summary} className={styles.tasksBody}>
            <h5>{task.summary}</h5>
            <p>Assignee:</p>
            <MemberDetails member={task.assigneeData} />
            <div>
              <p className="d-inline">Status: </p>
              <p
                className={classNames(
                  styles.tasksStatus,
                  classStatus(task.taskStatus)
                )}
              >
                {task.taskStatus}
              </p>
            </div>
            <div>
              <p className="d-inline">Time estimation: </p>
              <p className={styles.tasksDate}>
                {dateFormat(task.timeEstimation.seconds)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <h3>No tasks yet</h3>
      )}
    </div>
  );
};
const mapStateToProps = ({ tasks }) => ({ tasksState: tasks });
export default withRouter(
  connect(mapStateToProps, { getListTasks, getListTasksClear })(ListOfTasks)
);
