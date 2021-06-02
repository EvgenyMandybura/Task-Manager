import React from "react";
import { Button, Col, Modal, ModalBody, Row, ModalFooter } from "reactstrap";
import classNames from "classnames";
import styles from "./index.module.scss";
import AddMembersForm from "../forms/AddMembersForm";

const AddMemberModalDialog = ({ isOpen, onCancel, membersArray }) => {
  const modalTitleStyles = classNames(styles.modalTitle, "text-center");
  const modalBtnStyles = classNames(
    styles.modalBtn,
    "w-100 no-shadow text-uppercase"
  );

  return (
    <Modal
      isOpen={isOpen}
      centered
      className={"confirmation-modal"}
      toggle={() => onCancel()}
    >
      <ModalBody>
        <p className={modalTitleStyles}>List of members:</p>
        <AddMembersForm membersArray={membersArray} />
      </ModalBody>
      <ModalFooter>
        <Button
          color="info"
          className={modalBtnStyles}
          onClick={() => onCancel()}
        >
          Return to board
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddMemberModalDialog;
