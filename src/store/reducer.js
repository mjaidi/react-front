import { combineReducers } from "redux";
import auth from "./auth/reducer";
import main from "./main/reducer";
import dashboard from "./dashboard/reducer";
import snackbars from "./snackbars/reducer";

const rootReducer = combineReducers({
  auth,
  main,
  dashboard,
  snackbars
});

export default rootReducer;
