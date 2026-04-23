import React from "react";
import * as Yup from "yup";
import { Modal, TextInput, CheckboxGroup, Checkbox } from "@carbon/react";
import { Field, Form, Formik } from "formik";
import { useCreateResourceSchema } from "../../../../hooks/dataresources/useCreateResourceSchema";

function DataResourceSchemaAddModal({
  isResourceSchemaAddModal,
  setIsResourceSchemaAddModal,
  selectedDataResourceId,
  selectedDataResourceName,
}) {
  const { mutateAsync: createResourceSchema } = useCreateResourceSchema();
  const createSchemaHandler = (formValues) => {
    const resourceSchemaData = {
      hasLookAhead: formValues.hasLookAhead,
      version: formValues.version,
      lookahead: formValues.lookAhead,
      dataResourceId: selectedDataResourceId,
      tableNameX: formValues.name,
    };
    createResourceSchema(resourceSchemaData);
    setIsResourceSchemaAddModal(false);
  };
  const initialValues = {
    resourceId: selectedDataResourceName,
    name: "",
    lookAhead: "",
    hasLookAhead: true,
    version: "",
  };
  const validationSchema = Yup.object().shape({
    resourceId: Yup.string().required(),
    name: Yup.string().required(),
    lookAhead: Yup.string().required(),
    version: Yup.string().required(),
  });

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        onSubmit={createSchemaHandler}
        initialValues={initialValues}
      >
        {(props) => (
          <Modal
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
            open={isResourceSchemaAddModal}
            onRequestSubmit={props.handleSubmit}
            onRequestClose={() => setIsResourceSchemaAddModal(false)}
            modalHeading="New Table"
            primaryButtonText="Add"
            size="sm"
            secondaryButtonText="Cancel"
          >
            <Form>
              <Field name="resourceId">
                {({ field, form }) => (
                  <TextInput
                    labelText="Data Resource"
                    invalidText="A valid value is required"
                    id="carbon-dropdown-example"
                    // items={selectedDataResourceId}
                    readOnly
                    value={selectedDataResourceName}
                    label="Choose an Option"
                    invalid={
                      props.errors.resourceId && props.touched.resourceId
                    }
                    {...field}
                    // onChange={(selectedItem) =>
                    //   form.setFieldValue(field.name, selectedItem.selectedItem)
                    // }
                  />
                )}
              </Field>
              <Field name="name">
                {({ field }) => (
                  <TextInput
                    id="name"
                    invalidText="A valid value is required"
                    labelText="Table Name"
                    size="xl"
                    {...field}
                    invalid={props.errors.name && props.touched.name}
                  />
                )}
              </Field>
              <Field name="hasLookAhead">
                {({ field }) => (
                  <CheckboxGroup legendText="">
                    <legend className="cds--label">Has Lookup Ahead</legend>
                    <Checkbox labelText={`No`} id="hasLookAhead" {...field} />
                  </CheckboxGroup>
                )}
              </Field>
              <Field name="lookAhead">
                {({ field }) => (
                  <TextInput
                    id="lookAhead"
                    invalidText="A valid value is required"
                    labelText="Look Ahead"
                    size="xl"
                    {...field}
                    invalid={props.errors.lookAhead && props.touched.lookAhead}
                  />
                )}
              </Field>
              <Field name="version">
                {({ field }) => (
                  <TextInput
                    id="version"
                    invalidText="A valid value is required"
                    labelText="Schema Version"
                    size="xl"
                    {...field}
                    invalid={props.errors.version && props.touched.version}
                  />
                )}
              </Field>
            </Form>
          </Modal>
        )}
      </Formik>
    </div>
  );
}

export default DataResourceSchemaAddModal;
