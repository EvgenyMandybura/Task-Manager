import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import { Row, Col } from "reactstrap";
import styles from "./index.scss";

const initialValues = {
  keyword: "",
};

const Search = ({}) => {
  const handleSubmitSearch = (values) => {};
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitSearch}>
      {(form) => {
        const { errors, touched, handleSubmit } = form;
        return (
          <Form className="w-100" onChange={handleSubmit}>
            <Row>
              <Col>
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"keyword"}
                  placeholder={"Search tasks"}
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  type="submit"
                  className="searchBtn"
                  size="md"
                >
                  Search
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
export default withRouter(connect(mapStateToProps, {})(Search));
