import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_BOARD,
  GET_BOARD,
  GET_BOARDS,
  EDIT_BOARD,
  LEAVE_BOARD,
  CHANGE_STATUSES,
  DELETE_STATUSES,
  RENAME_STATUS,
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
  deleteStatusSuccess,
  deleteStatusError,
  renameStatusSuccess,
  renameStatusError,
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

const deleteStatusesAsync = async (model) => {
  return await BoardsService.deleteStatuses(model);
};

const renameStatusAsync = async (model) => {
  return await BoardsService.renameStatus(model);
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

function* getBoard({ payload: { model } }) {
  try {
    const response = yield call(getBoardAsync, model.boardId);
    if (response === "No such document!") {
      model.history.push(`/boards`);
    }
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

function* deleteBoardStatuses({ payload: { model } }) {
  try {
    const response = yield call(deleteStatusesAsync, model);
    yield put(deleteStatusSuccess(response));
  } catch (error) {
    yield put(deleteStatusError(error));
  }
}

function* renameBoardStatus({ payload: { model } }) {
  try {
    const response = yield call(renameStatusAsync, model);
    yield put(renameStatusSuccess(response));
  } catch (error) {
    yield put(renameStatusSuccess(error));
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

export function* watchDeleteStatuses() {
  yield takeEvery(DELETE_STATUSES, deleteBoardStatuses);
}

export function* watchRenameStatus() {
  yield takeEvery(RENAME_STATUS, renameBoardStatus);
}

function* authBoards() {
  yield all([
    fork(watchCreateBoard),
    fork(watchGetBoard),
    fork(watchGetAllBoards),
    fork(watchEditBoard),
    fork(watchLeaveBoard),
    fork(watchChangeStatuses),
    fork(watchDeleteStatuses),
    fork(watchRenameStatus),
  ]);
}

export default authBoards;
