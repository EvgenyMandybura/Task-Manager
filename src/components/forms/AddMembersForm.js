import React from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { Field, FieldArray, Formik, ErrorMessage } from "formik";
import { saveMembers } from "../../redux/boards/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import FormikFormError from "../formik/FormikFormError";
import { useTranslation } from "react-i18next";

const validationSchema = yup.object({
  members: validationSchemas.members,
});

const AddMembersForm = ({ membersArray, saveMembers }) => {
  const handleSubmitForm = (values) => {
    saveMembers(values.members);
  };

  const initialValues = {
    members: membersArray,
  };
  const { t } = useTranslation();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, values }) => {
          return (
            <Form className="w-100" onSubmit={handleSubmit}>
              <FieldArray name="members" label={"Members:"}>
                {({ remove, push }) => (
                  <div>
                    {values.members.length > 0 &&
                      values.members.map((member, index) => (
                        <Row key={index} className="memberAdd">
                          <Col xs="10">
                            <Field
                              name={`members.${index}`}
                              label={t("addMembersForm.label")}
                              placeholder={t("addMembersForm.placeholder")}
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
                      {t("addMembersForm.addMember")}
                    </Button>
                  </div>
                )}
              </FieldArray>
              <FormikFormError>
                <ErrorMessage name="members" className="errorText" />
              </FormikFormError>
              <Button
                color="success"
                type="submit"
                className="buttonLabel"
                size="md"
              >
                {t("addMembersForm.saveChanges")}
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
  connect(mapStateToProps, { saveMembers })(AddMembersForm)
);
