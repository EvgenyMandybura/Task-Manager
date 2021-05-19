import * as yup from "yup";
import {
  IS_INCORRECT_CASE_USERNAME,
  IS_INCORRECT_FORMAT_PASSWORD,
  IS_INCORRECT_FORMAT_USERNAME,
  IS_INCORRECT_LENGTH_PASSWORD,
  IS_INCORRECT_LENGTH_USERNAME,
  IS_INCORRECT_UNDERSCORE_USERNAME,
  IS_INVALID_EMAIL,
  IS_REQUIRED_EMAIL,
  IS_REQUIRED_PASSWORD,
  IS_REQUIRED_USERNAME,
  IS_INCORRECT_PHONE,
} from "./validationErrors";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PHONE_PATTERN,
} from "./validationRules";

const falseCase = (value) => {
  return !!value ? value === value.toLowerCase() : true;
};
const falseUsernameFormat = (value) => {
  return !!value ? /^[a-zA-Z0-9_]+$/.test(value) : true;
};
const falseUnderscore = (value) => {
  return !!value ? /^(?!.*__.*)[a-z][a-z0-9_-]+$/.test(value) : true;
};

const validationSchemas = {
  email: yup.string().email(IS_INVALID_EMAIL).required(IS_REQUIRED_EMAIL),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, IS_INCORRECT_LENGTH_PASSWORD)
    .max(PASSWORD_MAX_LENGTH, IS_INCORRECT_LENGTH_PASSWORD)
    .matches(PASSWORD_PATTERN, IS_INCORRECT_FORMAT_PASSWORD)
    .required(IS_REQUIRED_PASSWORD),
  passwordNoPattern: yup.string().required(IS_REQUIRED_PASSWORD),
  name: yup
    .string()
    .test("false-case", IS_INCORRECT_CASE_USERNAME, falseCase)
    .test("false-format", IS_INCORRECT_FORMAT_USERNAME, falseUsernameFormat)
    .test("false-underscore", IS_INCORRECT_UNDERSCORE_USERNAME, falseUnderscore)
    .min(USERNAME_MIN_LENGTH, IS_INCORRECT_LENGTH_USERNAME)
    .max(USERNAME_MAX_LENGTH, IS_INCORRECT_LENGTH_USERNAME)
    .required(IS_REQUIRED_USERNAME),
  phone: yup
    .string()
      .matches(PHONE_PATTERN, IS_INCORRECT_PHONE),
};

export default validationSchemas;
