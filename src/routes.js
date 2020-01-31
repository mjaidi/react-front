import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import NotLoggedInRoute from "components/AuthRoutes/NotLoggedInRoute";
import LoggedInRoute from "components/AuthRoutes/LoggedInRoute";

// lazy loaded routes
const Login = React.lazy(() => import("pages/Registration/Login"));
const SignUp = React.lazy(() => import("pages/Registration/SignUp"));
const Landing = React.lazy(() => import("pages/Landing"));

const Routes = () => {
  return (
    <Switch>
      <NotLoggedInRoute
        path="/login"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Login />
          </Suspense>
        )}
      />
      <NotLoggedInRoute
        path="/signup"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <SignUp />
          </Suspense>
        )}
      />
      <LoggedInRoute
        path="/"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Landing />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default Routes;
