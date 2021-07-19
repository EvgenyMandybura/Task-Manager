import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_TASK,
  GET_TASKS,
  SEARCH_TASKS,
  FILTER_TASKS,
  GET_TASK,
  GET_TASKS_FILES,
  EDIT_TASK,
  GET_ACTIVITIES_LOG,
} from "./actionTypes";

import {
  getListTasksSuccess,
  getListTasksError,
  createTaskSuccess,
  createTaskError,
  searchTasksSuccess,
  searchTasksError,
  filterTasksSuccess,
  filterTasksError,
  getTaskSuccess,
  getTaskError,
  getTaskFilesSuccess,
  getTaskFilesError,
  editTaskSuccess,
  editTaskError,
  getActivitiesLogSuccess,
  getActivitiesLogError,
} from "./actions";

import ToastrService from "../../services/ToastrService";
import TasksService from "../../services/TasksService";

const getTasksListAsync = async (model) => {
  return await TasksService.getAllList(model);
};

const createTaskAsync = async (model) => {
  return await TasksService.createTask(model);
};

const searchTasksListAsync = async (data) => {
  return await TasksService.searchTasks(data);
};

const filterTasksListAsync = async (data) => {
  return await TasksService.filterTasks(data);
};

const getTaskAsync = async (taskId) => {
  return await TasksService.getTask(taskId);
};

const getTaskFilesAsync = async (model) => {
  return await TasksService.getFiles(model);
};

const editTaskAsync = async (model) => {
  return await TasksService.editTask(model);
};

const getActivityLogAsync = async (taskId) => {
  return await TasksService.getActivityLog(taskId);
};

function* getTasksList({ payload: { model } }) {
  try {
    const response = yield call(getTasksListAsync, model);
    yield put(getListTasksSuccess(response));
  } catch (error) {
    yield put(getListTasksError(error));
  }
}

function* createNewTask({ payload: { model } }) {
  try {
    const response = yield call(createTaskAsync, model);
    yield put(createTaskSuccess(response));
    if (response) {
      model.history.push(`/board-details/${response}`);
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(createTaskError());
  }
}

function* searchBoardTasks({ payload: data }) {
  try {
    const response = yield call(searchTasksListAsync, data);
    yield put(searchTasksSuccess(response));
  } catch (error) {
    yield put(searchTasksError(error));
  }
}

function* filterBoardTasks({ payload: data }) {
  try {
    const response = yield call(filterTasksListAsync, data);
    yield put(filterTasksSuccess(response));
  } catch (error) {
    yield put(filterTasksError(error));
  }
}

function* getTaskDetail({ payload: { taskId } }) {
  try {
    const response = yield call(getTaskAsync, taskId);
    yield put(getTaskSuccess(response));
  } catch (error) {
    yield put(getTaskError(error));
  }
}

function* getTaskFiles({ payload: { model } }) {
  try {
    const response = yield call(getTaskFilesAsync, model);
    yield put(getTaskFilesSuccess(response));
  } catch (error) {
    yield put(getTaskFilesError(error));
  }
}

function* editTask({ payload: { model } }) {
  try {
    const response = yield call(editTaskAsync, model);
    yield put(editTaskSuccess(response));
    if (response) {
      model.history.push(`/task-details/${response.taskId}`);
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(editTaskError(error));
  }
}

function* getTaskActivityLog({ payload: { taskId } }) {
  try {
    const response = yield call(getActivityLogAsync, taskId);
    yield put(getActivitiesLogSuccess(response));
  } catch (error) {
    yield put(getActivitiesLogError(error));
  }
}

export function* watchGetAllTasks() {
  yield takeEvery(GET_TASKS, getTasksList);
}

export function* watchCreateNewTask() {
  yield takeEvery(CREATE_TASK, createNewTask);
}

export function* watchSearchTasks() {
  yield takeEvery(SEARCH_TASKS, searchBoardTasks);
}

export function* watchFilterTasks() {
  yield takeEvery(FILTER_TASKS, filterBoardTasks);
}

export function* watchGetTask() {
  yield takeEvery(GET_TASK, getTaskDetail);
}

export function* watchGetTaskFiles() {
  yield takeEvery(GET_TASKS_FILES, getTaskFiles);
}

export function* watchEditTask() {
  yield takeEvery(EDIT_TASK, editTask);
}

export function* watchGetActivityLog() {
  yield takeEvery(GET_ACTIVITIES_LOG, getTaskActivityLog);
}

function* tasksState() {
  yield all([
    fork(watchGetAllTasks),
    fork(watchCreateNewTask),
    fork(watchSearchTasks),
    fork(watchFilterTasks),
    fork(watchGetTask),
    fork(watchGetTaskFiles),
    fork(watchEditTask),
    fork(watchGetActivityLog),
  ]);
}

export default tasksState;
