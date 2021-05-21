import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./view/dashboard/Dashboard";
import SignIn from "./view/auth/SignIn";
import SignUp from "./view/auth/SignUp";
import CompleteProfile from "./view/auth/CompleteProfile";

const App = () => {
    return (
        <Fragment>
            <ToastContainer />
            <Router>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/complete-profile" component={CompleteProfile} />
                    <Route exact path="" component={SignIn} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;
