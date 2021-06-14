import {
  ADD_COMMENT,
  ADD_COMMENTS_SUCCESS,
  ADD_COMMENTS_ERROR,
  GET_TASK_COMMENTS,
  GET_TASK_COMMENTS_SUCCESS,
  GET_TASK_COMMENTS_ERROR,
  GET_TASK_COMMENTS_CLEAR,
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

export const getTaskComments = (model) => {
  return {
    payload: { model },
    type: GET_TASK_COMMENTS,
  };
};
export const getTaskCommentsSuccess = (data) => {
  return {
    payload: { data },
    type: GET_TASK_COMMENTS_SUCCESS,
  };
};
export const getTaskCommentsError = ({ message }) => {
  return {
    payload: { message },
    type: GET_TASK_COMMENTS_ERROR,
  };
};
export const getTaskCommentsClear = () => {
  return {
    type: GET_TASK_COMMENTS_CLEAR,
  };
};
