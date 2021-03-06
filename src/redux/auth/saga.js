import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  LOGIN_USER_FB,
  LOGIN_USER,
  LOGOUT_USER,
  COMPLETE_PROFILE_FORM,
  REGISTER_USER,
  GET_MEMBERS,
} from "./actionTypes";

import {
  loginSuccess,
  loginError,
  logoutUserSuccess,
  logoutError,
  completeProfileSuccess,
  completeProfileError,
  registerUserSuccess,
  registerUserError,
  getListMembersSuccess,
  getListMembersError,
} from "./actions";

import ToastrService from "../../services/ToastrService";
import AuthService from "../../services/AuthService";

const loginWithFBAsync = async () => {
  const authUser = await AuthService.loginWithFacebook();
  return authUser;
};

const loginWithEmailPasswordAsync = async (email, password) => {
  const authUser = await AuthService.login({ password, email });
  return authUser;
};

const signOutAsync = () => {
  return AuthService.logout();
};

const completeProfileAsync = async (model) => {
  return AuthService.completeProfile(model);
};

const getMembersListAsync = async (members) => {
  return await AuthService.getMemberList(members);
};

const registerWithEmailPasswordAsync = (email, password) => {
  const authUser = AuthService.register({
    email,
    password,
  });
  return authUser;
};

function* loginUserWithFB({ payload: { history } }) {
  try {
    const response = yield call(loginWithFBAsync);
    yield put(loginSuccess(response));
    if (response.additionalUserInfo.isNewUser) {
      history.push("/complete-profile");
    } else if (response) {
      history.push("/boards");
    } else {
      history.push("/");
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(loginError());
  }
}

function* loginUserWithEmailPassword({ payload: { user, history } }) {
  try {
    const response = yield call(
      loginWithEmailPasswordAsync,
      user.email,
      user.password
    );
    yield put(loginSuccess(response));
    if (response) {
      history.push("/boards");
    } else {
      history.push("/");
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(loginError());
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield call(signOutAsync);
    yield put(logoutUserSuccess());
    history.push("/sign-in");
  } catch (error) {
    ToastrService.error(error.message);
    yield put(logoutError(error));
  }
}

function* completeProfileFirebase({ payload }) {
  const { model } = payload;

  try {
    const result = yield call(completeProfileAsync, model);
    yield put(completeProfileSuccess(result));
    if (result) {
      model.history.push("/boards");
    }
    ToastrService.success("Profile completed");
  } catch (error) {
    ToastrService.error(error.message);
    yield put(completeProfileError());
  }
}

function* signUpUser({ payload }) {
  const { model } = payload;
  const { email, password } = model.values;
  try {
    const responseRegister = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    const responseCompleteProfile = yield call(completeProfileAsync, model);
    yield put(registerUserSuccess(responseRegister));
    if (responseRegister && responseCompleteProfile) {
      model.history.push("/boards");
    } else {
      model.history.push("/");
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(registerUserError(error));
  }
}
function* getMembers({ payload: { members } }) {
  try {
    const response = yield call(getMembersListAsync, members);
    yield put(getListMembersSuccess(response));
  } catch (error) {
    yield put(getListMembersError(error));
  }
}

export function* watchUserLoginFB() {
  yield takeEvery(LOGIN_USER_FB, loginUserWithFB);
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUserWithEmailPassword);
}

export function* watchUpdateProfile() {
  yield takeEvery(COMPLETE_PROFILE_FORM, completeProfileFirebase);
}

export function* watchUserLogOut() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, signUpUser);
}

export function* watchGetMembers() {
  yield takeEvery(GET_MEMBERS, getMembers);
}

function* authSaga() {
  yield all([
    fork(watchUserLogin),
    fork(watchUserLoginFB),
    fork(watchUserLogOut),
    fork(watchUpdateProfile),
    fork(watchUserRegister),
    fork(watchGetMembers),
  ]);
}

export default authSaga;
