import {
  ENABLE_LOADING,
  LOAD_END,
  LOAD_MORE_REQUIRED,
  PAGE_BOTTOM_REACH,
  RESET_LOADING_STATE,
} from "./actionTypes";

export const startInfiniteLoading = (payload) => {
  return {
    payload,
    type: LOAD_MORE_REQUIRED,
  };
};

export const endInfiniteLoading = (payload) => {
  return {
    payload,
    type: RESET_LOADING_STATE,
  };
};

export const bottomReached = (payload) => {
  return {
    payload,
    type: PAGE_BOTTOM_REACH,
  };
};

export const loadEnd = () => {
  return {
    type: LOAD_END,
  };
};

export const enableLoading = () => {
  return {
    type: ENABLE_LOADING,
  };
};
