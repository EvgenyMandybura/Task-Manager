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
import { stringToMinutes } from "../../helpers/workLogTimeHelper";
import { addWorkLog } from "../../redux/workLog/actions";
import { useTranslation } from "react-i18next";

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
    values.boardId = tasksStatus.tasks.task[0].boardId;
    addWorkLog(values);
  };

  const initialValues = {
    workLogComment: "",
    loggedTime: "",
  };
  const modalTitleStyles = classNames(styles.modalTitle, "text-center");
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} centered toggle={() => onCancel()}>
      <ModalBody>
        <p className={modalTitleStyles}>{t("modal.addWorkLog")}</p>
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
                  fieldName={"placeholderComment"}
                  label={t("modal.labelComment")}
                  placeholder={t("modal.placeholderComment")}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"loggedTime"}
                  label={t("modal.labelLogged")}
                  placeholder={t("modal.placeholderLogged")}
                />
                <div>
                  <Button
                    color="success"
                    type="submit"
                    size="lg"
                    className={styles.modalColumnBtn}
                    onClick={() => onConfirm()}
                  >
                    {t("modal.save")}
                  </Button>
                  <Button
                    color="danger"
                    size="lg"
                    onClick={() => onCancel()}
                    className={styles.modalColumnBtn}
                  >
                    {t("modal.cancel")}
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
