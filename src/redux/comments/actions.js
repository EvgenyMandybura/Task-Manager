import {
  ADD_COMMENT,
  ADD_COMMENTS_SUCCESS,
  ADD_COMMENTS_ERROR,
} from "./actionTypes";

export const createComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: { comment },
  };
};

export const createCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENTS_SUCCESS,
    payload: comment,
  };
};

export const createCommentError = ({ message }) => ({
  type: ADD_COMMENTS_ERROR,
  payload: { message },
});
