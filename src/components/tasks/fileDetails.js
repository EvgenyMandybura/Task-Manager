import React, { useEffect, useState } from "react";
import { getTaskFiles, clearTaskFiles } from "../../redux/tasks/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { useTranslation } from "react-i18next";

const FilesDetails = ({ getTaskFiles, clearTaskFiles, tasksState }) => {
  const { loadingFiles, files } = tasksState;
  const fileUrls = tasksState.task[0].fileUrls;
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

  const options = {
    buttons: {
      showDownloadButton: false,
      showAutoplayButton: false,
      showThumbnailsButton: false,
    },
  };
  const { t } = useTranslation();
  return (
    <div>
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
          {readyFiles && files?.length > 0 ? (
            files?.map((file) => (
              <div key={file.name} className="task">
                <img
                  src={file.urlForDisplay}
                  alt={file.name}
                  className="taskImage"
                />
                <p>{file.name}</p>
              </div>
            ))
          ) : (
            <h3>{t("tasks.noFiles")}</h3>
          )}
        </SRLWrapper>
      </SimpleReactLightbox>
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
