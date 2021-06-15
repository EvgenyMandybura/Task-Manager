import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTaskDetails, clearTaskDetails } from "../../redux/tasks/actions";
import MemberDetails from "../members/MemberDetails";
import styles from "./index.module.scss";
import dateFormat from "../../helpers/dateHelper";
import classNames from "classnames";
import classStatus from "../../helpers/statusColor";
import ChangeTaskStatusForm from "../forms/ChangeTaskStatusForm";
import TabForPage from "../layout/TabsForPage";
import FilesDetails from "./fileDetails";
import ChangeTaskForm from "../forms/ChangeTaskForm";

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

  const [editState, setEditState] = useState(false);
  const editTaskDetails = (e) => {
    e.preventDefault();
    setEditState(!editState);
  };

  return (
    <>
      {ready && !loading && (
        <div>
          <Button color="success" onClick={editTaskDetails}>
            {editState ? "Save changes" : "Edit task"}
          </Button>

          {!editState ? (
            <Row>
              <h3 className={styles.taskHeader}>{task[0]?.summary}</h3>
              <Col xs="8">
                <h4>Task description:</h4>
                <div
                  className={styles.taskDescription}
                  dangerouslySetInnerHTML={{ __html: task[0]?.description }}
                />
                <FilesDetails />
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
          ) : (
            <ChangeTaskForm />
          )}

          <TabForPage />
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
