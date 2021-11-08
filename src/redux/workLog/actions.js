import {
  ADD_WORK_LOG,
  ADD_WORK_LOG_SUCCESS,
  ADD_WORK_LOG_ERROR,
  GET_LOG_WORK_DATA,
  GET_LOG_WORK_DATA_SUCCESS,
  GET_LOG_WORK_DATA_ERROR,
} from "./actionTypes";

export const addWorkLog = (model) => {
  return {
    payload: { model },
    type: ADD_WORK_LOG,
  };
};
export const addWorkLogSuccess = (data) => {
  return {
    payload: data,
    type: ADD_WORK_LOG_SUCCESS,
  };
};
export const addWorkLogError = ({ message }) => {
  return {
    payload: { message },
    type: ADD_WORK_LOG_ERROR,
  };
};

export const getLogWorksData = (model) => {
  return {
    payload: { model },
    type: GET_LOG_WORK_DATA,
  };
};
export const getLogWorksDataSuccess = (data) => {
  return {
    payload: { data },
    type: GET_LOG_WORK_DATA_SUCCESS,
  };
};
export const getLogWorksDataError = ({ message }) => {
  return {
    payload: { message },
    type: GET_LOG_WORK_DATA_ERROR,
  };
};
