import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { saveToDb } from "../../helpers/saveRichTextToDb";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import createMemberArrayForSelect from "../../helpers/createMenberArrayForSelectFormik";
import { createTask } from "../../redux/tasks/actions";
import FileHelper from "../../helpers/FIleHelper";
import fileIcons from "../../helpers/fileIcons";

const validationSchema = yup.object({
  summary: validationSchemas.summary,
});

const initialValues = {
  summary: "",
  description: "",
  assignee: "",
  timeEstimation: "",
};

const AddNewTaskForm = ({
  createTask,
  getBoard,
  clearBoardFetched,
  boardState,
  history,
}) => {
  const handleSubmitForm = (values) => {
    values.description = saveToDb(values.description);
    values.boardId = boardId;
    fileModel.files = filesMy;
    const model = { values, history, fileModel };
    createTask(model);
  };

  const {
    params: { boardId },
  } = useRouteMatch("/add-new-task/:boardId");
  const [ready, updateReady] = useState(false);
  const { loading, board } = boardState;
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

  const fileModel = {};
  const uploadedImage = useRef(null);
  const [filesPreview, setFilesPreview] = useState([]);
  const filesSelected = [];
  const filesForDB = [];
  const filesForDisplay = async (files) => {
    for (const file of files) {
      const promiseFile = await FileHelper.openAsDataUrlWithoutCheckingSize(
        file
      );
      await filesSelected.push({
        file: promiseFile,
        name: file.name,
        type: file.type,
      });
      await filesForDB.push(file);
    }
    await setFilesPreview(filesPreview.concat(filesSelected));
    await setFilesMy(filesMy.concat(filesForDB));
  };

  const [filesMy, setFilesMy] = useState([]);

  const changeHandler = (e) => {
    const files = e.target.files;
    filesForDisplay(files);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, setFieldTouched, setFieldValue }) => {
        return (
          <div>
            {ready && !loading && (
              <Form className="w-100" onSubmit={handleSubmit}>
                <h3>Add new task</h3>
                <div>
                  {filesPreview != [] ? (
                    filesPreview?.map((image) => (
                      <div key={image.file} className="task">
                        <img
                          src={
                            image.type.includes(`image/`)
                              ? image.file
                              : fileIcons(image.type)
                          }
                          alt="Logo"
                          className="taskImage"
                        />
                        <p>{image.name}</p>
                      </div>
                    ))
                  ) : (
                    <h3>No images</h3>
                  )}

                  <div className="file-input">
                    <input
                      ref={uploadedImage}
                      type="file"
                      multiple
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
                  fieldName={"summary"}
                  label={"Summary"}
                  placeholder={"Add summary"}
                />
                <FormikFormGroup
                  type={"richEditor"}
                  errors={errors}
                  touched={touched}
                  fieldName={"description"}
                  label={"Description"}
                  placeholder={"Add description"}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"assignee"}
                  label={"Add assignee"}
                  placeholder={"Select assignee"}
                  options={createMemberArrayForSelect(board?.members)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  type={"select"}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"timeEstimation"}
                  label={"Set Due date:    "}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  type={"datePicker"}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    color="success"
                    type="submit"
                    className="buttonLabel"
                    size="md"
                  >
                    Add task
                  </Button>
                </div>
              </Form>
            )}
          </div>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, { createTask, getBoard, clearBoardFetched })(
    AddNewTaskForm
  )
);
