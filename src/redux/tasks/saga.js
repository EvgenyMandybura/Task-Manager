import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { CREATE_TASK, GET_TASKS } from "./actionTypes";

import {
  getListTasksSuccess,
  getListTasksError,
  createTaskSuccess,
  createTaskError,
} from "./actions";

import ToastrService from "../../services/ToastrService";
import TasksService from "../../services/TasksService";

const getTasksListAsync = async (boardId) => {
  return await TasksService.getAllList(boardId);
};

const createTaskAsync = async (model) => {
  return await TasksService.createTask(model);
};

function* getTasksList({ payload: boardId }) {
  try {
    const response = yield call(getTasksListAsync, boardId);
    yield put(getListTasksSuccess(response));
  } catch (error) {
    yield put(getListTasksError(error));
  }
}

function* createNewTask({ payload: { model } }) {
  try {
    const response = yield call(createTaskAsync, model);
    console.log("response in sagas", response);
    yield put(createTaskSuccess(response));
    if (response) {
      model.history.push(`/board-details/${response}`);
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(createTaskError());
  }
}

export function* watchGetAllTasks() {
  yield takeEvery(GET_TASKS, getTasksList);
}

export function* watchCreateNewTask() {
  yield takeEvery(CREATE_TASK, createNewTask);
}

function* tasksState() {
  yield all([fork(watchGetAllTasks), fork(watchCreateNewTask)]);
}

export default tasksState;
