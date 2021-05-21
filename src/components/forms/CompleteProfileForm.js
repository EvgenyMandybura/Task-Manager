import React from "react";
import { connect } from "react-redux";
import { Button, Form, Row, Col, Input } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { completeProfile } from "../../redux/auth/actions";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";

const initialValues = {
    firstName: "",
    lastName: "",
    description: "",
    email: "",
    phone: "",
};

const validationSchema = yup.object({
    firstName: validationSchemas.name,
    lastName: validationSchemas.name,
    email: validationSchemas.email,
    phone: validationSchemas.phone,
});

const CompleteProfileForm = ({ completeProfile, history }) => {
    const handleSubmitForm = (values) => {
        const model = { values, history, fileModel };
        completeProfile(model);
    };

    const fileModel = {};

    const changeHandler = (e) => {
        const file = e.target.files[0];
        fileModel.files = [file];
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
        >
            {(form) => {
                const {
                    errors,
                    touched,
                    handleSubmit,
                } = form;

                return (
                    <div>
                        <Row>
                            <Col md={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}>
                                <h3>Complete Profile</h3>
                                <div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => changeHandler(e)}
                                    />
                                </div>
                                <Form className="w-100" onSubmit={handleSubmit}>
                                    <FormikFormGroup
                                        errors={errors}
                                        touched={touched}
                                        fieldName={"firstName"}
                                        label={"firstName"}
                                        placeholder={"Enter firstName"}
                                    />
                                    <FormikFormGroup
                                        errors={errors}
                                        touched={touched}
                                        fieldName={"lastName"}
                                        label={"lastName"}
                                        placeholder={"Enter lastName"}
                                    />
                                    <FormikFormGroup
                                        errors={errors}
                                        touched={touched}
                                        fieldName={"description"}
                                        label={"description"}
                                        placeholder={"Enter description"}
                                    />
                                    <FormikFormGroup
                                        type={"email"}
                                        errors={errors}
                                        touched={touched}
                                        fieldName={"email"}
                                        label={"email"}
                                        placeholder={"Enter email"}
                                    />
                                    <FormikFormGroup
                                        errors={errors}
                                        touched={touched}
                                        fieldName={"phone"}
                                        label={"phone"}
                                        placeholder={"Enter phone"}
                                    />
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            color="dark"
                                            type="submit"
                                            size="lg"
                                            outline
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                );
            }}
        </Formik>
    );
};

const mapStateToProps = () => ({});

export default withRouter(
    connect(mapStateToProps, {completeProfile})(CompleteProfileForm)
);
