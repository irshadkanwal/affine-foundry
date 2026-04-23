import React from "react";
import * as Yup from "yup";
import { Modal, TextInput, Dropdown, Loading } from "@carbon/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUpdateDataConnecter } from "../../hooks/dataconnectors/useUpdateDataConnector";
import { useConnectionType } from "../../hooks/dataconnectors/useConnectionTypes";

function DataConnectorEditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedData,
}) {
  const selectedRowData = selectedData;
  // ?.cells.reduce((acc, value) => {
  //   const objectKey = value.id.split(":");
  //   return {
  //     ...acc,
  //     [objectKey[1]]: value.value,
  //     DataConnecterID: Number(objectKey[0]),
  //   };
  // }, {});

  const { data: connectionTypes = [] } = useConnectionType();

  const connectionTypeItems = connectionTypes?.map((connectionType) => {
    return {
      id: connectionType.id,
      label: connectionType.type,
    };
  });

  const { mutateAsync: updateConnection, isLoading: isConnectionLoading } =
    useUpdateDataConnecter();
  const handleUpdateConnection = async (formData) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");
    const type = formData.type.label ? formData.type.label : formData.type;
    const typeIndex = connectionTypeItems?.findIndex(
      (connectionTypeItem) => connectionTypeItem.label === type
    );
    const connectionTypeId = connectionTypeItems[typeIndex].id;
    await updateConnection({
      connectionId: selectedRowData.id,
      name: formData.name,
      createdAt: newDate[0],
      type,
      active: formData.status === "active" ? true : false,
      connectionTypeId,
    });
    setIsEditModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
  });

  const initialValues = {
    name: selectedRowData.name,
    type: selectedRowData.type,
    status: selectedRowData.active === true ? "active" : "inactive",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(formData) => handleUpdateConnection(formData)}
    >
      {(props) => (
        <Modal
          open={isEditModalOpen}
          modalHeading="Edit Data Connection"
          primaryButtonText={
            isConnectionLoading ? "Updating Connection..." : "Save"
          }
          onRequestClose={() => setIsEditModalOpen(false)}
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
                    invalid={props.errors.name && props.touched.name}
                    labelText="Name"
                    placeholder="Data connection name"
                    size="xl"
                    {...field}
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
                    selectedItem={field.value}
                    titleText="Types"
                    {...field}
                    onChange={(selectedItem) =>
                      form.setFieldValue(field.name, selectedItem.selectedItem)
                    }
                  />
                )}
              </Field>
              <div id="my-radio-group">Status</div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="status" value="active" />
                  Active
                </label>
                <label>
                  <Field type="radio" name="status" value="inactive" />
                  Inactive
                </label>
              </div>
            </Form>
          )}
        </Modal>
      )}
    </Formik>
  );
}

export default DataConnectorEditModal;
