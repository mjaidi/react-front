import React, { Suspense } from "react";
import { Switch } from "react-router-dom";

import NotLoggedInRoute from "components/AuthRoutes/NotLoggedInRoute";
import LoggedInRoute from "components/AuthRoutes/LoggedInRoute";

// lazy loaded routes
const Login = React.lazy(() => import("pages/Registration/Login"));
const SignUp = React.lazy(() => import("pages/Registration/SignUp"));
const Landing = React.lazy(() => import("pages/Landing"));
const Main = React.lazy(() => import("pages/Main"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));

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
        path="/main"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Main />
          </Suspense>
        )}
      />
      <LoggedInRoute
        path="/dashboard"
        authorizedRoles={["admin"]}
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Dashboard />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default Routes;
