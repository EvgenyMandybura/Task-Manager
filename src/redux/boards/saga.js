import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { CREATE_BOARD, GET_BOARD } from "./actionTypes";

import {
  createProductSuccess,
  createBoardError,
  getBoardSuccess,
  getBoardError,
} from "./actions";

import ToastrService from "../../services/ToastrService";
import BoardsService from "../../services/BoardsService";

const createBoardAsync = async (model) => {
  return await BoardsService.createBoard(model);
};

const getBoardAsync = async (boadrId) => {
  return await BoardsService.getBoard(boadrId);
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

function* getBoard({ payload: { boardId } }) {
  try {
    const response = yield call(getBoardAsync, boardId);
    yield put(getBoardSuccess(response));
  } catch (error) {
    yield put(getBoardError(error));
  }
}

export function* watchCreateBoard() {
  yield takeEvery(CREATE_BOARD, createBoardProject);
}

export function* watchGetBoard() {
  yield takeEvery(GET_BOARD, getBoard);
}

function* authBoards() {
  yield all([fork(watchCreateBoard), fork(watchGetBoard)]);
}

export default authBoards;
