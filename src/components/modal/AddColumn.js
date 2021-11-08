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
import { changeStatuses } from "../../redux/boards/actions";
import { statusesArrayEdditing } from "../../helpers/statusesArrayEditting";

const validationSchema = yup.object({
  column: validationSchemas.column,
});

const AddColumnModal = ({
  isOpen,
  onCancel,
  onConfirm,
  changeStatuses,
  boardsState,
}) => {
  const handleSubmitForm = (values) => {
    const { board } = boardsState;
    const { boardId, statuses } = board;

    values.statuses = statusesArrayEdditing(statuses, values.column);
    values.boardId = boardId;

    !!values.statuses && changeStatuses(values);
  };

  const initialValues = {
    column: "",
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
                  fieldName={"column"}
                  label={"Column"}
                  placeholder={"Add column"}
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
  connect(mapStateToProps, { changeStatuses })(AddColumnModal)
);
