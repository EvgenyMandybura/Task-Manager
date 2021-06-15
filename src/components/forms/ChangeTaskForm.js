import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MemberDetails from "../members/MemberDetails";
import styles from "../tasks/index.module.scss";
import dateFormat from "../../helpers/dateHelper";
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

const validationSchema = yup.object({
  summary: validationSchemas.summary,
});

const ChangeTaskForm = ({ tasksState, boardsState }) => {
  const { task, taskStatus } = tasksState;
  const { board } = boardsState;

  const initialValues = {
    summary: "",
    description: "",
    assignee: "",
    timeEstimation: "",
  };

  const handleSubmitForm = (values) => {
    values.description = saveToDb(values.description);
    const model = { values, history };
    editTaskDetails(model);
  };

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
              <Row>
                <h3 className={styles.taskHeader}>
                  {" "}
                  <FormikFormGroup
                    errors={errors}
                    touched={touched}
                    fieldName={"summary"}
                    label={"Summary"}
                    placeholder={"Add summary"}
                  />
                </h3>
                <Col xs="8">
                  <h4>Task description:</h4>
                  <FormikFormGroup
                    type={"richEditor"}
                    errors={errors}
                    touched={touched}
                    fieldName={"description"}
                    label={"Description"}
                    placeholder={"Add description"}
                  />
                </Col>
                <Col xs="4">
                  <div>
                    <p className="d-inline">Time estimation: </p>
                    <FormikFormGroup
                      errors={errors}
                      touched={touched}
                      fieldName={"timeEstimation"}
                      label={"Set Due date:    "}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      type={"datePicker"}
                    />
                  </div>
                  <p> Assignee:: </p>
                  <FormikFormGroup
                    errors={errors}
                    touched={touched}
                    fieldName={"assignee"}
                    label={"Add assignee"}
                    placeholder={"Select assignee"}
                    options={createMemberArrayForSelect(board?.members)}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    type={"select"}
                  />
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

              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="success"
                  type="submit"
                  className="buttonLabel"
                  size="md"
                >
                  Add task
                </Button>
              </div>
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
export default withRouter(connect(mapStateToProps, {})(ChangeTaskForm));
