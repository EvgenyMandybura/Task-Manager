import React from "react";
import { Route } from "react-router-dom";
import Header from "../../components/layout/Header";

const NonAuthMiddleware = ({ component: Component, exact = false }) => (
  <Route
    exact={exact}
    render={(props) => {
      return (
        <>
          <Header />
          <Component {...props} />
        </>
      );
    }}
  />
);

export default NonAuthMiddleware;
