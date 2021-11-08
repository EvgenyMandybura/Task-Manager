import React, { useState } from "react";
import { Field } from "formik";
import {
  FormGroup,
  InputGroup,
  Label,
  Button,
  InputGroupAddon,
} from "reactstrap";
import classNames from "classnames";
import FormError from "./FormError";
import FormikDropdown from "./FormikDropdown";
import RichTextEditor from "./RichTextEditor";
import DatesPicker from "./DatePicker";
import styles from "./formikStyles.scss";

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
  buttonText = "",
}) => {
  const [visible] = useState(false);
  const isInvalid = errors[fieldName] && touched[fieldName];
  const className = classNames(
    "form-control",
    styles,
    isInvalid && "is-invalid"
  );

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
      case "datePicker":
        return (
          <Field
            component={DatesPicker}
            onChange={setFieldValue}
            name={fieldName}
          />
        );
      case "selectAddon":
        return (
          <InputGroup>
            <div className="selectAddon">
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
            </div>
            <InputGroupAddon addonType="append">
              <Button color="success">{buttonText}</Button>
            </InputGroupAddon>
          </InputGroup>
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
