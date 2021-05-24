import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import { loginUserFB } from "../../redux/auth/actions";
import "bootstrap/dist/css/bootstrap.min.css";

const FacebookLogin = ({ loginUserFB, history }) => {
  const signInFB = () => {
    loginUserFB(history);
  };

  return (
    <Button type="button" color="primary" onClick={signInFB}>
      Facebook
    </Button>
  );
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, { loginUserFB })(FacebookLogin)
);
