import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const NotLoggedInRoute = ({ component: Child, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !isLoggedIn ? (
          <Child {...props} />
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
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
};
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(NotLoggedInRoute);
