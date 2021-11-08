import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_ALL_LOGS } from "./actionTypes";

import { getAllLogsSuccess, getAllLogsError } from "./actions";

import ReportsService from "../../services/ReportsService";
import ToastrService from "../../services/ToastrService";

const getAllLogsAsync = async (model) => {
  return await ReportsService.getWorkLogs(model);
};

function* getAllLogs({ payload: { model } }) {
  try {
    const response = yield call(getAllLogsAsync, model);
    yield put(getAllLogsSuccess(response));
  } catch (error) {
    yield put(getAllLogsError(error));
    ToastrService.error(error.message);
  }
}

export function* watchGetAllLogs() {
  yield takeEvery(GET_ALL_LOGS, getAllLogs);
}

function* reportsLog() {
  yield all([, fork(watchGetAllLogs)]);
}

export default reportsLog;
