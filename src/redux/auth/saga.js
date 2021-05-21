import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  LOGIN_USER_FB,
  COMPLETE_PROFILE_FORM
} from "./actionTypes";

import {
  loginSuccess,
  loginError,
  completeProfileSuccess,
  completeProfileError
} from "./actions";

import ToastrService from "../../services/ToastrService";
import FirebaseService from "../../services/FirebaseService";

const loginWithFBAsync = async () => {
  const authUser = await FirebaseService.loginWithFacebook();
  return authUser;
};

const completeProfileAsync = async (model) => {
  return FirebaseService.completeProfile(model)
};

function* loginUserWithFB({ payload: { history } }) {
  try {
    const response = yield call(loginWithFBAsync);
    yield put(loginSuccess(response));
    if (response.additionalUserInfo.isNewUser) {
      history.push("/complete-profile");
    } else if(response) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(loginError());
  }
}

function* completeProfileFirebase({ payload }) {
  const { model } = payload;
  try {
    const result = yield call(completeProfileAsync, model);
    yield put(completeProfileSuccess(result));
    ToastrService.success("Profile completed");
  } catch (error) {
    ToastrService.error(error.message);
    yield put(completeProfileError());
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER_FB, loginUserWithFB);
}

export function* watchUpdateProfile() {
  yield takeEvery(COMPLETE_PROFILE_FORM, completeProfileFirebase);
}

function* authSaga() {
  yield all([fork(watchUserLogin)]);
  yield all([fork(watchUpdateProfile)]);
}

export default authSaga;
