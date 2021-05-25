import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { CREATE_BOARD } from "./actionTypes";

import { createProductSuccess, createBoardError } from "./actions";

import ToastrService from "../../services/ToastrService";
import BoardsService from "../../services/BoardsService";

const createBoardAsync = async (model) => {
  return await BoardsService.createBoard(model);
};

function* createBoardProject({ payload: { model } }) {
  try {
    const response = yield call(createBoardAsync, model);
    yield put(createProductSuccess(response));
    if (response) {
      model.history.push(`/board-details/${response}`);
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(createBoardError());
  }
}

export function* watchUserLoginFB() {
  yield takeEvery(CREATE_BOARD, createBoardProject);
}

function* authBoards() {
  yield all([fork(watchUserLoginFB)]);
}

export default authBoards;
