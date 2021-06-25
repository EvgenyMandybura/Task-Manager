import {
  ADD_WORK_LOG,
  ADD_WORK_LOG_SUCCESS,
  ADD_WORK_LOG_ERROR,
  GET_LOG_WORK_DATA,
  GET_LOG_WORK_DATA_SUCCESS,
  GET_LOG_WORK_DATA_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  loadingWorkLog: false,
  workLogs: [],
  totalWorkLog: 0,
};

const workLogs = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORK_LOG:
      state = {
        ...state,
        loadingWorkLog: true,
      };
      break;
    case ADD_WORK_LOG_SUCCESS:
      state = {
        ...state,
        created: action.payload,
        loadingWorkLog: false,
      };
      break;
    case ADD_WORK_LOG_ERROR:
      state = {
        ...state,
        loadingWorkLog: false,
      };
      break;

    case GET_LOG_WORK_DATA:
      state = {
        ...state,
        loadingWorkLog: true,
      };
      break;
    case GET_LOG_WORK_DATA_SUCCESS:
      state = {
        ...state,
        workLogs: action.payload.data.workLogsList,
        totalWorkLog: action.payload.data.totalWorkLog,
        loadingWorkLog: false,
      };
      break;
    case GET_LOG_WORK_DATA_ERROR:
      state = {
        ...state,
        loadingWorkLog: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default workLogs;
