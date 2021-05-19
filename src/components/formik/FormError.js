import React from "react";
import FormikFormError from "./FormikFormError";

const getDeepValue = (object, path) =>
  path
    .replace(/\[|\]\.?/g, ".")
    .split(".")
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], object);

const FormError = ({ fieldName, errors, touched, ...rest }) => {
  const error = getDeepValue(errors, fieldName);
  const isTouched = getDeepValue(touched, fieldName);

  return (
    <>
      {error && isTouched && (
        <FormikFormError {...rest}>{error}</FormikFormError>
      )}
    </>
  );
};

export default FormError;
