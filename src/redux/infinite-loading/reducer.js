import {
  ENABLE_LOADING,
  LOAD_END,
  LOAD_MORE_REQUIRED,
  PAGE_BOTTOM_REACH,
  RESET_LOADING_STATE,
} from "./actionTypes";

const initialState = {
  required: false,
  toLoad: false,
  disabled: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MORE_REQUIRED:
      state = {
        ...state,
        required: true,
        toLoad: false,
      };
      break;
    case LOAD_END:
      state = {
        ...state,
        toLoad: false,
      };
      break;
    case ENABLE_LOADING:
      state = {
        ...state,
        disabled: false,
      };
      break;
    case RESET_LOADING_STATE:
      state = {
        ...initialState,
      };
      break;
    case PAGE_BOTTOM_REACH:
      state = {
        ...state,
        toLoad: true,
        disabled: true,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
