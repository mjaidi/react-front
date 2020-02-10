import { combineReducers } from "redux";
import auth from "./auth/reducer";
import secret from "./secret/reducer";
import admin from "./admin/reducer";
import snackbars from "./snackbars/reducer";

const rootReducer = combineReducers({
  auth,
  secret,
  admin,
  snackbars
});

export default rootReducer;
