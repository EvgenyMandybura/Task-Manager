import { combineReducers } from "redux";

import auth from "./auth/reducer";
import boards from "./boards/reducer";
import tasks from "./tasks/reducer";

const rootReducer = combineReducers({
  auth,
  boards,
  tasks,
});

export default rootReducer;
