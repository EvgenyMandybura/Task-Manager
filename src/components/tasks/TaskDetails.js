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
import useModal from "../../hook/useModal";
import AddWorkLogModal from "../modal/AddWorkLogModal";
import { getLogWorksData } from "../../redux/workLog/actions";
import { minutesToString } from "../../helpers/workLogTimeHelper";
import { useTranslation } from "react-i18next";

const TaskDetail = ({
  getTaskDetails,
  clearTaskDetails,
  tasksState,
  getLogWorksData,
  workLogsState,
}) => {
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

  const { loadingWorkLog, totalWorkLog, workLogs } = workLogsState;
  const fetchWorkLogs = () => {
    getLogWorksData(taskId);
  };
  useEffect(() => {
    if (!loadingWorkLog) {
      fetchWorkLogs();
    }
  }, []);

  const [editState, setEditState] = useState(false);
  const editTaskDetails = (e) => {
    e.preventDefault();
    setEditState(!editState);
  };

  const [modalVisibleWorkLogAdd, toggleModalWorkLogAdd] = useModal();
  const onConfirmed = () => {
    toggleModalWorkLogAdd();
    fetchWorkLogs();
  };
  const { t } = useTranslation();
  return (
    <>
      {ready && !loading && (
        <div>
          <Button color="success" onClick={editTaskDetails}>
            {editState ? t("tasks.saveChanges") : t("tasks.editTask")}
          </Button>
          <Button color="info" onClick={() => toggleModalWorkLogAdd()}>
            {t("tasks.addWorklog")}
          </Button>
          <AddWorkLogModal
            isOpen={modalVisibleWorkLogAdd}
            onCancel={toggleModalWorkLogAdd}
            onConfirm={onConfirmed}
          />
          {!editState ? (
            <Row>
              <h3 className={styles.taskHeader}>{task[0]?.summary}</h3>
              <Col xs="8">
                <h4> {t("tasks.taskDescription")}</h4>
                <div
                  className={styles.taskDescription}
                  dangerouslySetInnerHTML={{ __html: task[0]?.description }}
                />
                <FilesDetails />
              </Col>
              <Col xs="4">
                <div>
                  <p className="d-inline">{t("tasks.dueDate")} </p>
                  <p className={styles.tasksDate}>
                    {dateFormat(task[0]?.timeEstimation?.seconds)}
                  </p>
                </div>
                {!!workLogs && !loadingWorkLog && (
                  <div>
                    <p className="d-inline">{t("tasks.totalLogged")} </p>
                    <p className={styles.tasksDate}>
                      {minutesToString(totalWorkLog)}
                    </p>
                  </div>
                )}
                <p> {t("tasks.assignee")} </p>
                <MemberDetails member={task[0].assigneeData} />
                <div className={styles.container}>
                  <p className="d-inline">{t("tasks.status")} </p>
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

const mapStateToProps = ({ tasks, workLogs }) => ({
  tasksState: tasks,
  workLogsState: workLogs,
});
export default withRouter(
  connect(mapStateToProps, {
    getTaskDetails,
    clearTaskDetails,
    getLogWorksData,
  })(TaskDetail)
);
