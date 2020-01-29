import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import NotLoggedInRoute from "components/AuthRoutes/NotLoggedInRoute";
import LoggedInRoute from "components/AuthRoutes/LoggedInRoute";
import { Auth } from "context/index.js";

// lazy loaded routes
const Login = React.lazy(() => import("pages/Registration/Login"));
const SignUp = React.lazy(() => import("pages/Registration/SignUp"));
const Landing = React.lazy(() => import("pages/Landing"));

export default () => {
  return (
    <Auth.Consumer>
      {Auth => (
        <Switch>
          <NotLoggedInRoute
            isLoggedIn={Auth.isLoggedIn}
            path="/login"
            exact
            component={() => (
              <Suspense fallback={<div>Loading....</div>}>
                <Login />
              </Suspense>
            )}
          />
          <NotLoggedInRoute
            isLoggedIn={Auth.isLoggedIn}
            path="/signup"
            exact
            component={() => (
              <Suspense fallback={<div>Loading....</div>}>
                <SignUp />
              </Suspense>
            )}
          />
          <LoggedInRoute
            isLoggedIn={Auth.isLoggedIn}
            path="/"
            exact
            component={() => (
              <Suspense fallback={<div>Loading....</div>}>
                <Landing />
              </Suspense>
            )}
          />
        </Switch>
      )}
    </Auth.Consumer>
  );
};
