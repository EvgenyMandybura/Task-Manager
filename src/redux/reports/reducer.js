import {
  GET_ALL_LOGS,
  GET_ALL_LOGS_SUCCESS,
  GET_ALL_LOGS_ERROR,
  ALL_LOGS__CLEAR,
  SET_FILTERED_DATE,
  SET_FILTERED_DATE_SUCCESS,
  SET_FILTERED_DATE_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  loading: false,
  workLogs: [],
  filterDateLoading: false,
  dateRange: [],
  filterDateArray: [],
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
    case SET_FILTERED_DATE:
      state = {
        ...state,
        filterDateLoading: true,
      };
      break;

    case SET_FILTERED_DATE_SUCCESS:
      state = {
        ...state,
        dateRange: action.payload.data.dateRange,
        filterDateArray: action.payload.data.dateArrayTemp,
        filterDateLoading: false,
      };
      break;
    case SET_FILTERED_DATE_ERROR:
      state = {
        ...state,
        filterDateLoading: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default reports;
