import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../redux/auth/actions";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import validationSchemas from "../../constants/validationSchemas";
import logoPlaceholder from "../../assets/ic-avatar-placeholder.svg";
import fileValidation from "../../helpers/fileValidation";
import FileHelper from "../../helpers/FIleHelper";
import { useTranslation } from "react-i18next";
const validationSchema = yup.object({
  firstName: validationSchemas.name,
  lastName: validationSchemas.name,
  email: validationSchemas.email,
  password: validationSchemas.password,
  confirmPassword: validationSchemas.confirmPassword,
  phone: validationSchemas.phone,
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  description: "",
  phone: "",
};

const SignUpForm = ({ registerUser, history }) => {
  const handleSubmitForm = (values) => {
    const model = { values, history, fileModel };
    fileModel.files = [file];
    fileValidation(model, registerUser);
  };
  const fileModel = {};
  const uploadedImage = useRef(null);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [file, setFile] = useState(null);
  const changeHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const promiseFile = await FileHelper.openAsDataUrl(file);
    await setImageUploaded(promiseFile);
  };
  const { t } = useTranslation();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {(form) => {
          const { errors, touched, handleSubmit } = form;

          return (
            <Form className="w-100" onSubmit={handleSubmit}>
              <h1>{t("signUp.signUp")}</h1>
              <div>
                <img
                  src={imageUploaded ? imageUploaded : logoPlaceholder}
                  alt="Logo"
                  className="avatar"
                />
                <div className="file-input">
                  <input
                    ref={uploadedImage}
                    type="file"
                    accept="image/*"
                    className="file"
                    id="file"
                    onChange={(e) => changeHandler(e)}
                  />
                  <label htmlFor="file" className="buttonLabel">
                    {t("signUp.selectFile")}
                  </label>
                </div>
              </div>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"firstName"}
                label={t("signUp.firstNameLabel")}
                placeholder={t("signUp.firstNamePlaceholder")}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"lastName"}
                label={t("signUp.lastNameLabel")}
                placeholder={t("signUp.lastNamePlaceholder")}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"description"}
                label={t("signUp.descriptionLabel")}
                placeholder={t("signUp.descriptionPlaceholder")}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"phone"}
                label={t("signUp.phoneLabel")}
                placeholder={t("signUp.phonePlaceholder")}
              />
              <FormikFormGroup
                type={"email"}
                errors={errors}
                touched={touched}
                fieldName={"email"}
                label={t("signUp.emailLabel")}
                placeholder={t("signUp.emailPlaceholder")}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"password"}
                label={t("signUp.passwordLabel")}
                placeholder={t("signUp.passwordPlaceholder")}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"confirmPassword"}
                label={"Confirm Password"}
                label={t("signUp.confirmPasswordLabel")}
                placeholder={t("signUp.confirmPasswordPlaceholder")}
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="success"
                  type="submit"
                  className="w-100 mt-3 text-uppercase"
                  size="md"
                >
                  {t("signUp.continue")}
                </Button>
              </div>
              <div className="signInItems">
                <Link to="/sign-in" className="text-decoration-none">
                  {t("signUp.haveAccount")}
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, { registerUser })(SignUpForm)
);
