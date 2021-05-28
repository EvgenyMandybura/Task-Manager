import React, { useRef } from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../redux/auth/actions";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import validationSchemas from "../../constants/validationSchemas";
import { minSize, maxSize } from "../../constants/imageSize";
import logoPlaceholder from "../../assets/ic-avatar-placeholder.svg";
import fileValidation from "../../helpers/fileValidation";

const validationSchema = yup.object({
    firstName: validationSchemas.name,
    lastName: validationSchemas.name,
    email: validationSchemas.email,
    password: validationSchemas.password,
    confirmPassword: validationSchemas.confirmPassword,
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
        fileValidation(model, registerUser);
    };
    const fileModel = {};
    const profileImage = useRef(logoPlaceholder);
    const changeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            fileModel.files = [file];
            profileImage.current = reader.result;
            const image = new Image();
            image.src = reader.result;
            image.onload = function(){
                if (( minSize <= this.width && this.width <=maxSize ) &&
                    (minSize <= this.height && this.height <=maxSize )) {
                    profileImage.current = reader.result;
                } else {
                    ToastrService.warn("Image size must be more 100px and less 1000px");
                }
            };
        };
    };

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
                            <h1>Sign up</h1>
                            <div>
                                <img
                                    src={profileImage.current? profileImage.current: null}
                                    alt="Logo"
                                    className="avatar"
                                />
                                <div className="file-input">
                                    <input
                                        ref={profileImage}
                                        type="file"
                                        accept="image/*"
                                        className="file"
                                        id="file"
                                        onChange={(e) => changeHandler(e)}
                                    />
                                    <label htmlFor="file" className="buttonLabel">Select file</label>
                                </div>
                            </div>
                            <FormikFormGroup
                                errors={errors}
                                touched={touched}
                                fieldName={"firstName"}
                                label={"firstName"}
                                placeholder={"Enter firstName"}
                            />
                            <FormikFormGroup
                                errors={errors}
                                touched={touched}
                                fieldName={"lastName"}
                                label={"lastName"}
                                placeholder={"Enter lastName"}
                            />
                            <FormikFormGroup
                                errors={errors}
                                touched={touched}
                                fieldName={"description"}
                                label={"description"}
                                placeholder={"Enter description"}
                            />
                            <FormikFormGroup
                                errors={errors}
                                touched={touched}
                                fieldName={"phone"}
                                label={"phone"}
                                placeholder={"Enter phone"}
                            />
                            <FormikFormGroup
                                type={"email"}
                                errors={errors}
                                touched={touched}
                                fieldName={"email"}
                                label={"Email address"}
                                placeholder={"Enter email"}
                            />
                            <FormikFormGroup
                                errors={errors}
                                touched={touched}
                                fieldName={"password"}
                                label={"Password"}
                                placeholder={"Enter password"}
                                type={"password"}
                            />
                            <FormikFormGroup
                                errors={errors}
                                touched={touched}
                                fieldName={"confirmPassword"}
                                label={"Confirm Password"}
                                placeholder={"Confirm password"}
                                type={"password"}
                            />
                            <div className="d-flex justify-content-center align-items-center">
                                <Button
                                    color="success"
                                    type="submit"
                                    className="w-100 mt-3 text-uppercase"
                                    size="md"
                                >
                                    Continue
                                </Button>
                            </div>
                            <div className="signInItems">
                                <Link to="/sign-in" className="text-decoration-none">Already have an account? Sign In</Link>
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
