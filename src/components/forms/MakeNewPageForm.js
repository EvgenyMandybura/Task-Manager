import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import fileValidation from "../../helpers/fileValidation";
import logoPlaceholder from "../../assets/ic-placeholder.svg";
import FileHelper from "../../helpers/FIleHelper";
import { createBoard, clearSavedMembers } from "../../redux/boards/actions";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import useModal from "../../hook/useModal";
import AddMemberModalDialog from "../modal/AddMemberModalDialog";
import { useTranslation } from "react-i18next";

const initialValues = {
  title: "",
  description: "",
  members: [],
};

const validationSchema = yup.object({
  title: validationSchemas.title,
  description: validationSchemas.description,
});

const MakeNewPageForm = ({
  createBoard,
  history,
  boardState,
  clearSavedMembers,
}) => {
  const handleSubmitForm = (values) => {
    const model = { values, history, fileModel };
    fileModel.files = [file];
    if (!!savedMembers) {
      model.values.members = savedMembers;
    }
    fileValidation(model, createBoard);
    clearSavedMembers();
  };
  const fileModel = {};
  const uploadedImage = useRef(null);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [file, setFile] = useState(null);
  const changeHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const promiseFile = await FileHelper.openAsDataUrl(file);
    await setImageUploaded(promiseFile);
  };
  const { t } = useTranslation();
  const [modalVisibleAdd, toggleModalAdd] = useModal();
  const savedMembers = boardState.savedMembers.members;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <Form className="w-100" onSubmit={handleSubmit}>
              <h3> {t("createNewBoard.createNewBoard")}</h3>
              <div>
                <img
                  src={imageUploaded ? imageUploaded : logoPlaceholder}
                  alt="Logo"
                  className="boardImage"
                />
                <div className="file-input">
                  <input
                    ref={uploadedImage}
                    type="file"
                    accept="image/*"
                    className="file"
                    id="file"
                    onChange={(e) => changeHandler(e)}
                  />
                  <label htmlFor="file" className="buttonLabel">
                    {t("createNewBoard.selectFile")}
                  </label>
                </div>
              </div>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"title"}
                label={t("createNewBoard.titleLabel")}
                placeholder={t("createNewBoard.titlePlaceholder")}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"description"}
                label={t("createNewBoard.descriptionLabel")}
                placeholder={t("createNewBoard.descriptionPlaceholder")}
              />
              <Button color="success" onClick={() => toggleModalAdd()}>
                {t("createNewBoard.inviteMembers")}
              </Button>
              {savedMembers && (
                <p className="listMembers">
                  {t("createNewBoard.listOfMembers")}
                </p>
              )}
              {savedMembers &&
                savedMembers.map((member) => <li key={member}>{member}</li>)}
              <AddMemberModalDialog
                isOpen={modalVisibleAdd}
                onCancel={toggleModalAdd}
                membersArray={[]}
              />
              <Button
                color="success"
                type="submit"
                className="buttonLabel"
                size="md"
              >
                {t("createNewBoard.continue")}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, { createBoard, clearSavedMembers })(MakeNewPageForm)
);
