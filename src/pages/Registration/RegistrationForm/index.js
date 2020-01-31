import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Link } from "react-router-dom";

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

const Registration = ({ login, signUp, formType }) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {formType === "Login" && (
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      )}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formType === "Login" ? "Sign In" : "Sign Up"}
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (formType === "Login") {
                login(values);
              } else if (formType === "SignUp") {
                signUp(values);
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

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  {formType === "Login" ? "Sign In" : "Sign Up"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to={"#"} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    {formType === "Login" && (
                      <Link to={"/signup"} variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    )}
                    {formType === "SignUp" && (
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
  signUp: payload => dispatch(actions.signUp(payload))
});

export default connect(null, mapDispatchToProps)(Registration);