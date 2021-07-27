import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_ALL_LOGS, SET_FILTERED_DATE } from "./actionTypes";

import {
  getAllLogsSuccess,
  getAllLogsError,
  setFilterDatesSuccess,
  setFilterDatesError,
} from "./actions";

import ReportsService from "../../services/ReportsService";
import ToastrService from "../../services/ToastrService";

const getAllLogsAsync = async (model) => {
  return await ReportsService.getWorkLogs(model);
};

const setFilterDatesAsync = async (model) => {
  return await ReportsService.setFilterDates(model);
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

function* setFilterDate({ payload: { model } }) {
  try {
    const response = yield call(setFilterDatesAsync, model);
    yield put(setFilterDatesSuccess(response));
  } catch (error) {
    yield put(setFilterDatesError(error));
    ToastrService.error(error.message);
  }
}

export function* watchGetAllLogs() {
  yield takeEvery(GET_ALL_LOGS, getAllLogs);
}

export function* watchSetFilterDates() {
  yield takeEvery(SET_FILTERED_DATE, setFilterDate);
}

function* reportsLog() {
  yield all([fork(watchGetAllLogs), fork(watchSetFilterDates)]);
}

export default reportsLog;
