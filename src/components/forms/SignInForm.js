import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import validationSchemas from "../../constants/validationSchemas";
import "./index.scss";

const validationSchema = yup.object({
  email: validationSchemas.email,
  password: validationSchemas.passwordNoPattern,
});
const initialValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const handleSubmitForm = (values) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {(form) => {
        const { errors, touched, handleSubmit } = form;

        return (
          <div>
            <Form className="w-100" onSubmit={handleSubmit}>
              <h3>Log in Task Manager</h3>
              <FormikFormGroup
                type={"email"}
                errors={errors}
                touched={touched}
                fieldName={"email"}
                placeholder={"Enter email"}
              />
              <FormikFormGroup
                type={"password"}
                errors={errors}
                touched={touched}
                fieldName={"password"}
                placeholder={"Enter password"}
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="success"
                  type="submit"
                  className="w-100 mt-3 text-uppercase"
                  size="md"
                >
                  Sign In
                </Button>
              </div>
            </Form>
            <div className="signInItems">
              <Link to="/sign-up" className="text-decoration-none">Don't have an account? Sign Up</Link>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(SignInForm));
