import React from "react";
import ContainerUser from "../../components/layout/ContainerUser";
import AddNewTaskForm from "../../components/forms/AddNewTaskForm";
import ReachTextEditor from "../../components/forms/ReachTextEditor";

const AddNewTask = () => {
  return (
    <ContainerUser>
      <AddNewTaskForm />
      <ReachTextEditor />
    </ContainerUser>
  );
};

export default AddNewTask;
