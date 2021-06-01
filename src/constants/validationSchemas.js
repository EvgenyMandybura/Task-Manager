import * as yup from "yup";
import {
  IS_INCORRECT_FORMAT_PASSWORD,
  IS_INCORRECT_LENGTH_PASSWORD,
  IS_INCORRECT_LENGTH_USERNAME,
  IS_INVALID_EMAIL,
  IS_REQUIRED_EMAIL,
  IS_REQUIRED_PASSWORD,
  IS_REQUIRED_USERNAME,
  IS_INCORRECT_PHONE,
  PASSWORD_DOES_NOT_MATCH,
  IS_REQUIRED_TITLE,
  IS_INCORRECT_LENGTH_TITLE,
  IS_INCORRECT_LENGTH_DESCRIPTION,
} from "./validationErrors";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PHONE_PATTERN,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "./validationRules";

const validationSchemas = {
  email: yup.string().email(IS_INVALID_EMAIL).required(IS_REQUIRED_EMAIL),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, IS_INCORRECT_LENGTH_PASSWORD)
    .max(PASSWORD_MAX_LENGTH, IS_INCORRECT_LENGTH_PASSWORD)
    .matches(PASSWORD_PATTERN, IS_INCORRECT_FORMAT_PASSWORD)
    .required(IS_REQUIRED_PASSWORD),
  confirmPassword: yup.string().when("password", {
    is: (val) => ((val && val.length) > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], PASSWORD_DOES_NOT_MATCH),
  }),
  passwordNoPattern: yup.string().required(IS_REQUIRED_PASSWORD),
  name: yup
    .string()
    .min(USERNAME_MIN_LENGTH, IS_INCORRECT_LENGTH_USERNAME)
    .max(USERNAME_MAX_LENGTH, IS_INCORRECT_LENGTH_USERNAME)
    .required(IS_REQUIRED_USERNAME),
  phone: yup.string().matches(PHONE_PATTERN, IS_INCORRECT_PHONE),
  title: yup
    .string()
    .min(TITLE_MIN_LENGTH, IS_INCORRECT_LENGTH_TITLE)
    .max(TITLE_MAX_LENGTH, IS_INCORRECT_LENGTH_TITLE)
    .required(IS_REQUIRED_TITLE),
  description: yup
    .string()
    .max(DESCRIPTION_MAX_LENGTH, IS_INCORRECT_LENGTH_DESCRIPTION),
};

export default validationSchemas;
