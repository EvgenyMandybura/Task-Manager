import React from "react";

const FormikFormError = ({ children, className }) => {
  return (
    <div className="d-block text-danger">
      {children}
    </div>
  );
};

export default FormikFormError;
