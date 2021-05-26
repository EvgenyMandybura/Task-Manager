import {
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  GET_BOARD,
  GET_BOARD_SUCCESS,
  GET_BOARD_ERROR,
  GET_BOARD_CLEAR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  created: null,
  loading: false,
  board: null,
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
    case GET_BOARD:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_BOARD_SUCCESS:
      state = {
        ...state,
        board: action.payload,
        loading: false,
      };
      break;
    case GET_BOARD_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_BOARD_CLEAR:
      state = {
        ...state,
        product: null,
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
