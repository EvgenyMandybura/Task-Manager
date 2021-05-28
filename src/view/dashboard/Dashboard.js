import React from "react";
import AuthService from "../../services/AuthService";
import { firebase_app } from "../../components/Firebase/firebase";
import { logoutUser } from "../../redux/auth/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ logoutUser }) => {
  const user = firebase_app.auth().currentUser;
  const onSubmitLogOut = () => {
    logoutUser();
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2>displayName: {user.displayName}</h2>
      <h2>providerID: {user.providerId}</h2>
      <button onClick={onSubmitLogOut}>Log Out</button>
    </>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { logoutUser })(Dashboard));
