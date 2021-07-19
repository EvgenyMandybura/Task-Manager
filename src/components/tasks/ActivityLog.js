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

  return (
    <Table striped>
      <thead>
        <tr>
          <th>User email</th>
          <th>Activity</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {ready &&
          activitiesLog?.map((activity) => (
            <tr key={activity.timeStamp}>
              <td>{activity.activityCreator}</td>
              {!!activity.taskStatus ? (
                <td>Change task status to {activity.taskStatus}</td>
              ) : (
                <td>Change task details</td>
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
