import {
  ADD_COMMENT,
  ADD_COMMENTS_SUCCESS,
  ADD_COMMENTS_ERROR,
} from "./actionTypes";

const initialState = {
  data: [],
  error: "",
  loading: false,
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_COMMENTS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_COMMENTS_ERROR:
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

export default comments;
