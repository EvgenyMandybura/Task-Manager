import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_CLEAR,
} from "./actionTypes";

export const getListTasks = (boardId) => {
  return {
    payload: { boardId },
    type: GET_TASKS,
  };
};
export const getListTasksSuccess = (data) => {
  return {
    payload: data,
    type: GET_TASKS_SUCCESS,
  };
};
export const getListTasksError = ({ message }) => {
  return {
    payload: { message },
    type: GET_TASKS_ERROR,
  };
};
export const getListTasksClear = () => {
  return {
    type: GET_TASKS_CLEAR,
  };
};
