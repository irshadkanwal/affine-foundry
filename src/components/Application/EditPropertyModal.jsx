import * as Yup from "yup";
import React from "react";

import { AFFormModal, AFTextField } from "../../sharedComponents/Form";
import { useUpdateApplicationProp } from "hooks/application/useUpdateApplicationProp";

function EditPropertyModal({
  setIsEditPropertyModalOpen,
  isEditPropertyModalOpen,
  selectedRow,
  selectedApplicationId,
}) {
  const selectedRowData = selectedRow?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return { ...acc, [objectKey[1]]: value.value };
  }, {});
  const {
    mutateAsync: updateDataApplicationProp,
    isLoading: isUpdateApplicationPropLoading,
  } = useUpdateApplicationProp();
  const validationSchema = Yup.object().shape({
    key: Yup.string().required(),
    // position: Yup.string().required(),
    value: Yup.string().required(),
  });
  const initialValues = {
    key: selectedRowData.key,
    value: selectedRowData.value,
    position: selectedRowData.position,
  };
  const handleOnSubmit = async (formValues) => {
    const updatedPropertyData = {
      key: formValues.key,
      value: formValues.value,
      position: formValues.position,
      applicationId: selectedApplicationId,
      applicationPropId: selectedRow.id,
    };
    await updateDataApplicationProp(updatedPropertyData);
    setIsEditPropertyModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsEditPropertyModalOpen(false)}
      isLoading={isUpdateApplicationPropLoading}
      primaryButtonText="Save"
      isOpen={isEditPropertyModalOpen}
      initialValues={initialValues}
      title="Edit Property"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField name="key" label="Key" />
      <AFTextField name="value" label="Value" />
      <AFTextField name="position" label="Position" />
    </AFFormModal>
  );
}

export default EditPropertyModal;
