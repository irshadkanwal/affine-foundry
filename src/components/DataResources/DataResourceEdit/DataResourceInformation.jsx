import React from "react";
import * as Yup from "yup";
import { Information } from "@carbon/react/icons";
import FormSubmission from "components/FormSubmission/FormSubmission";
import { transformedDate } from "utils/transformedDate";
import { useUpdateDataResource } from "hooks/dataresources/useUpdateDataResource";
import {
  AFDropdown,
  AFForm,
  AFTextArea,
  AFTextField,
  AFCheckbox,
} from "sharedComponents/Form";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { useDataFormat } from "hooks/useDataFormat";
import { dataLevelType } from "../DataResourceAdd/DataResourceInformation";
import RequiredLabel from "sharedComponents/RequiredLabel";

function DataResourceInformation({
  selectedRow,
  setFormikBag,
  dataClass = [],
  transactionType = [],
  setIsOpen,
  setResourceName,
  setDataFormatType,
}) {
  const { data: dataPackage = [] } = useDataPackage();
  const { data: dataFormatData = [] } = useDataFormat();
  const {
    mutateAsync: updateDataResource,
    isLoading: isUpdateDataResourceLoading,
  } = useUpdateDataResource();

  const dataPackageOptions = dataPackage?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  const dataClassOtions = dataClass?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const transactionTypeOptions = transactionType?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const dataFormatOptions = dataFormatData?.map((data) => {
    return { value: data.id, label: data.name };
  });
  const dataLevelTypeOptions = dataLevelType.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const selectedRowData = selectedRow.cells
    ? selectedRow?.cells.reduce((acc, value) => {
        const objectKey = value.id.split(":");
        return {
          ...acc,
          [objectKey[1]]: value.value,
          archive: selectedRow.resourceArchive,
          autoProfileData: selectedRow.resourceAutoProfile,
          description: selectedRow.resourceDescription,
          dataPackage: selectedRow.dataPackageForResource,
          dataLevelType: selectedRow.dataLevelType,
        };
      }, {})
    : selectedRow;
  setResourceName(selectedRowData.name);
  const archivedLabel = selectedRowData?.archivedAt
    ? `Archived on ${transformedDate(selectedRowData?.archivedAt)}`
    : "Archive";

  const validationSchema = Yup.object().shape({
    dataPackage: Yup.object().required(),
    dataClass: Yup.object().required(),
    transactionType: Yup.object().required(),
    name: Yup.string().required(),
    dataFormat: Yup.object().required(),
    title: Yup.string().required(),
    dataLevelType: Yup.object().required(),
  });
  const initialValues = {
    dataPackage: dataPackageOptions?.filter(
      (item) => item?.value === selectedRowData.dataPackage.id
    )[0],
    dataClass: dataClassOtions?.filter(
      (listItem) => listItem.label === selectedRowData.dataClassName
    )[0],
    transactionType: transactionTypeOptions?.filter(
      (listItem) => listItem.label === selectedRowData.transactionTypeName
    )[0],
    name: selectedRowData.name,
    description: selectedRowData.description,
    dataFormat: dataFormatOptions?.filter(
      (item) => item.label === selectedRowData.dataFormatted
    )[0],
    title: selectedRowData.title,
    dataLevelType: dataLevelTypeOptions?.filter(
      (item) => item.value === selectedRowData.dataLevelType.id
    )[0],
    archiveDate: selectedRow.resourceArchive || selectedRowData.archive,
    autoProfile:
      selectedRow.resourceAutoProfile || selectedRowData.autoProfileData,
  };
  const updateDataResourceHandler = async (formValues) => {
    const resourceData = {
      name: formValues.name,
      title: formValues.title,
      description: formValues.description,
      dataPackageId: selectedRowData.dataPackage.id,
      userId: 1,
      dataClassId: formValues.dataClass.value,
      editable: false,
      transactionTypeId: formValues.transactionType.value,
      dataFormatId: formValues.dataFormat.value,
      autoProfileData: formValues.autoProfile,
      archive: formValues.archiveDate,
      dataLevelTypeId: formValues.dataLevelType.value,
    };
    await updateDataResource({
      resourceData,
      resourceId: selectedRow.id,
    });
    setIsOpen(false);
  };

  const handleOnsetChange = (value) => {
    const dataFormat = dataFormatOptions?.find((item) => item.value === value);
    setDataFormatType(dataFormat?.label);
  };
  return (
    <AFForm
      initialValues={initialValues}
      onSubmit={updateDataResourceHandler}
      validationSchema={validationSchema}
      isLoading={isUpdateDataResourceLoading}
    >
      <FormSubmission setFormikBag={setFormikBag} />
      <AFDropdown
        label={<RequiredLabel value={"Data Package"} />}
        name="dataPackage"
        size={8}
        options={dataPackageOptions}
        readOnly
      />
      <AFDropdown
        label={<RequiredLabel value={"Data Class"} />}
        name="dataClass"
        size={8}
        options={dataClassOtions}
      />
      <AFDropdown
        label={<RequiredLabel value="Transaction Type" />}
        name="transactionType"
        size={8}
        options={transactionTypeOptions}
      />
      <AFTextField
        name="name"
        label={<RequiredLabel value={"Name"} />}
        size={8}
      />
      <AFTextArea
        name="description"
        label="Description"
        maxLength={300}
        maxCount={300}
      />
      <AFDropdown
        name="dataFormat"
        label={<RequiredLabel value={"Data Format"} />}
        size={8}
        options={dataFormatOptions || []}
        setOnChangeValue={handleOnsetChange}
      />
      <AFTextField
        name="title"
        label={<RequiredLabel value={"Title"} />}
        size={8}
      />
      <AFDropdown
        name="dataLevelType"
        label={<RequiredLabel value={"Data Level Type"} />}
        options={dataLevelTypeOptions || []}
        size={8}
      />
      <AFCheckbox
        name="autoProfile"
        label="Yes"
        legend={
          <legend
            className="cds--label"
            style={{ display: "flex", gap: "5px" }}
          >
            Auto Profile
            <Information />
          </legend>
        }
        size={4}
      />
      <AFCheckbox
        name="archiveDate"
        label={archivedLabel}
        legend="Archive"
        size={4}
      />
    </AFForm>
  );
}

export default DataResourceInformation;
