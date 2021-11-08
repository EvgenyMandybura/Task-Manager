import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { ADD_WORK_LOG, GET_LOG_WORK_DATA } from "./actionTypes";

import {
  addWorkLogSuccess,
  addWorkLogError,
  getLogWorksDataSuccess,
  getLogWorksDataError,
} from "./actions";

import WorkLogService from "../../services/WorkLogService";
import ToastrService from "../../services/ToastrService";

const addWorkLogAsync = async (model) => {
  return await WorkLogService.addWorkLog(model);
};

const getWorkLogsAsync = async (model) => {
  return await WorkLogService.getWorkLogs(model);
};

function* addNewWorkLog({ payload: { model } }) {
  try {
    const response = yield call(addWorkLogAsync, model);
    yield put(addWorkLogSuccess(response));
  } catch (error) {
    ToastrService.error(error.message);
    yield put(addWorkLogError());
  }
}

function* getWorkLogs({ payload: { model } }) {
  try {
    const response = yield call(getWorkLogsAsync, model);
    yield put(getLogWorksDataSuccess(response));
  } catch (error) {
    yield put(getLogWorksDataError(error));
  }
}

export function* watchAddNewWorkLog() {
  yield takeEvery(ADD_WORK_LOG, addNewWorkLog);
}

export function* watchGetWorkLogs() {
  yield takeEvery(GET_LOG_WORK_DATA, getWorkLogs);
}

function* workLog() {
  yield all([fork(watchAddNewWorkLog), fork(watchGetWorkLogs)]);
}

export default workLog;
