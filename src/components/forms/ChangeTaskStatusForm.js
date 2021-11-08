import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Form } from "formik";
import { editTask } from "../../redux/tasks/actions";
import { allStatus } from "../../constants/taskStatuses";
import styles from "./index.scss";

const ChangeTaskStatusForm = ({ editTask, tasksState, history }) => {
  const handleSubmitForm = (values) => {
    const taskStatus = values.taskStatus;
    const model = { taskId, taskStatus, history };
    editTask(model);
  };
  const { task } = tasksState;
  const { taskStatus, taskId } = task[0];

  const initialValues = {
    taskStatus: taskStatus,
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ errors, touched, handleSubmit, setFieldTouched, setFieldValue }) => {
        return (
          <div>
            <Form className="w-100" onChange={handleSubmit}>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"taskStatus"}
                value={taskStatus}
                options={allStatus}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                className={styles.btnStatus}
                type={"selectAddon"}
                buttonText={"Change"}
              />
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = ({ tasks }) => ({ tasksState: tasks });

export default withRouter(
  connect(mapStateToProps, { editTask })(ChangeTaskStatusForm)
);
