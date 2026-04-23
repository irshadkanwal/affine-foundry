import React from "react";
import * as Yup from "yup";
import { Modal, TextInput, Dropdown, Loading } from "@carbon/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateConnection } from "hooks/dataconnectors/useCreateConnection";
import { useConnectionType } from "hooks/dataconnectors/useConnectionTypes";

function DataConnectorAddModal({ isOpen, setIsOpen, handleNameChange }) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    type: Yup.object().required("This field is required"),
  });

  const { data: connectionTypes = [] } = useConnectionType();

  const connectionTypeItems = connectionTypes?.map((connectionType) => {
    return {
      id: connectionType.id,
      label: connectionType.type,
    };
  });

  const { mutateAsync: createConnection, isLoading: isConnectionLoading } =
    useCreateConnection();

  const handleCreateConnection = async (formData) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");

    await createConnection({
      name: formData.name,
      type: formData.type.label,
      createdAt: newDate[0],
      active: true,
      connectionTypeId: formData.type.id,
    });

    setIsOpen(false);
  };
  return (
    <>
      <Formik
        initialValues={{ name: "", type: "", status: true }}
        validationSchema={validationSchema}
        onSubmit={(formData) => {
          handleCreateConnection(formData);
        }}
      >
        {(props) => {
          const { errors, touched } = props;
          return (
            <Modal
              open={isOpen}
              modalHeading="New Data Connection"
              primaryButtonText={
                isConnectionLoading ? "Creating Connection..." : "Create"
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
              {isConnectionLoading ? (
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
                  <Field name="name">
                    {({ field }) => (
                      <TextInput
                        id="name"
                        labelText="Name"
                        placeholder="Data connection name"
                        onChange={handleNameChange}
                        size="xl"
                        {...field}
                        invalid={errors.name && touched.name}
                      />
                    )}
                  </Field>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <Field name="type">
                    {({ field, form }) => (
                      <Dropdown
                        id="carbon-dropdown-example"
                        items={connectionTypeItems}
                        label="Choose an Option"
                        titleText="Types"
                        invalid={errors.type && touched.type}
                        {...field}
                        onChange={(selectedItem) =>
                          form.setFieldValue(
                            field.name,
                            selectedItem.selectedItem
                          )
                        }
                      />
                    )}
                  </Field>
                  <div style={{ color: "red" }}>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </Form>
              )}
            </Modal>
          );
        }}
      </Formik>
    </>
  );
}

export default DataConnectorAddModal;
