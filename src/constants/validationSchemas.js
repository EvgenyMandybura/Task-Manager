import * as yup from "yup";
import "yup-phone";

import {
  IS_INCORRECT_FORMAT_PASSWORD,
  IS_INCORRECT_LENGTH_PASSWORD,
  IS_INCORRECT_LENGTH_USERNAME,
  IS_INVALID_EMAIL,
  IS_REQUIRED_EMAIL,
  IS_REQUIRED_PASSWORD,
  IS_REQUIRED_USERNAME,
  PASSWORD_DOES_NOT_MATCH,
  IS_REQUIRED_TITLE,
  IS_INCORRECT_LENGTH_TITLE,
  IS_INCORRECT_LENGTH_DESCRIPTION,
  IS_EMAIL_UNIQUE,
  IS_INCORRECT_LENGTH_SUMMARY,
  IS_INCORRECT_LENGTH_KEYWORD,
  IS_INCORRECT_LENGTH_COLUMN,
  IS_INCORRECT_WORK_LOG_COMMENT,
} from "./validationErrors";
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
  email: yup.string().email(IS_INVALID_EMAIL).required(IS_REQUIRED_EMAIL),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, IS_INCORRECT_LENGTH_PASSWORD)
    .max(PASSWORD_MAX_LENGTH, IS_INCORRECT_LENGTH_PASSWORD)
    .matches(PASSWORD_PATTERN, IS_INCORRECT_FORMAT_PASSWORD)
    .required(IS_REQUIRED_PASSWORD),
  confirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length) > 0,
    then: yup.string().oneOf([yup.ref("password")], PASSWORD_DOES_NOT_MATCH),
  }),
  passwordNoPattern: yup.string().required(IS_REQUIRED_PASSWORD),
  name: yup
    .string()
    .min(USERNAME_MIN_LENGTH, IS_INCORRECT_LENGTH_USERNAME)
    .max(USERNAME_MAX_LENGTH, IS_INCORRECT_LENGTH_USERNAME)
    .required(IS_REQUIRED_USERNAME),
  phone: yup.string().phone().required(),
  title: yup
    .string()
    .min(TITLE_MIN_LENGTH, IS_INCORRECT_LENGTH_TITLE)
    .max(TITLE_MAX_LENGTH, IS_INCORRECT_LENGTH_TITLE)
    .required(IS_REQUIRED_TITLE),
  description: yup
    .string()
    .max(DESCRIPTION_MAX_LENGTH, IS_INCORRECT_LENGTH_DESCRIPTION),
  members: yup.array().test("uniqueValues", IS_EMAIL_UNIQUE, uniqueValues),
  summary: yup
    .string()
    .required()
    .min(SUMMARY_MIN_LENGTH, IS_INCORRECT_LENGTH_SUMMARY)
    .max(SUMMARY_MAX_LENGTH, IS_INCORRECT_LENGTH_SUMMARY),
  keyword: yup.string().min(KEYWORD_MIN_LENGTH, IS_INCORRECT_LENGTH_KEYWORD),
  column: yup
    .string()
    .required()
    .min(COLUMN_MIN_LENGTH, IS_INCORRECT_LENGTH_COLUMN)
    .max(COLUMN_MAX_LENGTH, IS_INCORRECT_LENGTH_COLUMN),
  workLogComment: yup
    .string()
    .min(WORK_LOG_COMMENT_MIN_LENGTH, IS_INCORRECT_WORK_LOG_COMMENT)
    .max(WORK_LOG_COMMENT_MAX_LENGTH, IS_INCORRECT_WORK_LOG_COMMENT),
};

export default validationSchemas;