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

export default App;
