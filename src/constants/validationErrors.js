import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  SUMMARY_MIN_LENGTH,
  SUMMARY_MAX_LENGTH,
  TASK_DESCRIPTION_MAX_LENGTH,
  KEYWORD_MIN_LENGTH,
} from "./validationRules";

// EMAIL
export const IS_INVALID_EMAIL = "Email address is invalid";
export const IS_REQUIRED_EMAIL = "Email address is required";
export const IS_EMAIL_UNIQUE = "Emails must be unique";

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

//Summary
export const IS_INCORRECT_LENGTH_SUMMARY = `Summary must be from ${SUMMARY_MIN_LENGTH} to ${SUMMARY_MAX_LENGTH} symbols;`;

//taskDescription
export const IS_INCORRECT_LENGTH_TASK_DESCRIPTION = `Description must be less ${TASK_DESCRIPTION_MAX_LENGTH} symbols;`;

//Keyword
export const IS_INCORRECT_LENGTH_KEYWORD = `Keyword must be more ${KEYWORD_MIN_LENGTH} symbols;`;
