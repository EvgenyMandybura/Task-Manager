import {
  GET_ALL_LOGS,
  GET_ALL_LOGS_SUCCESS,
  GET_ALL_LOGS_ERROR,
  ALL_LOGS__CLEAR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  loading: false,
  workLogs: [],
};

const reports = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOGS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_ALL_LOGS_SUCCESS:
      state = {
        ...state,
        workLogs: action.payload.data,
        loading: false,
      };
      break;
    case GET_ALL_LOGS_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ALL_LOGS__CLEAR:
      state = {
        ...initialState,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default reports;
