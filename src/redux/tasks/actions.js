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
} from "./actionTypes";

export const getListTasks = (model) => {
  return {
    payload: { model },
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
export const getTaskDetails = (taskId) => {
  return {
    payload: { taskId },
    type: GET_TASK,
  };
};

export const getTaskSuccess = (data) => {
  return {
    payload: data,
    type: GET_TASK_SUCCESS,
  };
};

export const getTaskError = ({ message = "Unknown error" }) => {
  return {
    payload: { message },
    type: GET_TASK_ERROR,
  };
};

export const clearTaskDetails = () => {
  return {
    type: GET_TASK_CLEAR,
  };
};

export const getTaskFiles = (model) => {
  return {
    payload: { model },
    type: GET_TASKS_FILES,
  };
};
export const getTaskFilesSuccess = (data) => {
  return {
    payload: data,
    type: GET_TASKS_FILES_SUCCESS,
  };
};
export const getTaskFilesError = ({ message }) => {
  return {
    payload: { message },
    type: GET_TASKS_FILES_ERROR,
  };
};
export const clearTaskFiles = () => {
  return {
    type: GET_TASKS_FILES_CLEAR,
  };
};

export const editTask = (model) => {
  return {
    type: EDIT_TASK,
    payload: { model },
  };
};

export const editTaskSuccess = (board) => {
  return {
    type: EDIT_TASK_SUCCESS,
    payload: board,
  };
};

export const editTaskError = ({ message }) => ({
  type: EDIT_TASK_ERROR,
  payload: { message },
});
