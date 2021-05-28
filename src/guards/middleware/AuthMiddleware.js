import React, { useState, useEffect, useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import Header from "../../components/layout/Header";
import { UserContext } from "../../components/Firebase/UserProvider";
import { auth } from "../../components/Firebase/firebase";

function AuthMiddleware({ component: Component, exact = false }) {
  const user = useContext(UserContext);
  return (
    <Route
      exact={exact}
      render={(props) => {
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
}

export default withRouter(AuthMiddleware);
