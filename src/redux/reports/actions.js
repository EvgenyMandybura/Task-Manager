import {
  GET_ALL_LOGS,
  GET_ALL_LOGS_SUCCESS,
  GET_ALL_LOGS_ERROR,
  ALL_LOGS__CLEAR,
} from "./actionTypes";

export const getAllLogs = (model) => {
  return {
    payload: { model },
    type: GET_ALL_LOGS,
  };
};
export const getAllLogsSuccess = (data) => {
  return {
    payload: { data },
    type: GET_ALL_LOGS_SUCCESS,
  };
};
export const getAllLogsError = ({ message }) => {
  return {
    payload: { message },
    type: GET_ALL_LOGS_ERROR,
  };
};

export const allLogsClear = () => {
  return {
    type: ALL_LOGS__CLEAR,
  };
};
