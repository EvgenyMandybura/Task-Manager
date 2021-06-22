import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_BOARD,
  GET_BOARD,
  GET_BOARDS,
  EDIT_BOARD,
  LEAVE_BOARD,
  CHANGE_STATUSES,
} from "./actionTypes";

import {
  createProductSuccess,
  createBoardError,
  getBoardSuccess,
  getBoardError,
  getListBoardsSuccess,
  getListBoardsError,
  editBoardSuccess,
  editBoardError,
  leaveBoardSuccess,
  leaveBoardError,
  changeStatusesSuccess,
  changeStatusesError,
} from "./actions";

import ToastrService from "../../services/ToastrService";
import BoardsService from "../../services/BoardsService";

const createBoardAsync = async (model) => {
  const response = await BoardsService.checkUniqueMembers(model.values);
  if (response) {
    return await BoardsService.createBoard(model);
  }
};

const createEditAsync = async (model) => {
  const response = await BoardsService.checkUniqueMembers(model.values);
  if (response) {
    return await BoardsService.editBoard(model);
  }
};

const getBoardAsync = async (boadrId) => {
  return await BoardsService.getBoard(boadrId);
};

const getBoardsListAsync = async () => {
  return await BoardsService.getAllList();
};

const leaveBoardAsync = async (boardId) => {
  return await BoardsService.leaveBoard(boardId);
};

const changeStatusesAsync = async (model) => {
  return await BoardsService.changeStatuses(model);
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

function* editBoardProject({ payload: { model } }) {
  try {
    const response = yield call(createEditAsync, model);
    yield put(editBoardSuccess(response));
    if (response) {
      model.history.push(`/board-details/${response}`);
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(editBoardError());
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

function* getBoardsList() {
  try {
    const response = yield call(getBoardsListAsync);
    yield put(getListBoardsSuccess(response));
  } catch (error) {
    yield put(getListBoardsError(error));
  }
}

function* leaveBoardProject({ payload: { boardId } }) {
  try {
    const response = yield call(leaveBoardAsync, boardId);
    yield put(leaveBoardSuccess(response));
  } catch (error) {
    yield put(leaveBoardError(error));
  }
}

function* changeBoardStatuses({ payload: { model } }) {
  try {
    const response = yield call(changeStatusesAsync, model);
    yield put(changeStatusesSuccess(response));
  } catch (error) {
    yield put(changeStatusesError(error));
  }
}

export function* watchCreateBoard() {
  yield takeEvery(CREATE_BOARD, createBoardProject);
}

export function* watchEditBoard() {
  yield takeEvery(EDIT_BOARD, editBoardProject);
}

export function* watchGetBoard() {
  yield takeEvery(GET_BOARD, getBoard);
}

export function* watchGetAllBoards() {
  yield takeEvery(GET_BOARDS, getBoardsList);
}

export function* watchLeaveBoard() {
  yield takeEvery(LEAVE_BOARD, leaveBoardProject);
}

export function* watchChangeStatuses() {
  yield takeEvery(CHANGE_STATUSES, changeBoardStatuses);
}

function* authBoards() {
  yield all([
    fork(watchCreateBoard),
    fork(watchGetBoard),
    fork(watchGetAllBoards),
    fork(watchEditBoard),
    fork(watchLeaveBoard),
    fork(watchChangeStatuses),
  ]);
}

export default authBoards;
