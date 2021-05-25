import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../view/auth/SignIn";
import SignUp from "../view/auth/SignUp";
import CompleteProfile from "../view/auth/CompleteProfile";
import Dashboard from "../view/dashboard/Dashboard";
import Boards from "../view/Boards/Boards";
import { UserContext } from "../components/Firebase/UserProvider";
import Header from "../components/layout/Header";
import MakeNewPage from "../view/Boards/MakeNewPage";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <Router>
      <Header />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/complete-profile" component={CompleteProfile} />
        <Route path="/boards" component={Boards} />
        <Route path="/make-new-board" component={MakeNewPage} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="" component={SignIn} />
      </Switch>
    </Router>
  );
}
export default Application;
