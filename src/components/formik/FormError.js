import React from "react";
import FormikFormError from "./FormikFormError";
import { useTranslation } from "react-i18next";

const getDeepValue = (object, path) =>
  path
    .replace(/\[|\]\.?/g, ".")
    .split(".")
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], object);

const FormError = ({ fieldName, errors, touched, ...rest }) => {
  const error = getDeepValue(errors, fieldName);
  const isTouched = getDeepValue(touched, fieldName);
  const { t } = useTranslation();
  return (
    <>
      {error && isTouched && (
        <FormikFormError {...rest}>{t(error)}</FormikFormError>
      )}
    </>
  );
};

export default FormError;
