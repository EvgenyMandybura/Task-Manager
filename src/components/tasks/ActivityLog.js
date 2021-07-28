import React, { useEffect, useState } from "react";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getActivitiesLog,
  clearActivitiesLog,
} from "../../redux/tasks/actions";
import { Table } from "reactstrap";
import dateFormat from "../../helpers/dateHelper";
import { milliseconds } from "../../helpers/dateHelper";
import { useTranslation } from "react-i18next";

const ActivityLog = ({ getActivitiesLog, clearActivitiesLog, tasksState }) => {
  const {
    params: { taskId },
  } = useRouteMatch("/task-details/:taskId");
  const { loading, activitiesLog } = tasksState;
  const [ready, updateReady] = useState(false);
  const fetchActivityLog = () => {
    getActivitiesLog(taskId);
  };
  useEffect(() => {
    fetchActivityLog();
    updateReady(true);
    return () => {
      clearActivitiesLog();
    };
  }, []);
  useEffect(() => {
    if (!loading) {
      fetchActivityLog();
    }
  }, []);
  const { t } = useTranslation();
  return (
    <Table striped>
      <thead>
        <tr>
          <th>{t("tasks.userEmail")}</th>
          <th>{t("tasks.activity")}</th>
          <th>{t("tasks.date")}</th>
        </tr>
      </thead>
      <tbody>
        {ready &&
          activitiesLog?.map((activity) => (
            <tr key={activity.timeStamp}>
              <td>{activity.activityCreator}</td>
              {!!activity.taskStatus ? (
                <td>
                  {t("tasks.changeTaskStatusTo")} {activity.taskStatus}
                </td>
              ) : (
                <td>{t("tasks.changeTaskDetails")}</td>
              )}
              <td>{dateFormat(activity.timeStamp / milliseconds)}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const mapStateToProps = ({ tasks }) => ({ tasksState: tasks });
export default withRouter(
  connect(mapStateToProps, {
    getActivitiesLog,
    clearActivitiesLog,
  })(ActivityLog)
);
