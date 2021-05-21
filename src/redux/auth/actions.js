import {
  LOGIN_SUCCESS,
  LOGIN_USER_FB,
  LOGIN_ERROR,
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

export const completeProfileSuccess = ({ data }) => {
  return {
    type: COMPLETE_PROFILE_FORM_SUCCESS,
    payload: data,
  };
};

export const completeProfileError = () => {
  return {
    type: COMPLETE_PROFILE_FORM_ERROR,
  };
};
