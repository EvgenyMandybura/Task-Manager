import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form, Row, Col } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { filterTasks } from "../../redux/tasks/actions";
import createMemberArrayForSelect from "../../helpers/createMenberArrayForSelectFormik";
import { allStatus } from "../../constants/taskStatuses";

const initialValues = {
  status: "",
  assignee: "",
};

const FilterForm = ({ members, filterTasks }) => {
  const handleSubmitForm = (values) => {
    const model = { values, boardId };
    filterTasks(model);
  };

  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");

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
                    fieldName={"status"}
                    label={"Select status"}
                    placeholder={"Select status"}
                    options={allStatus}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    type={"select"}
                  />
                </Col>
                <Col xs="5">
                  <FormikFormGroup
                    errors={errors}
                    touched={touched}
                    fieldName={"assignee"}
                    label={"Add assignee"}
                    placeholder={"Select assignee"}
                    options={createMemberArrayForSelect(members)}
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
                      Filter
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

export default withRouter(
  connect(mapStateToProps, { filterTasks })(FilterForm)
);
