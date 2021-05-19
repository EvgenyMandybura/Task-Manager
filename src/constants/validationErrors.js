import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "./validationRules";

// EMAIL
export const IS_INVALID_EMAIL = "Email address is invalid";
export const IS_REQUIRED_EMAIL = "Email address is required";

// PASSWORD
export const IS_REQUIRED_PASSWORD = "Password is required";
export const IS_INCORRECT_LENGTH_PASSWORD = `Password must be from ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} symbols`;
export const IS_INCORRECT_FORMAT_PASSWORD =
  "Password should contain at least 1 letter and 1 digit";
export const PASSWORD_DOES_NOT_MATCH = "Passwords should match";

// USERNAME
export const IS_REQUIRED_USERNAME = "Username is required";
export const IS_INCORRECT_LENGTH_USERNAME = `Username must be from ${USERNAME_MIN_LENGTH} to ${USERNAME_MAX_LENGTH} symbols;`;
export const IS_INCORRECT_CASE_USERNAME =
  "Username can contain only small letters";
export const IS_INCORRECT_FORMAT_USERNAME =
  "Username can contain only letters, digits and underscores";
export const IS_INCORRECT_USERNAME = "Username is invalid";
export const IS_INCORRECT_UNDERSCORE_USERNAME =
  "Username can’t contain 2 underscores in a row";

//Phone
export const IS_INCORRECT_PHONE = "Phone number is not valid";
