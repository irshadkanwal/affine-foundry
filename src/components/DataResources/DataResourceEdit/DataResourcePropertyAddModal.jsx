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
import { useCreateDataResourceProp } from "../../../hooks/dataresources/useCreateDataResourceProp";

function DataResourcePropertyAddModal({
  isDataResourcePropertyAddModalOpen,
  selectedDataResourceId,
  setIsDataResourcePropertyAddModalOpen,
}) {
  const validationSchema = Yup.object().shape({
    key: Yup.string().required("This field is required"),
    value: Yup.string().required("This field is required"),
  });
  const {
    mutateAsync: createDataResourceProp,
    isLoading: isCreateDataResourcePropLoading,
  } = useCreateDataResourceProp(selectedDataResourceId);
  const handleCreateProperties = async (formData) => {
    await createDataResourceProp({
      key: formData.key,
      value: formData.value,
      appendToRecord: formData.appendToRecord,
      dataResourceId: selectedDataResourceId,
    });
    setIsDataResourcePropertyAddModalOpen(false);
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
              open={isDataResourcePropertyAddModalOpen}
              modalHeading="New Property"
              primaryButtonText={
                isCreateDataResourcePropLoading
                  ? "Creating Properties..."
                  : "Create"
              }
              onRequestClose={() =>
                setIsDataResourcePropertyAddModalOpen(false)
              }
              onRequestSubmit={props.handleSubmit}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
              secondaryButtonText="Cancel"
            >
              {isCreateDataResourcePropLoading ? (
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
                        id="value"
                        labelText="Value"
                        invalidText="A valid value is required"
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

export default DataResourcePropertyAddModal;
