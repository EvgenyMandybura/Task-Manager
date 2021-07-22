import React, { useState, useEffect } from "react";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { getListTasks, getListTasksClear } from "../../redux/tasks/actions";
import styles from "./index.module.scss";
import Spinner from "../loaderSpinner/Spinner";
import MemberDetails from "../members/MemberDetails";
import classStatus from "../../helpers/statusColor";
import dateFormat from "../../helpers/dateHelper";
import { SUMMARY } from "../../constants/sortFields";

const ListOfTasks = ({
  getListTasks,
  getListTasksClear,
  tasksState,
  history,
}) => {
  const { tasksList } = tasksState;
  const [ready, updateReady] = useState(false);
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const fetchTasks = () => {
    const model = { boardId, SUMMARY };
    getListTasks(model);
  };
  useEffect(() => {
    fetchTasks();
    updateReady(true);
    return () => {
      getListTasksClear();
    };
  }, []);
  const { t } = useTranslation();
  return (
    <div className={styles.tasks}>
      {ready && tasksList !== "" ? (
        tasksList.map((task) => (
          <div
            key={task.summary}
            onClick={() => history.push(`/task-details/${task.taskId}`)}
            className={classNames(styles.tasksBody, "rounded-3 shadow")}
          >
            <h5 className="text-center">{task.summary}</h5>
            <hr />
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <p>{t("tasks.assignee")}</p>
                <MemberDetails member={task.assigneeData} />
              </div>
              <div className="col-md-6 col-xs-12 p-3">
                <p className="d-inline">{t("tasks.status")} </p>
                <p
                  className={classNames(
                    styles.tasksStatus,
                    classStatus(task.taskStatus)
                  )}
                >
                  {task.taskStatus}
                </p>
                <div>
                  <p className="d-inline">{t("tasks.timeEstimation")}</p>
                  <p className={styles.tasksDate}>
                    {dateFormat(task.timeEstimation.seconds)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};
const mapStateToProps = ({ tasks }) => ({ tasksState: tasks });
export default withRouter(
  connect(mapStateToProps, { getListTasks, getListTasksClear })(ListOfTasks)
);
