import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Row } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Field, FieldArray, Formik } from "formik";
import FileHelper from "../../helpers/FIleHelper";
import {
  editBoard,
  getBoard,
  clearBoardFetched,
} from "../../redux/boards/actions";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import fileValidation from "../../helpers/fileValidation";

const validationSchema = yup.object({
  title: validationSchemas.title,
  description: validationSchemas.description,
});

const EditBoardDetailsForm = ({
  editBoard,
  getBoard,
  clearBoardFetched,
  history,
  boardState,
}) => {
  const {
    params: { boardId },
  } = useRouteMatch("/edit-board-details/:boardId");

  const { loading, board: board } = boardState;
  const [ready, updateReady] = useState(false);
  const fetchBoard = () => {
    getBoard(boardId);
  };
  useEffect(() => {
    fetchBoard();
    updateReady(true);
    return () => {
      clearBoardFetched();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchBoard();
    }
  }, []);

  const handleSubmitForm = (values) => {
    const model = { values, history, fileModel };
    model.values.boardId = boardId;
    fileModel.files = [file];
    fileValidation(model, editBoard);
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

  const initialValues = {
    title: board?.title,
    description: board?.description,
    members: board?.members,
  };

  return (
    <div>
      {ready && !loading && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {(form) => {
            const { errors, touched, handleSubmit } = form;
            return (
              <Form className="w-100" onSubmit={handleSubmit}>
                <h3>Edit Board</h3>
                <div>
                  <img
                    alt="Logo"
                    className="boardImage"
                    src={imageUploaded ? imageUploaded : board.fileUrl}
                  />
                  <div className="file-input">
                    <input
                      type="file"
                      accept="image/*"
                      className="file"
                      id="file"
                      ref={uploadedImage}
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
      )}
    </div>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, { editBoard, getBoard, clearBoardFetched })(
    EditBoardDetailsForm
  )
);
