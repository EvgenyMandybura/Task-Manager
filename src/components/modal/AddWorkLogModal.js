import React from "react";
import { Button, Modal, ModalBody, Form } from "reactstrap";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Formik } from "formik";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import FormikFormGroup from "../formik/FormikFormGroup";
import { stringToMinutes } from "../../helpers/workLogTimeHelper";
import { addWorkLog } from "../../redux/workLog/actions";

const validationSchema = yup.object({
  workLogComment: validationSchemas.workLogComment,
});

const AddWorkLogModal = ({
  isOpen,
  onCancel,
  onConfirm,
  addWorkLog,
  tasksStatus,
}) => {
  const handleSubmitForm = (values) => {
    values.loggedTime = stringToMinutes(values.loggedTime);
    values.taskId = tasksStatus.tasks.task[0].taskId;
    addWorkLog(values);
  };

  const initialValues = {
    workLogComment: "",
    loggedTime: "",
  };
  const modalTitleStyles = classNames(styles.modalTitle, "text-center");

  return (
    <Modal isOpen={isOpen} centered toggle={() => onCancel()}>
      <ModalBody>
        <p className={modalTitleStyles}>Add column:</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ errors, handleSubmit, touched }) => {
            return (
              <Form className="w-100" onSubmit={handleSubmit}>
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  type={"textarea"}
                  fieldName={"workLogComment"}
                  label={"Comment"}
                  placeholder={"Add comment"}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"loggedTime"}
                  label={"Logged Time"}
                  placeholder={"Add Logged Time"}
                />
                <div>
                  <Button
                    color="success"
                    type="submit"
                    size="lg"
                    className={styles.modalColumnBtn}
                    onClick={() => onConfirm()}
                  >
                    Save
                  </Button>
                  <Button
                    color="danger"
                    size="lg"
                    onClick={() => onCancel()}
                    className={styles.modalColumnBtn}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (tasks) => ({ tasksStatus: tasks });

export default withRouter(
  connect(mapStateToProps, { addWorkLog })(AddWorkLogModal)
);
