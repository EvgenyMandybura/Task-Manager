import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const AddNewTaskForm = () => {
  return <div>Add new task Form</div>;
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(AddNewTaskForm));
