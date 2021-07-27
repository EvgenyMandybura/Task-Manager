import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { setFilterDates } from "../../redux/reports/actions";
import filterDates from "../../helpers/reportsFilterDate";

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

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
            {({ errors, touched, handleSubmit, setFieldTouched, setFieldValue }) => {
                return (
                    <Form className="w-100" onSubmit={handleSubmit}>
                        <FormikFormGroup
                            errors={errors}
                            touched={touched}
                            fieldName={"startDate"}
                            label={"Set start date: "}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            type={"datePicker"}
                        />
                        <FormikFormGroup
                            errors={errors}
                            touched={touched}
                            fieldName={"finishDate"}
                            label={"Set finish date:    "}
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
                                Filter
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
