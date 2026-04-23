import React from "react";
import * as Yup from "yup";

import { useCreateDataPackagePotentialName } from "hooks/datapackage/useCreateDataPackagePotentialName";
import { AFFormModal, AFTextField } from "sharedComponents/Form";
import RequiredLabel from "sharedComponents/RequiredLabel";

function PotentialNameAddModal({
  isAddModalOpen,
  setIsAddModalOpen,
  selectedDataPackageId,
}) {
  const {
    mutateAsync: createPotentialName,
    isLoading: IsCreatePotentialNameLoading,
  } = useCreateDataPackagePotentialName();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    regex: Yup.string().required(),
  });

  const initialValues = {
    name: "",
    regex: "",
  };

  const handleOnSubmit = async (formValues) => {
    await createPotentialName({
      potentialName: formValues.name,
      dataPackageId: selectedDataPackageId,
      regex: formValues.regex,
    });
    setIsAddModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      isLoading={IsCreatePotentialNameLoading}
      primaryButtonText="Create"
      isOpen={isAddModalOpen}
      initialValues={initialValues}
      title="New Potential Name"
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
export default PotentialNameAddModal;
