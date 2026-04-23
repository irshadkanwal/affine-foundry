import React from "react";
import * as Yup from "yup";
import { AFCheckbox, AFFormModal, AFTextField } from "sharedComponents/Form";
import { useCreateDataResourceDialect } from "../../../hooks/dataresources/useCreateResourceDialect";

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required("This field is required"),
  value: Yup.string().required("This field is required"),
});

const initialValues = {
  displayName: "",
  value: "",
};

const textDelimitedValidationSchema = Yup.object().shape({
  skipLines: Yup.string()
    .matches(/^(\d+(-\d+)?,?)+$/, "Invalid range format (e.g., 1-5,2,6-8)")
    .required("This field is required"),
  skipFooter: Yup.number()
    .integer("Must be an integer")
    .min(0, "Must be at least 0")
    .required("This field is required"),
  delimiter: Yup.string()
    .max(1, "Delimiter must be a single character")
    .required("This field is required"),
  header: Yup.boolean().required("This field is required"),
  comment: Yup.string()
    .length(1, "Comment must be a single character")
    .required("This field is required"),
  fileNamingConvention: Yup.string()
    .matches(/^[\w, ]+$/, "Invalid format")
    .required("This field is required"),
});

const textDelimitedInitialValues = {
  skipLines: "",
  skipFooter: "",
  delimiter: "",
  header: false,
  comment: "",
  fileNamingConvention: "",
};

function DataResourceDialectAddModal({
  isDataResourceDialectAddModalOpen,
  setIsDataResourceDialectAddModalOpen,
  selectedDataResourceId,
  dataFormatType,
}) {
  const {
    mutateAsync: createDataResourceDialect,
    isLoading: isDialectAddLoading,
  } = useCreateDataResourceDialect(selectedDataResourceId);

  const handleCreateDialects = async (formData) => {
    //console.log("handleSubmit");
    const dialectData =
      dataFormatType === "Text_Delimited"
        ? {
            dataResourceId: selectedDataResourceId,
            ...formData,
          }
        : {
            dataResourceId: selectedDataResourceId,
            key: formData.displayName,
            value: formData.value,
          };
    await createDataResourceDialect(dialectData);
    setIsDataResourceDialectAddModalOpen(false);
  };

  return (
    <AFFormModal
      initialValues={
        dataFormatType === "Text_Delimited"
          ? textDelimitedInitialValues
          : initialValues
      }
      validationSchema={
        dataFormatType === "Text_Delimited"
          ? textDelimitedValidationSchema
          : validationSchema
      }
      isOpen={isDataResourceDialectAddModalOpen}
      onClose={() => setIsDataResourceDialectAddModalOpen(false)}
      onSubmit={handleCreateDialects}
      title="New Resource Dialect"
      loading={isDialectAddLoading}
    >
      {dataFormatType === "Text_Delimited" ? (
        <>
          <AFTextField name="skipLines" label="Skip Lines" />
          <AFTextField name="skipFooter" label="Skip Footer" />
          <AFTextField name="delimiter" label="Delimiter" />
          <AFCheckbox name="header" label="Header" legend="Header" />
          <AFTextField name="comment" label="Comment" />
          <AFTextField
            name="fileNamingConvention"
            label="File Naming Convention"
          />
        </>
      ) : (
        <>
          <AFTextField name="displayName" label="Display Name" />
          <AFTextField name="value" label="Value" />
        </>
      )}
    </AFFormModal>
  );
}

export default DataResourceDialectAddModal;
