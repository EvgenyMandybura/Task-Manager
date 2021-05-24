import React, {useContext} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../view/auth/SignIn";
import SignUp from "../view/auth/SignUp";
import CompleteProfile from "../view/auth/CompleteProfile";
import Dashboard from "../view/dashboard/Dashboard";
import { UserContext } from "../components/Firebase/UserProvider";

function Application() {
    const user = useContext(UserContext);
    return (
        user ?
            <Router>
                <Switch>
                   <Route path="/dashboard" component={Dashboard} />
                    <Route path="/complete-profile" component={CompleteProfile} />
                   <Route exact path="/" component={Dashboard} />
                </Switch>
            </Router>
            :
        <Router>
            <Switch>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route exact path="" component={SignIn} />
            </Switch>
        </Router>
    );
}
export default Application;