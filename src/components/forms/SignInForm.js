import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { loginUser } from "../../redux/auth/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import validationSchemas from "../../constants/validationSchemas";

const validationSchema = yup.object({
  email: validationSchemas.email,
  password: validationSchemas.passwordNoPattern,
});
const initialValues = {
  email: "",
  password: "",
};

const SignInForm = ({ loginUser, history }) => {
  const handleSubmitForm = (values) => {
    loginUser(values, history);
  };

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
              <h1>Sign In</h1>
              <FormikFormGroup
                type={"email"}
                errors={errors}
                touched={touched}
                fieldName={"email"}
                label={"Email address"}
                placeholder={"Enter email"}
              />
              <FormikFormGroup
                type={"password"}
                errors={errors}
                touched={touched}
                fieldName={"password"}
                label={"Password"}
                placeholder={"Enter password"}
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="dark"
                  type="submit"
                  className="w-100 mt-3 p-3 text-uppercase"
                  size="lg"
                >
                  Sign In
                </Button>
              </div>
            </Form>

            <Link to="/sign-up">Don't have an account? Sign Up</Link>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { loginUser })(SignInForm));
