import ToastrService from "../services/ToastrService";

const fileValidation = (model, sendFunction) => {
    if ( model.fileModel.files ){
        sendFunction(model);
    } else {
        ToastrService.warn("You need to upload a photo!")
    }
};

export default fileValidation;