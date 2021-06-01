import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Button, Form, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import { completeProfile } from "../../redux/auth/actions";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import splitter from "../../helpers/splitter";
import { firebase_app } from "../Firebase/firebase";
import "./index.scss";
import FileHelper from "../../helpers/FIleHelper";
import fileValidation from "../../helpers/fileValidation";

const validationSchema = yup.object({
  firstName: validationSchemas.name,
  lastName: validationSchemas.name,
  email: validationSchemas.email,
  phone: validationSchemas.phone,
});

const CompleteProfileForm = ({ completeProfile, history }) => {
  const { displayName, email, phoneNumber, photoURL } =
    firebase_app.auth().currentUser;

  const initialValues = {
    firstName: displayName ? splitter(displayName)[0] : "",
    lastName: displayName ? splitter(displayName)[1] : "",
    description: "",
    email: email ? email : "",
    phone: phoneNumber ? phoneNumber : "",
  };
  const handleSubmitForm = (values) => {
    const model = { values, history, fileModel };
    fileModel.files = [file];
    fileValidation(model, completeProfile);
  };
  const uploadedImage = useRef(null);
  const fileModel = {};
  const [imageUploaded, setImageUploaded] = useState(null);
  const [file, setFile] = useState(null);
  const changeHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const promiseFile = await FileHelper.openAsDataUrl(file);
    await setImageUploaded(promiseFile);
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
            <Row>
              <Col md={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}>
                <h3>Complete Profile</h3>
                <div>
                  <img
                    src={imageUploaded ? imageUploaded : photoURL}
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
                      Select file
                    </label>
                  </div>
                </div>
                <Form className="w-100" onSubmit={handleSubmit}>
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
                    type={"email"}
                    errors={errors}
                    touched={touched}
                    fieldName={"email"}
                    label={"email"}
                    placeholder={"Enter email"}
                  />
                  <FormikFormGroup
                    errors={errors}
                    touched={touched}
                    fieldName={"phone"}
                    label={"phone"}
                    placeholder={"Enter phone"}
                  />
                  <div className="d-flex justify-content-center">
                    <Button color="dark" type="submit" size="lg" outline>
                      Save
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, { completeProfile })(CompleteProfileForm)
);
