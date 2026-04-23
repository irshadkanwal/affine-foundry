import React from "react";
import * as Yup from "yup";
import { useUpdateApplication } from "hooks/application/useUpdateApplication";
import { AFFormModal, AFTextField } from "sharedComponents/Form";

function ApplicationEditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedData,
  isGridView,
}) {
  const selectedRowData = isGridView
    ? selectedData
    : selectedData?.cells.reduce((acc, value) => {
        const objectKey = value.id.split(":");
        return {
          ...acc,
          [objectKey[1]]: value.value,
          id: Number(objectKey[0]),
        };
      }, {});
  const { mutateAsync: updateApplication, isLoading: isApplicationLoading } =
    useUpdateApplication();
  const handleUpdateApplication = async (formData) => {
    await updateApplication({
      applicationId: selectedRowData?.id,
      name: formData.name,
      path: formData.path,
      className: formData.className,
      applicationType: formData.type,
    });
    setIsEditModalOpen(false);
  };
  const applicationValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    path: Yup.string().required(),
    className: Yup.string().required(),
    type: Yup.string().required(),
  });
  return (
    <AFFormModal
      initialValues={{
        name: selectedRowData?.name,
        path: selectedRowData?.path,
        className: selectedRowData?.className,
        type: selectedRowData?.applicationType,
      }}
      validationSchema={applicationValidationSchema}
      onClose={() => setIsEditModalOpen(false)}
      onSubmit={handleUpdateApplication}
      isOpen={isEditModalOpen}
      isLoading={isApplicationLoading}
      primaryButtonText="Save"
      title="Edit Application"
    >
      <AFTextField label="Name" name="name" />
      <AFTextField label="Path" name="path" />
      <AFTextField name={"type"} label={"Type"} />
      <AFTextField label="Class Name" name="className" />
    </AFFormModal>
  );
}

export default ApplicationEditModal;
