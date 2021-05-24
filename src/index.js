<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
=======
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

>>>>>>> feature/WEBI-206
