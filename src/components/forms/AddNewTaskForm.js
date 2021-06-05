import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { saveToDb } from "../../helpers/saveRichTextToDb";

const validationSchema = yup.object({
  summary: validationSchemas.summary,
});

const initialValues = {
  summary: "",
  description: {},
  assignee: "",
  timeEstimation: "",
};

const AddNewTaskForm = () => {
  const handleSubmitForm = (values) => {
    values.description = saveToDb(values.description);
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
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="success"
                  type="submit"
                  className="w-100 mt-3 text-uppercase"
                  size="md"
                >
                  Add task
                </Button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(AddNewTaskForm));
