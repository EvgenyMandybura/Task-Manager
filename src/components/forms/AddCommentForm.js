import React from "react";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createComment } from "../../redux/comments/actions";
import styles from "./index.scss";
import { useTranslation } from "react-i18next";

const LeaveCommentForm = ({ createComment }) => {
  const {
    params: { taskId },
  } = useRouteMatch("/task-details/:taskId");

  const handleSubmitForm = (values) => {
    values.taskId = taskId;
    createComment(values);
  };
  const { t } = useTranslation();
  const initialValues = {
    description: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {(form) => {
        const { errors, touched, handleSubmit } = form;

        return (
          <Form className={styles.containerForm} onSubmit={handleSubmit}>
            <FormikFormGroup
              type="textarea"
              errors={errors}
              touched={touched}
              fieldName={"description"}
              placeholder={t("leaveCommentForm.placeholder")}
            />
            <div className="d-flex justify-content-center align-items-center">
              <Button color="success" type="submit" size="md">
                {t("leaveCommentForm.comment")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, { createComment })(LeaveCommentForm)
);
