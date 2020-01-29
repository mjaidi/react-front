import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const isProd = process.env.NODE_ENV === "production";
const middlewareList = [];

middlewareList.push(thunk);
if (!isProd) {
  middlewareList.push(logger);
}

const middleware = compose(
  applyMiddleware(...middlewareList),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default middleware;
