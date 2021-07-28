import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { saveToDb } from "../../helpers/saveRichTextToDb";
import { getBoard, clearBoardFetched } from "../../redux/boards/actions";
import { clearSetTaskFiles } from "../../redux/tasks/actions";
import createMemberArrayForSelect from "../../helpers/createMenberArrayForSelectFormik";
import { createTask } from "../../redux/tasks/actions";
import StorageService from "../../services/StorageService";
import { useTranslation } from "react-i18next";
import DropzoneComponent from "../dropzone/DropzoneComponent";

const validationSchema = yup.object({
  summary: validationSchemas.summary,
});

const AddNewTaskForm = ({
  createTask,
  getBoard,
  clearBoardFetched,
  boardState,
  taskState,
  history,
  clearSetTaskFiles,
}) => {
  const handleSubmitForm = (values) => {
    values.description = saveToDb(values.description);
    values.boardId = boardId;
    values.timeEstimation = values.timeEstimation == "" && new Date();
    fileModel.files = taskState.filesForUpload || [];
    const model = { values, history, fileModel };
    createTask(model);
    clearSetTaskFiles();
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
  const initialValues = {
    summary: "",
    description: "",
    assignee: StorageService.user.value.email,
    timeEstimation: "",
  };
  const { t } = useTranslation();
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
                <h3>{t("addNewTaskForm.addNewTask")}</h3>
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"summary"}
                  label={t("addNewTaskForm.labelSummary")}
                  placeholder={t("addNewTaskForm.placeholderSummary")}
                />
                <FormikFormGroup
                  type={"richEditor"}
                  errors={errors}
                  touched={touched}
                  fieldName={"description"}
                  label={t("addNewTaskForm.labelDescription")}
                  placeholder={t("addNewTaskForm.placeholderDescription")}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"assignee"}
                  label={t("addNewTaskForm.labelAssignee")}
                  placeholder={t("addNewTaskForm.placeholderAssignee")}
                  options={createMemberArrayForSelect(board?.members)}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  type={"select"}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"timeEstimation"}
                  label={t("addNewTaskForm.labelDate")}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  type={"datePicker"}
                />
                <DropzoneComponent />
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    color="success"
                    type="submit"
                    className="buttonLabel"
                    size="md"
                  >
                    {t("addNewTaskForm.addTask")}
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
const mapStateToProps = ({ boards, tasks }) => ({
  boardState: boards,
  taskState: tasks,
});

export default withRouter(
  connect(mapStateToProps, {
    createTask,
    getBoard,
    clearBoardFetched,
    clearSetTaskFiles,
  })(AddNewTaskForm)
);
