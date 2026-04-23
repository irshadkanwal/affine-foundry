import React from "react";
import * as Yup from "yup";
import { AFFormModal, AFTextField } from "sharedComponents/Form";
import { useCreateRuntimeProp } from "hooks/runtime/useCreateRuntimeProperty";

function AddNewProperty({
  setIsAddPropertyModalOpen,
  isAddPropertyModalOpen,
  selectedRuntimeId,
}) {
  const { mutateAsync: createRuntimeProp, isLoading: isRuntimePropLoading } =
    useCreateRuntimeProp();
  const validationSchema = Yup.object().shape({
    key: Yup.string().required(),
    value: Yup.string().required(),
    // position: Yup.string().required(),
  });
  const handleOnSubmit = async (formValues) => {
    const runtimePropData = {
      key: formValues.key,
      value: formValues.value,
      runtimeId: selectedRuntimeId,
    };
    await createRuntimeProp(runtimePropData);
    setIsAddPropertyModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddPropertyModalOpen(false)}
      isLoading={isRuntimePropLoading}
      primaryButtonText="Create"
      isOpen={isAddPropertyModalOpen}
      initialValues={{ key: "", value: "", position: "" }}
      title="New Property"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField name="key" label="Key" />
      <AFTextField name="value" label="Value" />
      {/* <AFTextField name="position" label="Position" /> */}
    </AFFormModal>
  );
}

export default AddNewProperty;
