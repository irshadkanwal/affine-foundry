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
import { useUpdateDataPackageProperties } from "../../../hooks/datapackage/useUpdateDataPackageProperties";
import RequiredLabel from "sharedComponents/RequiredLabel";

function DataPackagePropertiesEditModal({
  isOpen,
  setIsOpen,
  selectedDataPackageId,
  selectedRow,
}) {
  const {
    mutateAsync: updateeDataPackageProperties,
    isLoading: isDataPackagePropertiesLoading,
  } = useUpdateDataPackageProperties();

  const validationSchema = Yup.object().shape({
    key: Yup.string().required("This field is required"),
    value: Yup.string().required("This field is required"),
  });

  const selectedRowData = selectedRow?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return {
      ...acc,
      [objectKey[1]]: value.value,
      id: Number(objectKey[0]),
    };
  }, {});

  const handleUpdateProperties = async (formData) => {
    await updateeDataPackageProperties({
      key: formData.key,
      value: formData.value,
      appendToRecord: formData.appendToRecord,
      dataPackageId: selectedDataPackageId,
      id: selectedRowData.id,
    });
    setIsOpen(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          key: selectedRowData.key,
          value: selectedRowData.value,
          appendToRecord: selectedRowData.appendToRecord,
        }}
        validationSchema={validationSchema}
        onSubmit={(formData) => {
          handleUpdateProperties(formData);
        }}
      >
        {(props) => {
          const { errors, touched } = props;
          return (
            <Modal
              open={isOpen}
              modalHeading="Edit Property"
              primaryButtonText={
                isDataPackagePropertiesLoading
                  ? "Upadting Properties..."
                  : "Save"
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
                          defaultChecked={field.value}
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

export default DataPackagePropertiesEditModal;
