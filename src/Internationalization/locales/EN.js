import {
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  SUMMARY_MIN_LENGTH,
  SUMMARY_MAX_LENGTH,
  TASK_DESCRIPTION_MAX_LENGTH,
  KEYWORD_MIN_LENGTH,
  COLUMN_MIN_LENGTH,
  COLUMN_MAX_LENGTH,
  WORK_LOG_COMMENT_MIN_LENGTH,
  WORK_LOG_COMMENT_MAX_LENGTH,
} from "../../constants/validationRules";

export const TranslationEN = {
  validationErrors: {
    IS_INVALID_EMAIL: "Email address is invalid",
    IS_REQUIRED_EMAIL: "Email address is required",
    IS_EMAIL_UNIQUE: "Emails must be unique",
    IS_REQUIRED_PASSWORD: "Password is required",
    IS_INCORRECT_LENGTH_PASSWORD: `Password must be from ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} symbols`,
    IS_INCORRECT_FORMAT_PASSWORD:
      "Password should contain at least 1 letter and 1 digit",
    PASSWORD_DOES_NOT_MATCH: "Passwords should match",
    IS_REQUIRED_USERNAME: "Username is required",
    IS_INCORRECT_LENGTH_USERNAME: `Username must be from ${USERNAME_MIN_LENGTH} to ${USERNAME_MAX_LENGTH} symbols;`,
    IS_INCORRECT_PHONE: "Phone number is not valid",
    IS_REQUIRED_TITLE: "Title is required",
    IS_INCORRECT_LENGTH_TITLE: `Title must be from ${TITLE_MIN_LENGTH} to ${TITLE_MAX_LENGTH} symbols;`,

    IS_INCORRECT_LENGTH_DESCRIPTION: `Description must be less ${DESCRIPTION_MAX_LENGTH} symbols;`,
    IS_INCORRECT_LENGTH_SUMMARY: `Summary must be from ${SUMMARY_MIN_LENGTH} to ${SUMMARY_MAX_LENGTH} symbols;`,
    IS_INCORRECT_LENGTH_TASK_DESCRIPTION: `Description must be less ${TASK_DESCRIPTION_MAX_LENGTH} symbols;`,
    IS_INCORRECT_LENGTH_KEYWORD: `Keyword must be more ${KEYWORD_MIN_LENGTH} symbols;`,
    IS_INCORRECT_LENGTH_COLUMN: `Summary must be from ${COLUMN_MIN_LENGTH} to ${COLUMN_MAX_LENGTH} symbols;`,
    IS_INCORRECT_WORK_LOG_COMMENT: `Summary must be from ${WORK_LOG_COMMENT_MIN_LENGTH} to ${WORK_LOG_COMMENT_MAX_LENGTH} symbols;`,
    IS_INCORRECT_LOGGED_TIME: `Data must be in "3w 5d 10h 30m" format`,
    FINISH_DATE_IS_INCORRECT: "Finish Date must be greater than Start Date",
    DATE_RANGE_IS_INCORRECT: "The date range must be less than 31 days.",
  },
  logIn: {
    logInTaskManager: "Log in Task Manager",
    enterEmail: "Enter email",
    enterPassword: "Enter password",
    signIn: "Sign In",
    dontHaveAccount: "Don't have an account? Sign Up",
  },
  signUp: {
    signUp: "Sign up",
    selectFile: "Select file",
    firstNameLabel: "first name",
    firstNamePlaceholder: "Enter first name",
    lastNameLabel: "last name",
    lastNamePlaceholder: "Enter last name",
    descriptionLabel: "description",
    descriptionPlaceholder: "Enter description",
    phoneLabel: "phone",
    phonePlaceholder: "Enter phone",
    emailLabel: "Email address",
    emailPlaceholder: "Enter email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter Password",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm Password",
    continue: "Continue",
    haveAccount: "Already have an account? Sign In",
  },
  header: {
    hideMenu: "Hide Menu",
    showMenu: "Show menu",
    profile: "Profile",
    logOut: "Log out",
  },
  boards: {
    addNewBoard: "Add New Board",
    edit: "Edit",
    leaveBoard: "Leave board",
    noBoards: "No boards",
    leaveBoardTitle: "Leave board",
    doYouWantToLeaveBoard: "Do you want to leave board?",
    cancelButtonText: "Cancel",
    confirmButtonText: "Leave",
  },
  subMenu: {
    boards: "Boards",
    reports: "Reports",
    profile: "Profile",
  },
  tabForPage: {
    activitiesLog: "Activities log",
    comments: "Comments",
    workLogs: "WorkLogs",
  },
  createNewBoard: {
    createNewBoard: "Create new Board",
    selectFile: "Select file",
    titleLabel: "title",
    titlePlaceholder: "Add title",
    descriptionLabel: "description",
    descriptionPlaceholder: "Add description",
    inviteMembers: "Invite members",
    listOfMembers: "List of members:",
    continue: "Continue",
  },

  addMembersForm: {
    label: "member",
    placeholder: "Add member by email",
    addMember: "Add member",
    saveChanges: "Save changes",
  },
  addMemberModalDialog: {
    listOfMembers: "List of members:",
    returnToBoard: "Return to board",
  },
  editBoardDetailsForm: {
    editBoard: "Edit Board",
    selectFile: "Select file",
    titleLabel: "title",
    titlePlaceholder: "Edit title",
    descriptionLabel: "description",
    descriptionPlaceholder: "Edit description",
    inviteEditMembers: "Invite / Edit members",
    continue: "Continue",
  },
  leaveCommentForm: {
    placeholder: "Add comment",
    comment: "Comment",
  },
  addNewTaskForm: {
    addNewTask: "Add new task",
    noImages: "No images",
    selectFile: "Select file",
    labelSummary: "Summary",
    placeholderSummary: "Add summary",
    labelDescription: "Description",
    placeholderDescription: "Add description",
    labelAssignee: "Add assignee",
    placeholderAssignee: "Select assignee",
    labelDate: "Set Due date:    ",
    addTask: "Add task",
  },
  changeTaskForm: {
    saveChanges: " Save Changes",
    labelSummary: "Summary",
    placeholderSummary: "Add summary",
    labelDescription: "Description",
    placeholderDescription: "Add description",
    labelAssignee: "Add assignee",
    placeholderAssignee: "Select assignee",
    labelDate: "Set Due date:    ",
    status: "Status",
    taskDescription: "Task description:",
  },
  changeTaskStatusForm: {
    buttonText: "Change",
  },
  filterForm: {
    label: "Select status",
    placeholder: "Select status",
    labelAssignee: "Add assignee",
    placeholderAssignee: "Select assignee",
    filter: "Filter",
  },
  filterReportsByDate: {
    labelStartDate: "Set start date: ",
    labelFinishDate: "Set finish date:    ",
    filter: "Filter",
  },
  search: {
    placeholder: "Search tasks",
    search: "Search",
  },
  sort: {
    label: "Sort",
    placeholder: "Sort",
    sort: "Sort",
  },
  boardDetails: {
    gridView: "Grid view",
    listView: "List view",
    addNewTask: "Add New Task",
    description: "Description",
  },
};
