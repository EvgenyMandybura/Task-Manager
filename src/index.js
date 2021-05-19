import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux";

ReactDOM.render(
    <Fragment>
        <Provider store={store}>
            <App />
        </Provider>
    </Fragment>,
    document.getElementById("root")
);

