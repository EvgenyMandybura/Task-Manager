import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import { Row, Col } from "reactstrap";
import validationSchemas from "../../constants/validationSchemas";
import * as yup from "yup";
import { searchTasks } from "../../redux/tasks/actions";
import { useTranslation } from "react-i18next";

const validationSchema = yup.object({
  keyword: validationSchemas.keyword,
});

const initialValues = {
  keyword: "",
};

const Search = ({ searchTasks }) => {
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const handleSubmitSearch = (values) => {
    const data = { boardId, values };
    searchTasks(data);
  };
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitSearch}
    >
      {({ errors, touched, handleSubmit }) => {
        return (
          <Form className="w-100" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"keyword"}
                  placeholder={t("search.placeholder")}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  type="submit"
                  className="searchBtn"
                  size="md"
                >
                  {t("search.search")}
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = () => ({});
export default withRouter(connect(mapStateToProps, { searchTasks })(Search));
