import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const SignUp = () => {
  return <h1>Sign Up</h1>;
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(SignUp));
