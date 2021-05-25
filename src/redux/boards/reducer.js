import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  created: null,
  loading: false,
};

const boards = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CREATE_BOARD_SUCCESS:
      state = {
        ...state,
        created: action.payload,
        loading: false,
      };
      break;
    case CREATE_BOARD_ERROR:
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

export default boards;
