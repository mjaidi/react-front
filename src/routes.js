import React, { Suspense } from "react";
import { Switch } from "react-router-dom";

import NotLoggedInRoute from "components/AuthRoutes/NotLoggedInRoute";
import LoggedInRoute from "components/AuthRoutes/LoggedInRoute";

// lazy loaded routes
const Login = React.lazy(() => import("pages/Registration/Login"));
const SignUp = React.lazy(() => import("pages/Registration/SignUp"));
const Landing = React.lazy(() => import("pages/Landing"));
const Secret = React.lazy(() => import("pages/Secret"));
const Admin = React.lazy(() => import("pages/Admin"));

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
      <NotLoggedInRoute
        path="/"
        exact
        isPublic={true}
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Landing />
          </Suspense>
        )}
      />
      <LoggedInRoute
        path="/secret"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Secret />
          </Suspense>
        )}
      />
      <LoggedInRoute
        path="/admin"
        authorizedRoles={["admin"]}
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Admin />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default Routes;
