import React, { useState, useEffect, useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import Header from "../../components/layout/Header";
import StorageService from "../../services/StorageService";

const AuthMiddleware = ({ component: Component, exact = false }) => {
  return (
    <Route
      exact={exact}
      render={(props) => {
        const user = StorageService.user.value;

        if (!!user) {
          return (
            <>
              <Header />
              <Component {...props} />
            </>
          );
        }

        return (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default withRouter(AuthMiddleware);
