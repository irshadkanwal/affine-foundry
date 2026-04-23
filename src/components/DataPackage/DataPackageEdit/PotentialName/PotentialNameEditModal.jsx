import { useUpdateDataPackagePotentialName } from "hooks/datapackage/useUpdateDataPackagePotentialName";
import React from "react";
import { AFFormModal, AFTextField } from "sharedComponents/Form";
import RequiredLabel from "sharedComponents/RequiredLabel";
import * as Yup from "yup";

function PotentialNameEditModal({
  isOpen,
  setIsOpen,
  selectedDataPackageId,
  selectedRowData,
}) {
  const {
    mutateAsync: updatePotentialName,
    isLoading: isUpdatePotentialNameLoading,
  } = useUpdateDataPackagePotentialName();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    regex: Yup.string().required(),
  });
  const initialValues = {
    name: selectedRowData?.potentialName,
    regex: selectedRowData?.regex,
  };
  const handleOnSubmit = async (formValues) => {
    await updatePotentialName({
      potentialName: formValues.name,
      regex: formValues.regex,
      dataPackageId: selectedDataPackageId,
      potentialNameId: selectedRowData.id,
    });
    setIsOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsOpen(false)}
      isLoading={isUpdatePotentialNameLoading}
      primaryButtonText="Save"
      isOpen={isOpen}
      initialValues={initialValues}
      title="Edit Potential Name"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField
        name="name"
        label={<RequiredLabel value={"Potential Name"} />}
      />
      <AFTextField
        name="regex"
        label={<RequiredLabel value={"Regex Expression"} />}
      />
    </AFFormModal>
  );
}
export default PotentialNameEditModal;
