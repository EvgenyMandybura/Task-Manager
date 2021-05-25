import {minSize, maxSize} from "../constants/imageSize";
import ToastrService from "../services/ToastrService";

export const changeHandlerImage = (file, fileModel, profileImage) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        fileModel.files = [file];
        profileImage.current = reader.result;
        const image = new Image();
        image.src = reader.result;
        image.onload = function () {
            if (( minSize <= this.width && this.width <=maxSize ) &&
                (minSize <= this.height && this.height <=maxSize )) {
                profileImage.current = reader.result;
            } else {
                ToastrService.warn("Image size must be more 100px and less 1000px");
            }
        };
    };
};

