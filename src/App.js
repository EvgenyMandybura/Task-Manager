import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { authRoutes, userRoutes } from "./guards/allRoutes";
import AuthMiddleware from "./guards/middleware/AuthMiddleware";
import NonAuthMiddleware from "./guards/middleware/NonAuthMiddleware";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <NonAuthMiddleware
              path={route.path}
              component={route.component}
              exact={route.exact}
              key={idx}
            />
          ))}

          {userRoutes.map((route, idx) => {
            return (
              <AuthMiddleware
                path={route.path}
                component={route.component}
                exact={route.exact}
                roles={route.roles}
                key={idx}
              />
            );
          })}
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
