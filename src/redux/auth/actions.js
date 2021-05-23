import {
  LOGIN_SUCCESS,
  LOGIN_USER_FB,
  LOGIN_ERROR,
  LOGIN_USER,
  COMPLETE_PROFILE_FORM,
  COMPLETE_PROFILE_FORM_SUCCESS,
  COMPLETE_PROFILE_FORM_ERROR
} from "./actionTypes";

export const loginUserFB = (history) => {
  return {
    type: LOGIN_USER_FB,
    payload: { history },
  };
};

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = ({ user }) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
  };
};

export const completeProfile = (model) => {
  return {
    type: COMPLETE_PROFILE_FORM,
    payload: { model },
  };
};

export const completeProfileSuccess = () => {
  return {
    type: COMPLETE_PROFILE_FORM_SUCCESS,
  };
};

export const completeProfileError = () => {
  return {
    type: COMPLETE_PROFILE_FORM_ERROR,
  };
};
