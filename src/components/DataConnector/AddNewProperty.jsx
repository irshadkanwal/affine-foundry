import React from "react";
import * as Yup from "yup";
import { AFCheckbox, AFFormModal, AFTextField } from "sharedComponents/Form";
import { Information } from "@carbon/react/icons";
import { useCreateConnectionProp } from "hooks/dataconnectors/useCreateDataConnectionProperty";

function AddNewProperty({
  setIsAddPropertyModalOpen,
  isAddPropertyModalOpen,
  selectedConnectionId,
}) {
  const {
    mutateAsync: createConnectionProp,
    isLoading: isCreateConnectionPropLoading,
  } = useCreateConnectionProp();
  const validationSchema = Yup.object().shape({
    key: Yup.string().required(),
    value: Yup.string().required(),
  });
  const handleOnSubmit = async (formValues) => {
    const connectionPropData = {
      key: formValues.key,
      value: formValues.value,
      isSecret: !formValues.secretKey,
      connectionId: selectedConnectionId,
    };
    await createConnectionProp(connectionPropData);
    setIsAddPropertyModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddPropertyModalOpen(false)}
      isLoading={isCreateConnectionPropLoading}
      primaryButtonText="Create"
      isOpen={isAddPropertyModalOpen}
      initialValues={{ key: "", value: "", secretKey: "" }}
      title="New Property"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField name="key" label="Key" />
      <AFTextField name="value" label="Value" />
      <AFCheckbox
        name="secretKey"
        label="No"
        legend={
          <legend
            className="cds--label"
            style={{ display: "flex", gap: "5px" }}
          >
            Secret Key
            <Information />
          </legend>
        }
      />
    </AFFormModal>
  );
}

export default AddNewProperty;
