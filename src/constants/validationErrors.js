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
  COLUMN_MIN_LENGTH,
  COLUMN_MAX_LENGTH,
  WORK_LOG_COMMENT_MAX_LENGTH,
  WORK_LOG_COMMENT_MIN_LENGTH,
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

//Column title
export const IS_INCORRECT_LENGTH_COLUMN = `Summary must be from ${COLUMN_MIN_LENGTH} to ${COLUMN_MAX_LENGTH} symbols;`;

//workLogComment
export const IS_INCORRECT_WORK_LOG_COMMENT = `Summary must be from ${WORK_LOG_COMMENT_MIN_LENGTH} to ${WORK_LOG_COMMENT_MAX_LENGTH} symbols;`;

//loggedTime
export const IS_INCORRECT_LOGGED_TIME = `Data must be in "3w 5d 10h 30m" format`;

//reportsFilter
export const FINISH_DATE_IS_INCORRECT =
  "Finish Date must be greater than Start Date";
export const DATE_RANGE_IS_INCORRECT =
  "The date range must be less than 31 days.";

export const WRONG_USER =
  "It is impossible to log the time, the task is attached to another user";
