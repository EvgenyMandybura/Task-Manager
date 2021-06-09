import {
  LOGIN_USER_FB,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_ERROR,
  COMPLETE_PROFILE_FORM,
  COMPLETE_PROFILE_FORM_SUCCESS,
  COMPLETE_PROFILE_FORM_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  GET_MEMBERS,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_CLEAR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  user: null,
  loading: false,
  membersList: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FB:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_USER:
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
    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case LOGOUT_ERROR:
      state = { ...state, loading: false };
      break;
    case COMPLETE_PROFILE_FORM:
      state = {
        ...state,
        loading: true,
      };
      break;
    case COMPLETE_PROFILE_FORM_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case COMPLETE_PROFILE_FORM_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loading: false,
      };
      break;
    case REGISTER_USER:
      return { ...state, loading: true, error: "" };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: "" };
    case REGISTER_USER_ERROR:
      return { ...state, loading: false };

    case GET_MEMBERS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_MEMBERS_SUCCESS:
      state = {
        ...state,
        membersList: action.payload,
        loading: false,
      };
      break;
    case GET_MEMBERS_CLEAR:
      state = {
        ...state,
        loading: false,
        membersList: [],
      };
      break;
    case GET_MEMBERS_ERROR:
      state = {
        ...state,
        data: [],
        error: "",
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default auth;
