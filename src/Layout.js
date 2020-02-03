import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Snackbars from "components/Snackbars";

import store from "store";
import actions from "./store/auth/actions";
import Routes from "./routes";

const Layout = () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Initial state ->");
    console.log(store.getState());
  }

  const token = localStorage.getItem("token");
  if (!token) {
    store.dispatch(actions.logout());
  } else {
    const tokenExpDate = new Date(localStorage.getItem("tokenExpDate"));
    // if token hasn't expired
    if (tokenExpDate > new Date()) {
      store.dispatch(actions.setLoggedIn());
    } else {
      store.dispatch(actions.logout());
    }
  }

  return (
    <Provider store={store}>
      <Snackbars />
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
};

export default Layout;
