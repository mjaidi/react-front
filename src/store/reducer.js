import { combineReducers } from "redux";
import auth from "./auth/reducer";
import landing from "./landing/reducer";

const rootReducer = combineReducers({
  auth,
  landing
});

export default rootReducer;
