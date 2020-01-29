import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const NotLoggedInRoute = ({ component: C, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !isLoggedIn ? (
          <C {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        );
      }}
    />
  );
};

NotLoggedInRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
};

export default NotLoggedInRoute;
