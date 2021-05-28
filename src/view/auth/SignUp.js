import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ContainerAuth from "./ContainerAuth";
import SignUpForm from "../../components/forms/SignUpForm";

const SignUp = () => {
  return (
      <ContainerAuth>
        <SignUpForm />
      </ContainerAuth>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(SignUp));
