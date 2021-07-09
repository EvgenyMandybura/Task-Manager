import React from "react";
import { Button, Col, Modal, ModalBody, Row, ModalFooter } from "reactstrap";
import classNames from "classnames";
import styles from "./index.module.scss";
import AddMembersForm from "../forms/AddMembersForm";
import { useTranslation } from "react-i18next";

const AddMemberModalDialog = ({ isOpen, onCancel, membersArray }) => {
  const modalTitleStyles = classNames(styles.modalTitle, "text-center");
  const modalBtnStyles = classNames(
    styles.modalBtn,
    "w-100 no-shadow text-uppercase"
  );
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      centered
      className={"confirmation-modal"}
      toggle={() => onCancel()}
    >
      <ModalBody>
        <p className={modalTitleStyles}>
          {t("addMemberModalDialog.listOfMembers")}
        </p>
        <AddMembersForm membersArray={membersArray} />
      </ModalBody>
      <ModalFooter>
        <Button
          color="info"
          className={modalBtnStyles}
          onClick={() => onCancel()}
        >
          {t("addMemberModalDialog.returnToBoard")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddMemberModalDialog;
