import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import { loginUser } from "../../redux/auth/actions";
import validationSchemas from "../../constants/validationSchemas";
import { useTranslation } from "react-i18next";
import "./index.scss";

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
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit }) => {
        return (
          <div>
            <Form className="w-100" onSubmit={handleSubmit}>
              <h3>{t("logIn.logInTaskManager")}</h3>
              <FormikFormGroup
                type={"email"}
                errors={errors}
                touched={touched}
                fieldName={"email"}
                placeholder={t("logIn.enterEmail")}
              />
              <FormikFormGroup
                type={"password"}
                errors={errors}
                touched={touched}
                fieldName={"password"}
                placeholder={t("logIn.enterPassword")}
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="success"
                  type="submit"
                  className="w-100 mt-3 text-uppercase"
                  size="md"
                >
                  {t("logIn.signIn")}
                </Button>
              </div>
            </Form>
            <div className="signInItems">
              <Link to="/sign-up" className="text-decoration-none">
                {t("logIn.dontHaveAccount")}
              </Link>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { loginUser })(SignInForm));
