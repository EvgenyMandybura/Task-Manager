import React, { Fragment, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Internationalization/i18n";
import App from "./App";
import store from "./redux";
import "./Internationalization/i18n";

ReactDOM.render(
  <Fragment>
    <Provider store={store}>
      <Suspense fallback={<div>Loading ……</div>}>
        <App />
      </Suspense>
    </Provider>
  </Fragment>,
  document.getElementById("root")
);
