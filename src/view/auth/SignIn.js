import React from "react";
import { connect } from "react-redux";
import FacebookLogin from "../../components/auth/FacebookLogin";
import SignInForm from "../../components/forms/SignInForm";
import ContainerAuth from "./ContainerAuth";

const SignIn = () => {
  return (
    <ContainerAuth>
      <SignInForm />
      <FacebookLogin />
    </ContainerAuth>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(SignIn);
