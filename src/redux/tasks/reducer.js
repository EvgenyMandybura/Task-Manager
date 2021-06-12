import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_CLEAR,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  SEARCH_TASKS,
  SEARCH_TASKS_SUCCESS,
  SEARCH_TASKS_ERROR,
  FILTER_TASKS,
  FILTER_TASKS_SUCCESS,
  FILTER_TASKS_ERROR,
  GET_TASK,
  GET_TASK_SUCCESS,
  GET_TASK_CLEAR,
  GET_TASK_ERROR,
  GET_TASKS_FILES,
  GET_TASKS_FILES_SUCCESS,
  GET_TASKS_FILES_ERROR,
  GET_TASKS_FILES_CLEAR,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  GET_ACTIVITIES_LOG,
  GET_ACTIVITIES_LOG_SUCCESS,
  GET_ACTIVITIES_LOG_CLEAR,
  GET_ACTIVITIES_LOG_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  loading: false,
  activityLoaded: false,
  loadingFiles: false,
  files: {},
  board: null,
  tasksList: [],
  task: {},
  created: {},
  taskStatus: "",
  activitiesLog: [],
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_TASKS_SUCCESS:
      state = {
        ...state,
        tasksList: action.payload,
        loading: false,
      };
      break;
    case GET_TASKS_CLEAR:
      state = {
        ...state,
        loading: false,
        tasksList: [],
      };
      break;
    case GET_TASKS_ERROR:
      state = {
        ...state,
        data: [],
        error: "",
      };
      break;
    case CREATE_TASK:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CREATE_TASK_SUCCESS:
      state = {
        ...state,
        created: action.payload,
        loading: false,
      };
      break;
    case CREATE_TASK_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case SEARCH_TASKS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SEARCH_TASKS_SUCCESS:
      state = {
        ...state,
        tasksList: action.payload,
        loading: false,
      };
      break;
    case SEARCH_TASKS_ERROR:
      state = {
        ...state,
        data: [],
        error: "",
      };
    case FILTER_TASKS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FILTER_TASKS_SUCCESS:
      state = {
        ...state,
        tasksList: action.payload,
        loading: false,
      };
      break;
    case FILTER_TASKS_ERROR:
      state = {
        ...state,
        data: [],
        error: "",
      };
    case GET_TASK:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_TASK_SUCCESS:
      state = {
        ...state,
        task: action.payload,
        loading: false,
      };
      break;
    case GET_TASK_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_TASK_CLEAR:
      state = {
        ...state,
        task: null,
        loading: false,
      };
    case GET_TASKS_FILES:
      state = {
        ...state,
        loadingFiles: true,
      };
      break;
    case GET_TASKS_FILES_SUCCESS:
      state = {
        ...state,
        files: action.payload,
        loadingFiles: false,
      };
      break;
    case GET_TASKS_FILES_CLEAR:
      state = {
        ...state,
        loadingFiles: false,
        files: [],
      };
      break;
    case GET_TASKS_FILES_ERROR:
      state = {
        ...state,
        files: [],
        error: "",
      };
      break;
    case EDIT_TASK:
      state = {
        ...state,
        loading: true,
      };
      break;
    case EDIT_TASK_SUCCESS:
      state = {
        ...state,
        taskStatus: action.payload.taskStatus,
        loading: false,
      };
      break;
    case EDIT_TASK_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_ACTIVITIES_LOG:
      state = {
        ...state,
        activityLoaded: true,
      };
      break;
    case GET_ACTIVITIES_LOG_SUCCESS:
      state = {
        ...state,
        activitiesLog: action.payload,
        activityLoaded: false,
      };
      break;
    case GET_ACTIVITIES_LOG_CLEAR:
      state = {
        ...state,
        activityLoaded: false,
        activitiesLog: [],
      };
      break;
    case GET_ACTIVITIES_LOG_ERROR:
      state = {
        ...state,
        activitiesLog: [],
        error: "",
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default tasks;
