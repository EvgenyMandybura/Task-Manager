import React from "react";
import { Button, Modal, ModalBody, Form } from "reactstrap";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import FormikFormGroup from "../formik/FormikFormGroup";
import { renameStatus } from "../../redux/boards/actions";
import { renameStatusInArray } from "../../helpers/statusesArrayEditting";

const validationSchema = yup.object({
  newStatus: validationSchemas.column,
});

const RenameColumnModal = ({
  isOpen,
  onCancel,
  onConfirm,
  renameStatus,
  boardsState,
  oldStatus,
}) => {
  const handleSubmitForm = (values) => {
    const { board } = boardsState;
    const { newStatus } = values;
    let { boardId, statuses } = board;
    const tasks = board.tasks;
    statuses = renameStatusInArray(statuses, oldStatus, newStatus);
    values = { boardId, oldStatus, statuses, newStatus, tasks };
    renameStatus(values);
  };

  const initialValues = {
    column: "",
  };
  const modalTitleStyles = classNames(styles.modalTitle, "text-center");

  return (
    <Modal isOpen={isOpen} centered toggle={() => onCancel()}>
      <ModalBody>
        <p className={modalTitleStyles}>Rename column:</p>
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
                  fieldName={"newStatus"}
                  label={"Column"}
                  placeholder={"Rename column"}
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

const mapStateToProps = ({ boards }) => ({ boardsState: boards });

export default withRouter(
  connect(mapStateToProps, { renameStatus })(RenameColumnModal)
);
