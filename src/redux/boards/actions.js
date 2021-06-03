import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  GET_BOARD,
  GET_BOARD_SUCCESS,
  GET_BOARD_ERROR,
  GET_BOARD_CLEAR,
  GET_BOARDS,
  GET_BOARDS_SUCCESS,
  GET_BOARDS_ERROR,
  GET_BOARDS_CLEAR,
  EDIT_BOARD,
  EDIT_BOARD_SUCCESS,
  EDIT_BOARD_ERROR,
  SAVE_MEMBERS,
  CLEAR_MEMBERS_SAVED_MEMBERS,
  LEAVE_BOARD,
  LEAVE_BOARD_SUCCESS,
  LEAVE_BOARD_ERROR,
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

export const getBoard = (boardId) => {
  return {
    payload: { boardId },
    type: GET_BOARD,
  };
};

export const getBoardSuccess = (data) => {
  return {
    payload: data,
    type: GET_BOARD_SUCCESS,
  };
};

export const getBoardError = ({ message = "Unknown error" }) => {
  return {
    payload: { message },
    type: GET_BOARD_ERROR,
  };
};

export const clearBoardFetched = () => {
  return {
    type: GET_BOARD_CLEAR,
  };
};

export const getListBoards = () => {
  return {
    payload: {},
    type: GET_BOARDS,
  };
};
export const getListBoardsSuccess = (data) => {
  return {
    payload: data,
    type: GET_BOARDS_SUCCESS,
  };
};
export const getListBoardsError = ({ message }) => {
  return {
    payload: { message },
    type: GET_BOARDS_CLEAR,
  };
};
export const getListBoardsClear = () => {
  return {
    type: GET_BOARDS_ERROR,
  };
};

export const editBoard = (model) => {
  return {
    type: EDIT_BOARD,
    payload: { model },
  };
};

export const editBoardSuccess = (board) => {
  return {
    type: EDIT_BOARD_SUCCESS,
    payload: board,
  };
};

export const editBoardError = ({ message }) => ({
  type: EDIT_BOARD_ERROR,
  payload: { message },
});

export const saveMembers = (members) => {
  return {
    type: SAVE_MEMBERS,
    payload: { members },
  };
};

export const clearSavedMembers = () => {
  return {
    type: CLEAR_MEMBERS_SAVED_MEMBERS,
  };
};

export const leaveBoard = (boardId) => {
  return {
    payload: { boardId },
    type: LEAVE_BOARD,
  };
};

export const leaveBoardSuccess = () => {
  return {
    type: LEAVE_BOARD_SUCCESS,
  };
};

export const leaveBoardError = ({ message = "Unknown error" }) => {
  return {
    payload: { message },
    type: LEAVE_BOARD_ERROR,
  };
};
