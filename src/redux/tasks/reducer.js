import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_CLEAR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  loading: false,
  board: null,
  tasksList: [],
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

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default tasks;
