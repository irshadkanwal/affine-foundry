import React from "react";
import * as Yup from "yup";
import {
  Modal,
  TextInput,
  CheckboxGroup,
  Checkbox,
  Loading,
} from "@carbon/react";
import { Information } from "@carbon/react/icons";
import { Field, Formik } from "formik";
import { Form } from "carbon-components-react";
import { useUpdateDataResourcePropById } from "../../../hooks/dataresources/useUpdateResourcePropertyByID";

function DataResourcePropertyEditModal({
  isOpen,
  setIsOpen,
  selectedRow,
  selectedDataResourceId,
}) {
  const selectedRowData = selectedRow?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return {
      ...acc,
      [objectKey[1]]: value.value,
      id: Number(objectKey[0]),
    };
  }, {});
  const validationSchema = Yup.object().shape({
    key: Yup.string().required("This field is required"),
    value: Yup.string().required("This field is required"),
  });

  const {
    mutateAsync: createDataResourcePropById,
    isLoading: isUpdateDataResourcePropLoading,
  } = useUpdateDataResourcePropById(selectedDataResourceId, selectedRowData.id);

  const handleUpdateProperties = async (formData) => {
    await createDataResourcePropById({
      key: formData.key,
      value: formData.value,
      appendToRecord: formData.appendToRecord,
      dataResourceId: selectedDataResourceId,
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
                isUpdateDataResourcePropLoading
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
              {isUpdateDataResourcePropLoading ? (
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
                        labelText="Key"
                        invalidText="A valid value is required"
                        size="xl"
                        {...field}
                        invalid={errors.key && touched.key}
                      />
                    )}
                  </Field>

                  <Field name="value">
                    {({ field }) => (
                      <TextInput
                        invalidText="A valid value is required"
                        id="value"
                        labelText="Value"
                        size="xl"
                        {...field}
                        invalid={errors.value && touched.value}
                      />
                    )}
                  </Field>
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
                          defaultChecked={field.value}
                          readOnly
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

export default DataResourcePropertyEditModal;
