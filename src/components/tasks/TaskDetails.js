import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTaskDetails, clearTaskDetails } from "../../redux/tasks/actions";
import MemberDetails from "../members/MemberDetails";
import styles from "./index.module.scss";
import dateFormat from "../../helpers/dateHelper";
import FilesDetails from "./fileDetails";
import classNames from "classnames";
import classStatus from "../../helpers/statusColor";
import ChangeTaskStatusForm from "../forms/ChangeTaskStatusForm";

const TaskDetail = ({ getTaskDetails, clearTaskDetails, tasksState }) => {
  const {
    params: { taskId },
  } = useRouteMatch("/task-details/:taskId");
  const { loading, task, taskStatus } = tasksState;
  const [ready, updateReady] = useState(false);
  const fetchTask = () => {
    getTaskDetails(taskId);
  };
  useEffect(() => {
    fetchTask();
    updateReady(true);
    return () => {
      clearTaskDetails();
    };
  }, []);
  useEffect(() => {
    if (!loading) {
      fetchTask();
    }
  }, []);

  return (
    <>
      {ready && !loading && (
        <div>
          <h3 className={styles.taskHeader}>{task[0]?.summary}</h3>
          <Row>
            <Col xs="8">
              <h4>Task description:</h4>
              <div
                className={styles.taskDescription}
                dangerouslySetInnerHTML={{ __html: task[0]?.description }}
              />
              <FilesDetails fileUrls={task[0]?.fileUrls} />
            </Col>
            <Col xs="4">
              <div>
                <p className="d-inline">Time estimation: </p>
                <p className={styles.tasksDate}>
                  {dateFormat(task[0].timeEstimation?.seconds)}
                </p>
              </div>
              <p> Assignee:: </p>
              <MemberDetails member={task[0].assigneeData} />
              <div className={styles.container}>
                <p className="d-inline">Status: </p>
                <div className={styles.containerTextStatus}>
                  <p
                    className={classNames(
                      styles.tasksStatus,
                      classStatus(taskStatus || task[0].taskStatus)
                    )}
                  >
                    {taskStatus || task[0].taskStatus}
                  </p>
                </div>
                <div className={styles.containerChangeStatus}>
                  <ChangeTaskStatusForm />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ tasks }) => ({ tasksState: tasks });
export default withRouter(
  connect(mapStateToProps, {
    getTaskDetails,
    clearTaskDetails,
  })(TaskDetail)
);
