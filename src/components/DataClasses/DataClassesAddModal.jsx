import React from "react";
import * as Yup from "yup";
import { Button, Column } from "@carbon/react";
import { useCreateDataClass } from "hooks/dataclass/useCreateDataClass";
import { AFFormModal, AFTextArea, AFTextField } from "sharedComponents/Form";

function DataClassesAddModal({ isAddModalOpen, setIsAddModalOpen }) {
  const { mutateAsync: createDataClass, isLoading: isCreateDataClassLoading } =
    useCreateDataClass();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });
  const handleSubmit = (formValues) => {
    //console.log(formValues);
    createDataClass();
  };

  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      primaryButtonText="Save as Draft"
      initialValues={{ name: "", category: "", description: "" }}
      isOpen={isAddModalOpen}
      validationSchema={validationSchema}
      title="New Data Class"
      onSubmit={handleSubmit}
      isLoading={isCreateDataClassLoading}
      modelSize="sm"
    >
      <AFTextField name="name" label="Name" />
      <AFTextField name="category" label="Primary Category" size={12} />
      <Column lg={4} md={4} sm={4} style={{ marginTop: "24px" }}>
        <Button kind="tertiary" size="md" style={{ width: "100%" }}>
          Change
        </Button>
      </Column>
      <AFTextArea
        name="description"
        maxCount={300}
        maxLength={300}
        label="Description"
      />
    </AFFormModal>
  );
}

export default DataClassesAddModal;
