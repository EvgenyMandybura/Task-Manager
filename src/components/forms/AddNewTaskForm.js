import React, { useEffect, useState, useL } from "react";
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

const validationSchema = yup.object({
  summary: validationSchemas.summary,
});

const initialValues = {
  summary: "",
  description: {},
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
    const model = { values, history };
    createTask(model);
  };

  const {
    params: { boardId },
  } = useRouteMatch("/add-new-task/:boardId");
  const [ready, updateReady] = useState(false);
  const { loading, board: board } = boardState;
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {(form) => {
        const {
          errors,
          touched,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
        } = form;

        return (
          <div>
            {ready && !loading && (
              <Form className="w-100" onSubmit={handleSubmit}>
                <h3>Add new task</h3>
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
