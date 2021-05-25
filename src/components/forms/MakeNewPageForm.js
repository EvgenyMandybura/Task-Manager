import React, { useRef } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Field, FieldArray, Formik } from "formik";
import fileValidation from "../../helpers/fileValidation";
import logoPlaceholder from "../../assets/ic-placeholder.svg";
import { changeHandlerImage } from "../../helpers/UploadImage";
import { createBoard } from "../../redux/boards/actions";

const initialValues = {
  title: "",
  description: "",
  members: [""],
};

const MakeNewPageForm = ({ createBoard, history }) => {
  const handleSubmitForm = (values) => {
    const model = { values, history, fileModel };
    fileValidation(model, createBoard);
  };
  const fileModel = {};
  const profileImage = useRef(logoPlaceholder);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    changeHandlerImage(file, fileModel, profileImage);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
        {(form) => {
          const { errors, touched, handleSubmit } = form;
          return (
            <Form className="w-100" onSubmit={handleSubmit}>
              <h3>Create new Board</h3>
              <div>
                <img
                  src={profileImage.current ? profileImage.current : null}
                  alt="Logo"
                  className="boardImage"
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
                  <label htmlFor="file" className="buttonLabel">
                    Select file
                  </label>
                </div>
              </div>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"title"}
                label={"title"}
                placeholder={"Add title"}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"description"}
                label={"description"}
                placeholder={"Add description"}
              />
              <FieldArray name="members" label={"Members:"}>
                {({ remove, push }) => (
                  <div>
                    {form.values.members.length > 0 &&
                      form.values.members.map((member, index) => (
                        <Row key={index} className="memberAdd">
                          <Col xs="11">
                            <Field
                              name={`members.${index}`}
                              placeholder="Add member by email"
                              className="form-control"
                              type="email"
                            />
                          </Col>
                          <Col xs="1">
                            <Button
                              type="button"
                              color="danger"
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    <Button
                      type="button"
                      color="success"
                      onClick={() => push()}
                    >
                      Add member
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Button
                color="success"
                type="submit"
                className="buttonLabel"
                size="md"
              >
                Continue
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, { createBoard })(MakeNewPageForm)
);
