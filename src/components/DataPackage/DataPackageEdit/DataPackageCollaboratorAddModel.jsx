import React from "react";
import * as Yup from "yup";
import { Modal, Dropdown, Loading } from "@carbon/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateDataCollaborator } from "../../../hooks/datacollaborators/useCreateDataCollaborator";
import RequiredLabel from "sharedComponents/RequiredLabel";

function DataPackageCollaboratorAddModel({
  isOpen,
  setIsOpen,
  users = [],
  collaboratorRole = [],
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

  const {
    mutateAsync: createDataCollaborator,
    isLoading: isCreateDataCollaboratorLoading,
  } = useCreateDataCollaborator();

  const handleCreateData = async (formData) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");
    const newCollaboratorData = {
      collaboratorRoleId: formData.role.id,
      dataPackageId: selectedDataPackageId,
      lastActivityAt: newDate[0],
      userId: formData.user.value,
    };
    await createDataCollaborator(newCollaboratorData);
    setIsOpen(false);
  };
  return (
    <>
      <Formik
        initialValues={{ user: "", role: "" }}
        validationSchema={validationSchema}
        onSubmit={(formData) => {
          handleCreateData(formData);
        }}
      >
        {(props) => {
          const { errors, touched } = props;
          return (
            <Modal
              open={isOpen}
              modalHeading="New Collaborator"
              primaryButtonText={
                isCreateDataCollaboratorLoading
                  ? "Creating Collaborator..."
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
              {isCreateDataCollaboratorLoading ? (
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

export default DataPackageCollaboratorAddModel;
