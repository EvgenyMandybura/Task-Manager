import { combineReducers } from "redux";

import auth from "./auth/reducer";
import boards from "./boards/reducer";
import tasks from "./tasks/reducer";
import comments from "./comments/reducer";
import InfiniteLoading from "./infinite-loading/reducer";

const rootReducer = combineReducers({
  auth,
  boards,
  tasks,
  comments,
  InfiniteLoading,
});

export default rootReducer;
