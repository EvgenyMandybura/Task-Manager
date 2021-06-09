import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import classNames from "classnames";
import styles from "./index.module.scss";

const ConfirmationDialog = ({
  isOpen,
  titleText,
  contentText,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
}) => {
  const modalTitleStyles = classNames(styles.modalTitle, "text-center");
  const modalTextStyles = classNames(styles.modalText, "text-center");
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
        <p className={modalTitleStyles}>{titleText}</p>
        <p className={modalTextStyles}>{contentText}</p>
        <div className="d-flex flex-row justify-content-center">
          <Button
            color="secondary"
            size="lg"
            className={modalBtnStyles}
            onClick={() => onCancel()}
          >
            {cancelButtonText}
          </Button>
          <Button
            color="danger"
            size="lg"
            onClick={() => onConfirm()}
            className={modalBtnStyles}
          >
            {confirmButtonText}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmationDialog;
