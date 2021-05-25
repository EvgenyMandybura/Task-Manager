import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
} from "./actionTypes";

export const createBoard = (model) => {
  return {
    type: CREATE_BOARD,
    payload: { model },
  };
};

export const createProductSuccess = (board) => {
  return {
    type: CREATE_BOARD_SUCCESS,
    payload: board,
  };
};

export const createBoardError = ({ message }) => ({
  type: CREATE_BOARD_ERROR,
  payload: { message },
});
