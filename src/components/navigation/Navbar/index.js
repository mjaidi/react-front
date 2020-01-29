import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "context/index.js";

import { Link } from "react-router-dom";
import useStyles from "./styles";

export default function Navbar() {
  const classes = useStyles();

  return (
    <Auth.Consumer>
      {Auth => (
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
                News
              </Typography>
              {!Auth.isLoggedIn && (
                <Link to={"/login"} className={classes.link}>
                  <Button color="inherit">Login</Button>
                </Link>
              )}
              {Auth.isLoggedIn && (
                <Button color="inherit" onClick={() => Auth.logOut()}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>
      )}
    </Auth.Consumer>
  );
}
