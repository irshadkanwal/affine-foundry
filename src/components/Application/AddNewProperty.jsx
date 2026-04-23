import React from "react";
import * as Yup from "yup";
import { AFFormModal, AFTextField } from "sharedComponents/Form";
import { useCreateApplicationProp } from "hooks/application/useCreateApplicationProp";

function AddNewProperty({
  setIsAddPropertyModalOpen,
  isAddPropertyModalOpen,
  selectedApplicationId,
}) {
  const {
    mutateAsync: createApplicationProp,
    isLoading: isApplicationPropLoading,
  } = useCreateApplicationProp();
  const validationSchema = Yup.object().shape({
    key: Yup.string().required(),
    value: Yup.string().required(),
    // position: Yup.string().required(),
  });
  const handleOnSubmit = async (formValues) => {
    const applicationPropData = {
      key: formValues.key,
      value: formValues.value,
      position: formValues.position,
      applicationId: selectedApplicationId,
    };
    //console.log("datatosee", applicationPropData);
    await createApplicationProp(applicationPropData);
    setIsAddPropertyModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddPropertyModalOpen(false)}
      isLoading={isApplicationPropLoading}
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
      <AFTextField name="position" label="Position" />
    </AFFormModal>
  );
}

export default AddNewProperty;
