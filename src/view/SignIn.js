import React from "react";
import { connect } from "react-redux";
import FacebookLogin from "../components/auth/FacebookLogin";

const SignIn = () => {
  return (
    <div>
      <h1>Sign IN</h1>
      <FacebookLogin />
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(SignIn);
