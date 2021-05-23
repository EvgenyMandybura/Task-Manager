import React from "react";
import AuthService from "../../services/AuthService";
import {firebase_app,} from "../../components/Firebase/firebase";

const Dashboard = () => {
    const user = firebase_app.auth().currentUser;
  return (
    <>
      <h1>Dashboard</h1>
      <h2>displayName: {user.displayName}</h2>
      <h2>providerID: {user.providerId}</h2>
      <button onClick={AuthService.logout} >Log Out</button>
    </>
  );
};

export default Dashboard;
