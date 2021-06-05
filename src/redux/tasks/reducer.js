import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_CLEAR,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  loading: false,
  board: null,
  tasksList: [],
  created: {},
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

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default tasks;
