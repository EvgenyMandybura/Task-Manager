import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../tasks/index.module.scss";
import classNames from "classnames";
import classStatus from "../../helpers/statusColor";
import ChangeTaskStatusForm from "../forms/ChangeTaskStatusForm";
import FilesDetails from "../tasks/fileDetails";
import { Formik } from "formik";
import fileIcons from "../../helpers/fileIcons";
import FormikFormGroup from "../formik/FormikFormGroup";
import createMemberArrayForSelect from "../../helpers/createMenberArrayForSelectFormik";
import { saveToDb } from "../../helpers/saveRichTextToDb";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import { clearBoardFetched, getBoard } from "../../redux/boards/actions";
import { editTaskDetails } from "../../redux/tasks/actions";
import { useTranslation } from "react-i18next";

const validationSchema = yup.object({
  summary: validationSchemas.summary,
});

const ChangeTaskForm = ({
  tasksState,
  boardsState,
  getBoard,
  clearBoardFetched,
  editTaskDetails,
  history,
}) => {
  const { task, taskStatus } = tasksState;
  const currentTask = task[0];
  const { boardId } = currentTask;
  const { loading, board } = boardsState;
  const fetchBoard = () => {
    getBoard(boardId);
  };
  useEffect(() => {
    fetchBoard();
    return () => {
      clearBoardFetched();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchBoard();
    }
  }, []);

  const initialValues = {
    summary: currentTask.summary,
    description: currentTask.description,
    assignee: currentTask.assignee,
    timeEstimation: currentTask.timeEstimation,
  };

  const handleSubmitForm = (values) => {
    if (currentTask.description != values.description) {
      values.description = saveToDb(values.description);
    }
    const model = { taskId: currentTask.taskId, values, history, currentTask };
    editTaskDetails(model);
  };
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, setFieldTouched, setFieldValue }) => {
        return (
          <div>
            <Form className="w-100" onSubmit={handleSubmit}>
              <Button color="success" type="submit" size="md">
                {t("changeTaskForm.saveChanges")}
              </Button>

              <Row>
                <h3 className={styles.taskHeader}>
                  {" "}
                  <FormikFormGroup
                    errors={errors}
                    touched={touched}
                    fieldName={"summary"}
                    label={t("changeTaskForm.labelSummary")}
                    placeholder={t("changeTaskForm.placeholderSummary")}
                  />
                </h3>
                <Col xs="8">
                  <h4>{t("changeTaskForm.taskDescription")}</h4>
                  <FormikFormGroup
                    editorState={initialValues.description}
                    type={"richEditor"}
                    errors={errors}
                    touched={touched}
                    fieldName={"description"}
                    placeholder={t("changeTaskForm.placeholderDescription")}
                  />
                </Col>
                <Col xs="4">
                  <div>
                    <FormikFormGroup
                      errors={errors}
                      touched={touched}
                      fieldName={"timeEstimation"}
                      label={t("changeTaskForm.labelDate")}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      type={"datePicker"}
                    />
                  </div>

                  {!!board && (
                    <FormikFormGroup
                      errors={errors}
                      touched={touched}
                      fieldName={"assignee"}
                      label={t("changeTaskForm.labelAssignee")}
                      placeholder={t("changeTaskForm.placeholderAssignee")}
                      options={createMemberArrayForSelect(board?.members)}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      type={"select"}
                    />
                  )}

                  <div className={styles.container}>
                    <p className="d-inline">{t("changeTaskForm.status")}: </p>
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ tasks, boards }) => ({
  tasksState: tasks,
  boardsState: boards,
});
export default withRouter(
  connect(mapStateToProps, { getBoard, clearBoardFetched, editTaskDetails })(
    ChangeTaskForm
  )
);
