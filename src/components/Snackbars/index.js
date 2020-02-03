import React, { Fragment } from "react";
import { connect } from "react-redux";
import actions from "store/snackbars/actions";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";

const ConsecutiveSnackbars = ({
  activeMessage,
  open,
  close,
  newMessage,
  processMessages
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    close();
  };

  const handleExited = () => {
    processMessages();
  };

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        key={activeMessage ? activeMessage.key : undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        className={activeMessage ? classes[activeMessage.type] : ""}
        message={activeMessage ? activeMessage.message : undefined}
        action={
          <Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Fragment>
        }
      />
    </div>
  );
};

const mapStateToProps = state => ({
  activeMessage: state.snackbars.activeMessage,
  open: state.snackbars.open
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(actions.close()),
  newMessage: message => dispatch(actions.newMessage(message)),
  processMessages: () => dispatch(actions.processMessages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsecutiveSnackbars);
