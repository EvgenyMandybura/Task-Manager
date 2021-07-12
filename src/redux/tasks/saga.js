import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_TASK,
  GET_TASKS,
  SEARCH_TASKS,
  FILTER_TASKS,
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

function* tasksState() {
  yield all([
    fork(watchGetAllTasks),
    fork(watchCreateNewTask),
    fork(watchSearchTasks),
    fork(watchFilterTasks),
  ]);
}

export default tasksState;
