import {
  ADD_COMMENT,
  ADD_COMMENTS_SUCCESS,
  ADD_COMMENTS_ERROR,
  GET_TASK_COMMENTS,
  GET_TASK_COMMENTS_SUCCESS,
  GET_TASK_COMMENTS_ERROR,
  GET_TASK_COMMENTS_CLEAR,
} from "./actionTypes";

const initialState = {
  comments: [],
  error: "",
  loading: false,
  lastVisible: null,
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
    case GET_TASK_COMMENTS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_TASK_COMMENTS_SUCCESS:
      state = {
        ...state,
        comments: action.payload.data.commentsLimit,
        lastVisible: action.payload.data.lastVisible,
        loading: false,
      };
      break;
    case GET_TASK_COMMENTS_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_TASK_COMMENTS_CLEAR:
      state = {
        ...initialState,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default comments;
