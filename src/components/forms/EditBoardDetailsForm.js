import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { useRouteMatch, withRouter } from "react-router-dom";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import FileHelper from "../../helpers/FIleHelper";
import {
  editBoard,
  getBoard,
  clearBoardFetched,
  clearSavedMembers,
} from "../../redux/boards/actions";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import ContainerUser from "../layout/ContainerUser";
import useModal from "../../hook/useModal";
import AddMemberModalDialog from "../modal/AddMemberModalDialog";
import ListOfMembersDetail from "../members/ListOfMembersDetail";
import { useTranslation } from "react-i18next";

const validationSchema = yup.object({
  title: validationSchemas.title,
  description: validationSchemas.description,
});

const EditBoardDetailsForm = ({
  editBoard,
  getBoard,
  clearBoardFetched,
  history,
  boardState,
  clearSavedMembers,
}) => {
  const {
    params: { boardId },
  } = useRouteMatch("/edit-board-details/:boardId");
  const { loading, board: board } = boardState;
  const [ready, updateReady] = useState(false);
  const fetchBoard = () => {
    getBoard(boardId);
  };
  useEffect(() => {
    fetchBoard();
    updateReady(true);
    return () => {
      clearBoardFetched();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchBoard();
    }
  }, []);

  const handleSubmitForm = (values) => {
    const model = { values, history, fileModel };
    model.values.boardId = boardId;
    if (savedMembers) {
      model.values.members = savedMembers;
    }
    fileModel.files = [file];
    editBoard(model);
    clearSavedMembers();
  };
  const uploadedImage = useRef(null);
  const fileModel = {};
  const [imageUploaded, setImageUploaded] = useState(null);
  const [file, setFile] = useState(null);

  const changeHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const promiseFile = await FileHelper.openAsDataUrl(file);
    await setImageUploaded(promiseFile);
  };

  const [modalVisibleAdd, toggleModalAdd] = useModal();
  const savedMembers = boardState.savedMembers.members;
  const initialValues = {
    title: board?.title,
    description: board?.description,
    members: board?.members,
  };
  const { t } = useTranslation();
  return (
    <ContainerUser>
      {ready && !loading && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ errors, touched, handleSubmit }) => {
            return (
              <Form className="w-100" onSubmit={handleSubmit}>
                <h3>{t("editBoardDetailsForm.editBoard")}</h3>
                <div>
                  <img
                    alt="Logo"
                    className="boardImage"
                    src={imageUploaded ? imageUploaded : board.fileUrl}
                  />
                  <div className="file-input">
                    <input
                      type="file"
                      accept="image/*"
                      className="file"
                      id="file"
                      ref={uploadedImage}
                      onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="file" className="buttonLabel">
                      {t("editBoardDetailsForm.selectFile")}
                    </label>
                  </div>
                </div>
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"title"}
                  label={t("editBoardDetailsForm.titleLabel")}
                  placeholder={t("editBoardDetailsForm.titlePlaceholder")}
                />
                <FormikFormGroup
                  errors={errors}
                  touched={touched}
                  fieldName={"description"}
                  label={t("editBoardDetailsForm.descriptionLabel")}
                  placeholder={t("editBoardDetailsForm.descriptionPlaceholder")}
                />
                <Button color="success" onClick={() => toggleModalAdd()}>
                  {t("editBoardDetailsForm.inviteEditMembers")}
                </Button>
                <ListOfMembersDetail
                  members={!!savedMembers ? savedMembers : board.members}
                />
                <AddMemberModalDialog
                  isOpen={modalVisibleAdd}
                  onCancel={toggleModalAdd}
                  membersArray={board?.members}
                />
                <Button
                  color="success"
                  type="submit"
                  className="buttonLabel"
                  size="md"
                >
                  {t("editBoardDetailsForm.continue")}
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
    </ContainerUser>
  );
};

const mapStateToProps = ({ boards }) => ({ boardState: boards });

export default withRouter(
  connect(mapStateToProps, {
    editBoard,
    getBoard,
    clearBoardFetched,
    clearSavedMembers,
  })(EditBoardDetailsForm)
);
