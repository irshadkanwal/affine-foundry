import React from "react";
import { Modal } from "@carbon/react";
function CustomModal({
  isOpen,
  modalHeading,
  buttonText,
  secondaryButtonText = "Cancel",
  onRequestSubmit,
  onRequestClose,
  children,
  passiveModal = false,
  primaryButtonDisabled,
  danger = false,
  modalLabel,
}) {
  return (
    <>
      <Modal
        danger={danger}
        open={isOpen}
        modalLabel={modalLabel}
        modalHeading={modalHeading}
        primaryButtonText={buttonText}
        primaryButtonDisabled={primaryButtonDisabled}
        onRequestClose={() => onRequestClose(false)}
        onRequestSubmit={onRequestSubmit}
        secondaryButtonText={secondaryButtonText}
        passiveModal={passiveModal}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        {children}
      </Modal>
    </>
  );
}
export default CustomModal;
