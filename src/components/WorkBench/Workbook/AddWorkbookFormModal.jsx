import React from "react";
import * as Yup from "yup";
import {
  AFDropdown,
  AFFormModal,
  AFRadioButtonGroup,
  AFTextField,
} from "sharedComponents/Form";
import { useCreateWorkbook } from "hooks/ruleworkbook/useCreateWorkbook";

const AddWorkbookFormModal = ({
  setIsAddWorkbookModalOpen,
  isAddWorkbookModalOpen,
  dataPackages = [],
}) => {
  const { mutateAsync: createWorkbook } = useCreateWorkbook();
  const initialValues = {
    dataPackageId: "",
    name: "",
    description: "",
    isProduction: false,
  };

  const workbookValidationSchema = Yup.object().shape({
    dataPackageId: Yup.object().optional(),
    name: Yup.string().required(),
    description: Yup.string().required(),
    isProduction: Yup.boolean().required().default(false),
  });

  const dataPackageOptions = dataPackages?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  const isProductionOptions = [
    { id: 1, value: "1", labelText: "Yes" },
    { id: 2, value: "0", labelText: "No" },
  ];

  const handleCreateWorkbook = async (values) => {
    const data = {
      dataPackageId: values.dataPackageId.value,
      name: values.name,
      description: values.description,
      isProduction: values.isProduction === "1" ? true : false,
    };
    await createWorkbook(data);
    setIsAddWorkbookModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddWorkbookModalOpen(false)}
      onSubmit={handleCreateWorkbook}
      validationSchema={workbookValidationSchema}
      initialValues={initialValues}
      isOpen={isAddWorkbookModalOpen}
      title="New Workbook"
      primaryButtonText="Create"
    >
      <AFDropdown
        name="dataPackageId"
        label="Data Package ID"
        options={dataPackageOptions}
      />
      <AFTextField name="name" label="Name" />
      <AFTextField name="description" label="Description" />
      <AFRadioButtonGroup
        name="isProduction"
        label="Is Production"
        options={isProductionOptions}
        orientation={"horizontal"}
      />
    </AFFormModal>
  );
};

export default AddWorkbookFormModal;
