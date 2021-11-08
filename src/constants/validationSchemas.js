import * as yup from "yup";
import "yup-phone";

import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  SUMMARY_MIN_LENGTH,
  SUMMARY_MAX_LENGTH,
  KEYWORD_MIN_LENGTH,
  COLUMN_MAX_LENGTH,
  COLUMN_MIN_LENGTH,
  WORK_LOG_COMMENT_MAX_LENGTH,
  WORK_LOG_COMMENT_MIN_LENGTH,
} from "./validationRules";

const uniqueValues = (values) => {
  return new Set(values).size === values.length;
};

const validationSchemas = {
  email: yup
    .string()
    .email("validationErrors.IS_INVALID_EMAIL")
    .required("validationErrors.IS_REQUIRED_EMAIL"),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_PASSWORD")
    .max(PASSWORD_MAX_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_PASSWORD")
    .matches(PASSWORD_PATTERN, "validationErrors.IS_INCORRECT_FORMAT_PASSWORD")
    .required("validationErrors.IS_REQUIRED_PASSWORD"),
  confirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length) > 0,
    then: yup
      .string()
      .oneOf([yup.ref("password")], "validationErrors.PASSWORD_DOES_NOT_MATCH"),
  }),
  passwordNoPattern: yup
    .string()
    .required("validationErrors.IS_REQUIRED_PASSWORD"),
  name: yup
    .string()
    .min(USERNAME_MIN_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_USERNAME")
    .max(USERNAME_MAX_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_USERNAME")
    .required("validationErrors.IS_REQUIRED_USERNAME"),
  phone: yup.string().phone().required(),
  title: yup
    .string()
    .min(TITLE_MIN_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_TITLE")
    .max(TITLE_MAX_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_TITLE")
    .required("validationErrors.IS_REQUIRED_TITLE"),
  description: yup
    .string()
    .max(
      DESCRIPTION_MAX_LENGTH,
      "validationErrors.IS_INCORRECT_LENGTH_DESCRIPTION"
    ),
  members: yup
    .array()
    .test("uniqueValues", "validationErrors.IS_EMAIL_UNIQUE", uniqueValues),
  summary: yup
    .string()
    .required()
    .min(SUMMARY_MIN_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_SUMMARY")
    .max(SUMMARY_MAX_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_SUMMARY"),
  keyword: yup
    .string()
    .min(KEYWORD_MIN_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_KEYWORD"),
  column: yup
    .string()
    .required()
    .min(COLUMN_MIN_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_COLUMN")
    .max(COLUMN_MAX_LENGTH, "validationErrors.IS_INCORRECT_LENGTH_COLUMN"),
  workLogComment: yup
    .string()
    .min(
      WORK_LOG_COMMENT_MIN_LENGTH,
      "validationErrors.IS_INCORRECT_WORK_LOG_COMMENT"
    )
    .max(
      WORK_LOG_COMMENT_MAX_LENGTH,
      "validationErrors.IS_INCORRECT_WORK_LOG_COMMENT"
    ),
};

export default validationSchemas;
