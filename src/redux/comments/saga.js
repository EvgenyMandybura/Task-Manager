import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getTaskCommentsSuccess,
  getTaskCommentsError,
  createCommentError,
  createCommentSuccess,
} from "./actions";

import { ADD_COMMENT, GET_TASK_COMMENTS } from "./actionTypes";
import ToastrService from "../../services/ToastrService";
import TaskService from "../../services/TasksService";

const createCommentAsync = async (model) => {
  return await TaskService.addComment(model);
};

const getTaskCommentsAsync = async (model) => {
  return await TaskService.getComments(model);
};

function* createComment({ payload: model }) {
  try {
    const response = yield call(createCommentAsync, model);
    yield put(createCommentSuccess(response));
    ToastrService.success("Comment added");
  } catch (error) {
    yield put(createCommentError(error));
    ToastrService.success(error.message);
  }
}

function* getTaskComments({ payload: { model } }) {
  try {
    const response = yield call(getTaskCommentsAsync, model);
    yield put(getTaskCommentsSuccess(response));
  } catch (error) {
    yield put(getTaskCommentsError(error));
  }
}

export function* watchCommentsProduct() {
  yield takeEvery(ADD_COMMENT, createComment);
}

export function* watchGetCommentsProduct() {
  yield takeEvery(GET_TASK_COMMENTS, getTaskComments);
}

function* commentsSaga() {
  yield all([fork(watchCommentsProduct), fork(watchGetCommentsProduct)]);
}

export default commentsSaga;
