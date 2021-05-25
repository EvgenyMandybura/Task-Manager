import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import validationSchemas from "../../constants/validationSchemas";

const validationSchema = yup.object({
    email: validationSchemas.email,
    password: validationSchemas.passwordNoPattern,
});

const MakeNewPageForm = ({ history }) => {
    const initialValues = {
        title: "",
        email: "",
        password: "",
    };

    const handleSubmitForm = (values) => {

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
                            <h3>Create new board</h3>

                            <FormikFormGroup

                                errors={errors}
                                touched={touched}
                                fieldName={"password"}
                                placeholder={"Enter password"}
                            />
                            <div className="d-flex justify-content-center align-items-center">
                                <Button
                                    color="success"
                                    type="submit"
                                    className="w-100 mt-3 text-uppercase"
                                    size="md"
                                >
                                    Sign In
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

export default withRouter(connect(mapStateToProps)(MakeNewPageForm));
