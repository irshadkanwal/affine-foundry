import React from "react";
import * as Yup from "yup";
import { Modal, Dropdown, Loading } from "@carbon/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUpdateDataCollaborator } from "../../../hooks/datacollaborators/useUpdateDataCollaborator";
import RequiredLabel from "sharedComponents/RequiredLabel";

function DataPackageCollaboratorEditModel({
  isOpen,
  setIsOpen,
  users,
  collaboratorRole,
  selectedData,
  selectedDataPackageId,
}) {
  const userList = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const validationSchema = Yup.object().shape({
    user: Yup.object().required("This field is required"),
    role: Yup.object().required("This field is required"),
  });
  const selectedRowData = selectedData?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return {
      ...acc,
      [objectKey[1]]: value.value,
      collaboratorId: Number(objectKey[0]),
    };
  }, {});
  const {
    mutateAsync: updateDataCollaborator,
    isLoading: isUpdateDataCollaboratorLoading,
  } = useUpdateDataCollaborator();

  const handleUpdateData = async (formData) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");
    const newCollaboratorData = {
      collaboratorId: selectedData.id,
      collaboratorRoleId: formData.role.id,
      dataPackageId: selectedDataPackageId,
      lastActivityAt: newDate[0],
      userId: formData.user.value,
    };
    await updateDataCollaborator(newCollaboratorData);
    setIsOpen(false);
  };
  const initialValues = {
    user: userList.filter((item) => item.label === selectedRowData.userName)[0],
    role: collaboratorRole.filter(
      (item) => item.role === selectedRowData.role
    )[0],
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(formData) => {
          handleUpdateData(formData);
        }}
      >
        {(props) => {
          const { errors, touched } = props;
          return (
            <Modal
              open={isOpen}
              modalHeading="New Collaborator"
              primaryButtonText={
                isUpdateDataCollaboratorLoading
                  ? "Updating Collaborator..."
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
              {isUpdateDataCollaboratorLoading ? (
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
                  <Field name="user">
                    {({ field, form }) => (
                      <Dropdown
                        id="carbon-dropdown-example"
                        items={userList}
                        label="Choose an Option"
                        titleText={<RequiredLabel value={"User"} />}
                        readOnly
                        selectedItem={field.value}
                        itemToString={(item) => (item ? item.label : "")}
                        invalid={errors.user && touched.user}
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
                      name="user"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <Field name="role">
                    {({ field, form }) => (
                      <Dropdown
                        id="carbon-dropdown-example"
                        items={collaboratorRole}
                        label="Choose an Option"
                        titleText={<RequiredLabel value={"Role"} />}
                        selectedItem={field.value}
                        itemToString={(item) => (item ? item.role : "")}
                        invalid={errors.role && touched.role}
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
                      name="role"
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

export default DataPackageCollaboratorEditModel;
