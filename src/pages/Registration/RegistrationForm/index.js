import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Link, useLocation } from "react-router-dom";
import qs from "query-string";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import actions from "../../../store/auth/actions";

const Registration = ({
  login,
  signUp,
  newPassword,
  resetPassword,
  formType
}) => {
  const classes = useStyles();
  const location = useLocation();

  const formName = () => {
    switch (formType) {
      case "Login":
        return "Sign In";
      case "SignUp":
        return "Sign Up";
      case "NewPassword":
        return "Request Password Reset";
      case "ResetPassword":
        return "Reset Password";
      default:
        return null;
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {(formType === "Login" ||
        formType === "NewPassword" ||
        formType === "ResetPassword") && (
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      )}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formName()}
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              let errors = {};
              if (formType !== "ResetPassword") {
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              switch (formType) {
                case "Login":
                  login(values);
                  break;
                case "SignUp":
                  signUp(values);
                  break;
                case "NewPassword":
                  newPassword(values);
                  break;
                case "ResetPassword":
                  resetPassword({
                    ...values,
                    token: qs.parse(location.search).token
                  });
                  break;
                default:
                  return null;
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                {formType !== "ResetPassword" && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                )}
                {formType !== "NewPassword" && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                )}
                {(formType === "SignIn" || formType === "SignUp") && (
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  {formName()}
                </Button>
                <Grid container>
                  {formType === "Login" && (
                    <Grid item xs>
                      <Link to="/new_password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  )}
                  <Grid item>
                    {formType === "Login" && (
                      <Link to={"/signup"} variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    )}
                    {formType !== "Login" && (
                      <Link to={"/login"} variant="body2">
                        {"Already have an account? Sign In"}
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
      {formType === "SignUp" && (
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      )}
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(actions.login(payload)),
  signUp: payload => dispatch(actions.signUp(payload)),
  newPassword: payload => dispatch(actions.newPassword(payload)),
  resetPassword: payload => dispatch(actions.resetPassword(payload))
});

export default connect(null, mapDispatchToProps)(Registration);
