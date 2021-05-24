<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div>REACT</div>
      </Router>
    </>
  );
}
=======
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import UserProvider from "./components/Firebase/UserProvider";
import Application from "./guards/Application";

const App = () => {
    return (
        <Fragment>
            <ToastContainer />
            <UserProvider>
                <Application />
            </UserProvider>
        </Fragment>
    );
};
>>>>>>> feature/WEBI-206

export default App;
