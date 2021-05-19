import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./view/Dashboard";
import SignIn from "./view/SignIn";
import SignUp from "./view/SignUp";

const App = () => {
    return (
        <Fragment>
            <ToastContainer />
            <Router>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route exact path="" component={SignIn} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;
