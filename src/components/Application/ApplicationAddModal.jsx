import React from "react";
import * as Yup from "yup";
import { AFFormModal, AFTextField } from "sharedComponents/Form";
import { useCreateApplication } from "hooks/application/useCreateApplication";

function ApplicationAddModal({ isOpen, setIsOpen }) {
  const applicationValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    path: Yup.string().required(),
    className: Yup.string().required(),
    type: Yup.string().required(),
  });

  const { mutateAsync: createApplication, isLoading: isApplicationLoading } =
    useCreateApplication();

  const handleCreateApplication = async (formData) => {
    await createApplication({
      name: formData.name,
      path: formData.path,
      className: formData.className,
      applicationType: formData.type,
    });
    setIsOpen(false);
  };
  return (
    <>
      <AFFormModal
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreateApplication}
        title="New Application"
        validationSchema={applicationValidationSchema}
        primaryButtonText="Create"
        isLoading={isApplicationLoading}
        isOpen={isOpen}
        initialValues={{ name: "", path: "", className: "", type: "" }}
      >
        <AFTextField label="Name" name="name" />
        <AFTextField label="Path" name="path" />
        <AFTextField name="type" label={"Type"} />
        <AFTextField label="Class Name" name="className" />
      </AFFormModal>
    </>
  );
}

export default ApplicationAddModal;
