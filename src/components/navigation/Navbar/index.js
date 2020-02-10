import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import actions from "../../../store/auth/actions";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { isAuthorizedRoute } from "utils/auth_roles";

const Navbar = ({ isLoggedIn, logout, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/"} className={classes.link}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            {isLoggedIn && isAuthorizedRoute("/secret", user.role) && (
              <Link to={"/secret"} className={classes.link}>
                Secret
              </Link>
            )}
            {isLoggedIn && isAuthorizedRoute("/admin", user.role) && (
              <Link to={"/admin"} className={classes.link}>
                Admin
              </Link>
            )}
          </Typography>

          {!isLoggedIn && (
            <Link to={"/login"} className={classes.link}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
