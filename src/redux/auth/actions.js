import { LOGIN_SUCCESS, LOGIN_USER_FB, LOGIN_ERROR } from "./actionTypes";

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
