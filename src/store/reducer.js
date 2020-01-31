import { combineReducers } from "redux";
import auth from "./auth/reducer";
import main from "./main/reducer";
import dashboard from "./dashboard/reducer";

const rootReducer = combineReducers({
  auth,
  main,
  dashboard
});

export default rootReducer;
