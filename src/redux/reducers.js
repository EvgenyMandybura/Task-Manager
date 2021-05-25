import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import Boards from "./boards/reducer";

const rootReducer = combineReducers({
  Auth,
  Boards,
});

export default rootReducer;
