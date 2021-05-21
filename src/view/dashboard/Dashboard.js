import React from "react";
import FirebaseService from "../../services/FirebaseService";

const Dashboard = () => {
    console.log(FirebaseService.getUserInfo())
  return (
    <>
      <h1>Dashboard</h1>
      <h1>
          {
              FirebaseService.getCurrentUsername()
          }
      </h1>
    </>
  );
};

export default Dashboard;
