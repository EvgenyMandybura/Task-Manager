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

export const createTask = (model) => {
  return {
    type: CREATE_TASK,
    payload: { model },
  };
};

export const createTaskSuccess = (board) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: board,
  };
};

export const createTaskError = ({ message }) => ({
  type: CREATE_TASK_ERROR,
  payload: { message },
});

export const searchTasks = (data) => {
  return {
    payload: data,
    type: SEARCH_TASKS,
  };
};
export const searchTasksSuccess = (data) => {
  return {
    payload: data,
    type: SEARCH_TASKS_SUCCESS,
  };
};
export const searchTasksError = ({ message }) => {
  return {
    payload: { message },
    type: SEARCH_TASKS_ERROR,
  };
};

export const filterTasks = (data) => {
  return {
    payload: data,
    type: FILTER_TASKS,
  };
};
export const filterTasksSuccess = (data) => {
  return {
    payload: data,
    type: FILTER_TASKS_SUCCESS,
  };
};
export const filterTasksError = ({ message }) => {
  return {
    payload: { message },
    type: FILTER_TASKS_ERROR,
  };
};
