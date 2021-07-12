import React, { useEffect, useState } from "react";
import { getTaskFiles, clearTaskFiles } from "../../redux/tasks/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const FilesDetails = ({
  fileUrls,
  getTaskFiles,
  clearTaskFiles,
  tasksState,
}) => {
  const { loadingFiles, files } = tasksState;
  const [readyFiles, updateReadyFiles] = useState(false);
  const fetchTaskFiles = () => {
    getTaskFiles(fileUrls);
  };
  useEffect(() => {
    fetchTaskFiles();
    updateReadyFiles(true);
    return () => {
      clearTaskFiles();
    };
  }, []);
  useEffect(() => {
    if (!loadingFiles) {
      fetchTaskFiles();
    }
  }, []);
  return (
    <div>
      <h4>List of task files:</h4>
      {readyFiles && files?.length > 0 ? (
        files?.map((file) => (
          <div key={file.name} className="task">
            <img src={file.urlForDisplay} alt="Logo" className="taskImage" />
            <p>{file.name}</p>
          </div>
        ))
      ) : (
        <h3>No files</h3>
      )}
    </div>
  );
};

const mapStateToProps = ({ tasks }) => ({ tasksState: tasks });
export default withRouter(
  connect(mapStateToProps, {
    getTaskFiles,
    clearTaskFiles,
  })(FilesDetails)
);
