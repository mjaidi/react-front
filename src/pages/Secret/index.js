import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "components/navigation/Navbar";
import actions from "../../store/secret/actions";

const Main = ({ message, getMessage }) => {
  useEffect(() => {
    getMessage();
  });
  return (
    <div>
      <Navbar />
      {message}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getMessage: () => dispatch(actions.getMessage())
});

const mapStateToProps = state => ({
  message: state.secret.message
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
