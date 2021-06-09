import pdfIcon from "../assets/pdfIcon.svg";
import docxIcon from "../assets/docsIcon.svg";
import fileIcon from "../assets/fileIcon.svg";

const fileIcons = (fileType) => {
  switch (fileType) {
    case "application/pdf":
      return pdfIcon;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return docxIcon;
    default:
      return fileIcon;
  }
};

export default fileIcons;
