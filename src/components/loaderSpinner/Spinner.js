import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return <Loader type="TailSpin" color="#8fbc8f" height={80} width={80} />;
};

export default Spinner;
