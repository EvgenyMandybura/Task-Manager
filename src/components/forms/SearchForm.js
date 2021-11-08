import React from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
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
          <Form className="sortFilterField" onChange={handleSubmit}>
            <FormikFormGroup
              errors={errors}
              touched={touched}
              label={t("search.search")}
              fieldName={"keyword"}
              placeholder={t("search.placeholder")}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = () => ({});
export default withRouter(connect(mapStateToProps, { searchTasks })(Search));
