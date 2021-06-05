import React, { useState } from "react";
import { Field } from "formik";
import { FormGroup, InputGroup, Label } from "reactstrap";
import classNames from "classnames";
import FormError from "./FormError";
import FormikDropdown from "./FormikDropdown";
import RichTextEditor from "./RichTextEditor";

const FormikFormGroup = ({
  values = "",
  errors,
  touched,
  fieldName,
  placeholder,
  label = "",
  type = "text",
  handleChange = () => {},
  options = [],
  isMulti = false,
  maxLength = null,
  setFieldValue,
}) => {
  const [visible] = useState(false);
  const isInvalid = errors[fieldName] && touched[fieldName];
  const className = classNames("form-control", isInvalid && "is-invalid");

  const getInputComponent = (type) => {
    switch (type) {
      case "password":
        return (
          <InputGroup>
            <Field
              type={visible ? "text" : type}
              className={className}
              name={fieldName}
              placeholder={placeholder}
            />
          </InputGroup>
        );
      case "select":
        return (
          <Field
            name={fieldName}
            errors={errors}
            touched={touched}
            placeholder={placeholder}
            handleChange={handleChange}
            component={FormikDropdown}
            options={options}
            isMulti={isMulti}
          />
        );
      case "textarea":
        return (
          <Field
            component="textarea"
            type={type}
            className={className}
            name={fieldName}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        );
      case "richEditor":
        return (
          <Field
            component={RichTextEditor}
            editorState={values.editorState}
            onChange={setFieldValue}
            name={fieldName}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        );
      default:
        return (
          <Field
            type={type}
            className="form-control"
            name={fieldName}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <FormGroup className={isInvalid ? "mb-0" : "mb-3"}>
      <Label>{label}</Label>
      {getInputComponent(type)}
      <FormError
        fieldName={fieldName}
        errors={errors}
        touched={touched}
        className="ml-2"
      />
    </FormGroup>
  );
};

export default FormikFormGroup;
