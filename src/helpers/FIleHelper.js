import { minSize, maxSize, imageSizeRules } from "../constants/imageSize";
import ToastrService from "../services/ToastrService";

const FileHelper = class BaseFileHelper {
  static openAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      if (reader.error) {
        return reject("Invalid file");
      }
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = function () {
          if (
            minSize <= this.width &&
            this.width <= maxSize &&
            minSize <= this.height &&
            this.height <= maxSize
          ) {
            return resolve(reader.result);
          } else {
            ToastrService.warn(imageSizeRules);
          }
        };
      };
    });
  }
};
export default FileHelper;
