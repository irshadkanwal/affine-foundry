import * as Yup from "yup";
import React from "react";
import { Loading, Modal, TextInput } from "@carbon/react";
import { Field, Form, Formik } from "formik";
import { useUpdateDataResourceDialectById } from "../../../hooks/dataresources/useUpdateDataResourceDialect";

function DataResourceDialectEditModal({
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
  const {
    mutateAsync: updateResourceDialectsById,
    isLoading: isDialectEditLoading,
  } = useUpdateDataResourceDialectById(
    selectedDataResourceId,
    selectedRowData.id
  );
  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required("This field is required"),
    value: Yup.string().required("This field is required"),
  });
  const initialValues = {
    displayName: selectedRowData.key,
    value: selectedRowData.value,
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const dialectData = {
            value: values.value,
            key: values.displayName,
            dataResourceId: selectedDataResourceId,
          };
          await updateResourceDialectsById(dialectData);
          setIsOpen(false);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { errors, touched } = props;

          return (
            <Modal
              open={isOpen}
              modalHeading="Edit Resource Dialect"
              primaryButtonText="Save"
              onRequestClose={() => setIsOpen(false)}
              size="sm"
              onRequestSubmit={props.handleSubmit}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
              secondaryButtonText="Cancel"
            >
              {isDialectEditLoading ? (
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
                  <Field name="displayName">
                    {({ field }) => (
                      <TextInput
                        id="key"
                        labelText="Display Name"
                        invalidText="A valid value is required"
                        size="xl"
                        {...field}
                        invalid={errors.displayName && touched.displayName}
                      />
                    )}
                  </Field>
                  <Field name="value">
                    {({ field }) => (
                      <TextInput
                        id="key"
                        labelText="Value"
                        invalidText="A valid value is required"
                        size="xl"
                        {...field}
                        invalid={errors.value && touched.value}
                      />
                    )}
                  </Field>
                </Form>
              )}
            </Modal>
          );
        }}
      </Formik>
    </div>
  );
}

export default DataResourceDialectEditModal;
