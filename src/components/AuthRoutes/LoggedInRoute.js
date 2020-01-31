import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isAuthorizedRoute } from "utils/auth_roles";

const LoggedInRoute = ({
  component: Child,
  isLoggedIn,
  location,
  user,
  ...rest
}) => {
  console.log(isLoggedIn);
  console.log(location);
  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn ? (
          isAuthorizedRoute(location.pathname, user.role) ? (
            <Child {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }}
    />
  );
};

LoggedInRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(LoggedInRoute);
