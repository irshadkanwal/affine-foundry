import React from "react";
import * as Yup from "yup";
import {
  Modal,
  TextInput,
  Loading,
  Checkbox,
  CheckboxGroup,
} from "@carbon/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Information } from "@carbon/react/icons";
import { useCreateDataPackageProperties } from "../../../hooks/datapackage/useCreateDataPackageProperties";
import RequiredLabel from "sharedComponents/RequiredLabel";

function DataPackagePropertiesAddModal({
  isOpen,
  setIsOpen,
  selectedDataPackageId,
}) {
  const {
    mutateAsync: createDataPackageProperties,
    isLoading: isDataPackagePropertiesLoading,
  } = useCreateDataPackageProperties();

  const validationSchema = Yup.object().shape({
    key: Yup.string().required("This field is required"),
    value: Yup.string().required("This field is required"),
  });

  const handleCreateProperties = async (formData) => {
    await createDataPackageProperties({
      key: formData.key,
      value: formData.value,
      appendToRecord: formData.appendToRecord,
      dataPackageId: selectedDataPackageId,
    });
    setIsOpen(false);
  };
  return (
    <>
      <Formik
        initialValues={{ key: "", value: "", appendToRecord: false }}
        validationSchema={validationSchema}
        onSubmit={(formData) => {
          handleCreateProperties(formData);
        }}
      >
        {(props) => {
          const { errors, touched } = props;
          return (
            <Modal
              open={isOpen}
              modalHeading="New Property"
              primaryButtonText={
                isDataPackagePropertiesLoading
                  ? "Creating Properties..."
                  : "Create"
              }
              onRequestClose={() => setIsOpen(false)}
              onRequestSubmit={props.handleSubmit}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
              secondaryButtonText="Cancel"
            >
              {isDataPackagePropertiesLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loading
                    description="Active loading indicator"
                    withOverlay={false}
                  />
                </div>
              ) : (
                <Form>
                  <Field name="key">
                    {({ field }) => (
                      <TextInput
                        id="key"
                        labelText={<RequiredLabel value={"Key"} />}
                        size="xl"
                        {...field}
                        invalid={errors.key && touched.key}
                      />
                    )}
                  </Field>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="key"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field name="value">
                    {({ field }) => (
                      <TextInput
                        id="value"
                        labelText={<RequiredLabel value={"Value"} />}
                        size="xl"
                        {...field}
                        invalid={errors.value && touched.value}
                      />
                    )}
                  </Field>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="value"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field name="appendToRecord">
                    {({ field }) => (
                      <CheckboxGroup legendText="">
                        <legend
                          className="cds--label"
                          style={{ display: "flex", gap: "5px" }}
                        >
                          Append To Record
                          <Information />
                        </legend>
                        <Checkbox
                          labelText={`Yes`}
                          id="appendToRecord"
                          {...field}
                        />
                      </CheckboxGroup>
                    )}
                  </Field>
                </Form>
              )}
            </Modal>
          );
        }}
      </Formik>
    </>
  );
}

export default DataPackagePropertiesAddModal;
