import * as Yup from "yup";
import React from "react";
import { Information } from "@carbon/react/icons";

import {
  AFCheckbox,
  AFFormModal,
  AFTextField,
} from "../../sharedComponents/Form";
import { useUpdateDataConnectionProp } from "../../hooks/dataconnectors/useUpdateDataConnectionProperty";

function EditPropertyModal({
  setIsEditPropertyModalOpen,
  isEditPropertyModalOpen,
  selectedRow,
  selectedConnectionId,
}) {
  const selectedRowData = selectedRow?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return { ...acc, [objectKey[1]]: value.value };
  }, {});
  const {
    mutateAsync: updateDataConnectionProp,
    isLoading: isUpdateConnectionPropLoading,
  } = useUpdateDataConnectionProp();
  const validationSchema = Yup.object().shape({
    key: Yup.string().required(),
    value: Yup.string().required(),
  });
  const initialValues = {
    key: selectedRowData.key,
    value: selectedRowData.value,
    secretKey: !selectedRowData.isSecret,
  };
  const handleOnSubmit = async (formValues) => {
    const updatedPropertyData = {
      key: formValues.key,
      value: formValues.value,
      isSecret: !formValues.secretKey,
      connectionId: selectedConnectionId,
      connectionPropId: selectedRow.id,
    };
    await updateDataConnectionProp(updatedPropertyData);
    setIsEditPropertyModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsEditPropertyModalOpen(false)}
      isLoading={isUpdateConnectionPropLoading}
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

export default EditPropertyModal;
