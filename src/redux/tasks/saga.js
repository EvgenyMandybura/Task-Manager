import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_TASKS } from "./actionTypes";

import { getListTasksSuccess, getListTasksError } from "./actions";

import ToastrService from "../../services/ToastrService";
import TasksService from "../../services/TasksService";

const getTasksListAsync = async (boardId) => {
  return await TasksService.getAllList(boardId);
};

function* getTasksList({ payload: boardId }) {
  try {
    const response = yield call(getTasksListAsync, boardId);
    yield put(getListTasksSuccess(response));
  } catch (error) {
    yield put(getListTasksError(error));
  }
}

export function* watchGetAllTasks() {
  yield takeEvery(GET_TASKS, getTasksList);
}

function* tasksState() {
  yield all([fork(watchGetAllTasks)]);
}

export default tasksState;
