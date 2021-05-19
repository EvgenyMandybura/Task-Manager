import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { LOGIN_USER_FB } from "./actionTypes";

import { loginSuccess, loginError } from "./actions";

import ToastrService from "../../services/ToastrService";
import FirebaseService from "../../services/FirebaseService";

const loginWithFBAsync = async () => {
  const authUser = await FirebaseService.loginWithFacebook();
  return authUser;
};

function* loginUserWithFB({ payload: { history } }) {
  try {
    const response = yield call(loginWithFBAsync);
    yield put(loginSuccess(response));
    if (response) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(loginError());
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER_FB, loginUserWithFB);
}

function* authSaga() {
  yield all([fork(watchUserLogin)]);
}

export default authSaga;
