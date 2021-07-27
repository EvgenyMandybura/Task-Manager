import React from "react";
import FormikFormError from "./FormikFormError";
import { useTranslation } from "react-i18next";
import { ERRORS_RULES } from "../../constants/validationRules";

import { TranslationEN } from "../../Internationalization/locales/EN";

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
  const translateError = (error) => {
    let errorCode = error?.slice(17);
    let errorText = TranslationEN.validationErrors[errorCode];
    let variable = errorText?.substring(
      errorText.indexOf("{") + 2,
      errorText.indexOf("}")
    );
    if (variable == undefined) {
      return t(error);
    } else {
      return t(error, ERRORS_RULES[errorCode]);
    }
  };

  return (
    <>
      {error && isTouched && (
        <FormikFormError {...rest}>{translateError(error)}</FormikFormError>
      )}
    </>
  );
};

export default FormError;
