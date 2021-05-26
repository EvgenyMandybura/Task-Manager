import { combineReducers } from "redux";

import auth from "./auth/reducer";
import boards from "./boards/reducer";

const rootReducer = combineReducers({
  auth,
  boards,
});

export default rootReducer;
