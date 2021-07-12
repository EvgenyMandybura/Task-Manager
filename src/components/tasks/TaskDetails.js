import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTaskDetails, clearTaskDetails } from "../../redux/tasks/actions";
import MemberDetails from "../members/MemberDetails";
import styles from "./index.module.scss";
import dateFormat from "../../helpers/dateHelper";
import FilesDetails from "./fileDetails";

const TaskDetail = ({ getTaskDetails, clearTaskDetails, tasksState }) => {
  const {
    params: { taskId },
  } = useRouteMatch("/task-details/:taskId");
  const { loading, task } = tasksState;
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
              <p> Assignee:: </p>
              <MemberDetails member={task[0]?.assigneeData} />
              <div>
                <p className="d-inline">Time estimation: </p>
                <p className={styles.tasksDate}>
                  {dateFormat(task[0]?.timeEstimation.seconds)}
                </p>
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
