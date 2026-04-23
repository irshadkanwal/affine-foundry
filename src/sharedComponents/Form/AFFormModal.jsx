import React from "react";
import { Modal, Loading, Grid } from "@carbon/react";
import { Formik, Form } from "formik";

export default function AFFormModal({
  onSubmit,
  initialValues,
  validationSchema,
  title,
  isOpen,
  modelSize,
  onClose,
  isLoading = false,
  loadingMessage = "Loading...",
  primaryButtonText = "Save",
  children,
  setHeight = false,
  preventOutsideClick = true,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
        <Modal
          open={isOpen}
          modalHeading={title}
          primaryButtonText={primaryButtonText}
          secondaryButtonText="Cancel"
          primaryButtonDisabled={isLoading}
          onRequestClose={onClose}
          onRequestSubmit={handleSubmit}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
          size={modelSize}
          preventCloseOnClickOutside={preventOutsideClick}
        >
          <div
            style={{
              height: setHeight ? "350px" : "",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading description={loadingMessage} withOverlay={false} />
              </div>
            ) : (
              <Form>
                <Grid style={{ padding: 0 }}>{children}</Grid>
              </Form>
            )}
          </div>
        </Modal>
      )}
    </Formik>
  );
}
