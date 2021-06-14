import React from "react";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { useRouteMatch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createComment } from "../../redux/comments/actions";
import styles from "./index.scss";

const LeaveCommentForm = ({ createComment }) => {
  const {
    params: { taskId },
  } = useRouteMatch("/task-details/:taskId");

  const handleSubmitForm = (values) => {
    values.taskId = taskId;
    createComment(values);
  };

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
              placeholder={"Add comment"}
            />
            <div className="d-flex justify-content-center align-items-center">
              <Button color="success" type="submit" size="md">
                Comment
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
