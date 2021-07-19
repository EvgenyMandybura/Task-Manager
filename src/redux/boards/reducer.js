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
  CHANGE_STATUSES,
  CHANGE_STATUSES_SUCCESS,
  CHANGE_STATUSES_ERROR,
  DELETE_STATUSES,
  DELETE_STATUSES_SUCCESS,
  DELETE_STATUSES_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  message: "",
  created: null,
  loading: false,
  loadingStatuses: false,
  board: null,
  boardsList: [],
  savedMembers: [],
  removed: false,
  statuses: [],
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
        board: null,
        loading: false,
      };
      break;
    case GET_BOARDS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_BOARDS_SUCCESS:
      state = {
        ...state,
        boardsList: action.payload,
        loading: false,
      };
      break;
    case GET_BOARDS_CLEAR:
      state = {
        ...state,
        loading: false,
        boardsList: [],
      };
      break;
    case GET_BOARDS_ERROR:
      state = {
        ...state,
        data: [],
        error: "",
      };
      break;
    case EDIT_BOARD:
      state = {
        ...state,
        loading: true,
      };
      break;
    case EDIT_BOARD_SUCCESS:
      state = {
        ...state,
        created: action.payload,
        loading: false,
      };
      break;
    case EDIT_BOARD_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;

    case SAVE_MEMBERS:
      state = {
        ...state,
        savedMembers: action.payload,
      };
      break;

    case CLEAR_MEMBERS_SAVED_MEMBERS:
      state = {
        ...state,
        savedMembers: [],
      };
      break;
    case LEAVE_BOARD:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LEAVE_BOARD_SUCCESS:
      state = {
        ...state,
        removed: true,
        loading: false,
      };
      break;
    case LEAVE_BOARD_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case CHANGE_STATUSES:
      state = {
        ...state,
        loadingStatuses: true,
      };
      break;
    case CHANGE_STATUSES_SUCCESS:
      state = {
        ...state,
        statuses: action.payload,
        loadingStatuses: false,
      };
      break;
    case CHANGE_STATUSES_ERROR:
      state = {
        ...state,
        loadingStatuses: false,
      };
      break;
    case DELETE_STATUSES:
      state = {
        ...state,
      };
      break;
    case DELETE_STATUSES_SUCCESS:
      state = {
        ...state,
        removed: true,
      };
      break;
    case DELETE_STATUSES_ERROR:
      state = {
        ...state,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default boards;
