import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import NotLoggedInRoute from "components/AuthRoutes/NotLoggedInRoute";
import LoggedInRoute from "components/AuthRoutes/LoggedInRoute";
import { connect } from "react-redux";

// lazy loaded routes
const Login = React.lazy(() => import("pages/Registration/Login"));
const SignUp = React.lazy(() => import("pages/Registration/SignUp"));
const Landing = React.lazy(() => import("pages/Landing"));

const Routes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <NotLoggedInRoute
        isLoggedIn={isLoggedIn}
        path="/login"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <Login />
          </Suspense>
        )}
      />
      <NotLoggedInRoute
        isLoggedIn={isLoggedIn}
        path="/signup"
        exact
        component={() => (
          <Suspense fallback={<div>Loading....</div>}>
            <SignUp />
          </Suspense>
        )}
      />
      <LoggedInRoute
        isLoggedIn={isLoggedIn}
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

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(Routes);
