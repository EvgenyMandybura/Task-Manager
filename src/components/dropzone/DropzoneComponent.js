import React, { useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { setTaskFiles } from "../../redux/tasks/actions";
import { useTranslation } from "react-i18next";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#D3D3D3",
  color: "#808080",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneComponent({ setTaskFiles }) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    setTaskFiles(files);
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="task">
        <img src={file.preview} className="taskImage" />
        <p>
          {file.path} - {file.size} bytes
        </p>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const { t } = useTranslation();
  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{t("dropZone.dragAndDrop")}</p>
        <Button type="button" onClick={open}>
          {t("dropZone.openFileDialog")}
        </Button>
      </div>
      <aside className="thumbsContainer">{thumbs}</aside>
    </div>
  );
}

const mapStateToProps = () => ({});
export default withRouter(
  connect(mapStateToProps, { setTaskFiles })(DropzoneComponent)
);
