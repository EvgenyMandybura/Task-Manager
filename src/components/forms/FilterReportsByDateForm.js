import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { setFilterDates } from "../../redux/reports/actions";
import filterDates from "../../helpers/reportsFilterDate";
import { useTranslation } from "react-i18next";

const initialValues = {
  startDate: "",
  finishDate: "",
};

const AddNewTaskForm = ({ setFilterDates, reportState }) => {
  const { workLogs } = reportState;
  const handleSubmitForm = (values) => {
    if (filterDates(values)) {
      const model = {
        startDate: new Date(values.startDate),
        finishDate: new Date(values.finishDate),
        workLogs,
      };
      setFilterDates({ model });
    }
  };
  const { t } = useTranslation();
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ errors, touched, handleSubmit, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="w-100" onSubmit={handleSubmit}>
            <FormikFormGroup
              errors={errors}
              touched={touched}
              fieldName={"startDate"}
              label={t("filterReportsByDate.labelStartDate")}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              type={"datePicker"}
            />
            <FormikFormGroup
              errors={errors}
              touched={touched}
              fieldName={"finishDate"}
              label={t("filterReportsByDate.labelFinishDate")}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              type={"datePicker"}
            />

            <Button
              color="success"
              type="submit"
              size="md"
              className="filerByDateButton"
            >
              {t("filterReportsByDate.filter")}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = ({ reports }) => ({ reportState: reports });

export default withRouter(
  connect(mapStateToProps, { setFilterDates })(AddNewTaskForm)
);
