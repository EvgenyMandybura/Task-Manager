import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
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

//Phone
export const IS_INCORRECT_PHONE = "Phone number is not valid";

//Title
export const IS_REQUIRED_TITLE = "Title is required";
export const IS_INCORRECT_LENGTH_TITLE = `Title must be from ${TITLE_MIN_LENGTH} to ${TITLE_MAX_LENGTH} symbols;`;

//Description
export const IS_INCORRECT_LENGTH_DESCRIPTION = `Description must be less ${DESCRIPTION_MAX_LENGTH} symbols;`;
