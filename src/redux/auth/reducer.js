import { LOGIN_USER_FB, LOGIN_SUCCESS, LOGIN_ERROR } from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  user: null,
  loading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FB:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loading: false,
      };
      break;
    case LOGIN_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default auth;
