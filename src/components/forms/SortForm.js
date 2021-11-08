import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form, Row, Col } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { getListTasks } from "../../redux/tasks/actions";
import { sortFields } from "../../constants/sortFields";
import { useTranslation } from "react-i18next";

const initialValues = {
  sortField: "",
};

const SortForm = ({ getListTasks }) => {
  const handleSubmitForm = (values) => {
    const sortField = values.sortField;
    const model = { boardId, sortField };
    getListTasks(model);
  };
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const { t } = useTranslation();
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ errors, touched, handleSubmit, setFieldTouched, setFieldValue }) => {
        return (
          <div>
            <Form className="w-100" onSubmit={handleSubmit}>
              <Row>
                <Col xs="5">
                  <FormikFormGroup
                    errors={errors}
                    touched={touched}
                    fieldName={"sortField"}
                    label={t("sort.label")}
                    placeholder={t("sort.placeholder")}
                    options={sortFields}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    type={"select"}
                  />
                </Col>
                <Col>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      color="primary"
                      type="submit"
                      size="md"
                      className="searchBtn"
                    >
                      {t("sort.sort")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { getListTasks })(SortForm));
