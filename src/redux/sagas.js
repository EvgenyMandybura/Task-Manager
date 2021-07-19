import { all } from "redux-saga/effects";

import AuthSaga from "./auth/saga";
import BoardsSaga from "./boards/saga";
import TasksSaga from "./tasks/saga";
import commentsSaga from "./comments/saga";

export default function* rootSaga() {
  yield all([AuthSaga(), BoardsSaga(), TasksSaga(), commentsSaga()]);
}
