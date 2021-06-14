import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import TasksService from "../../services/TasksService";
import { createCommentError, createCommentSuccess } from "./actions";

import { ADD_COMMENT } from "./actionTypes";
import ToastrService from "../../services/ToastrService";
import TaskService from "../../services/TasksService";

const createCommentAsync = async (model) => {
  return await TaskService.addComment(model);
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
export function* watchCommentsProduct() {
  yield takeEvery(ADD_COMMENT, createComment);
}

function* commentsSaga() {
  yield all([fork(watchCommentsProduct)]);
}

export default commentsSaga;
