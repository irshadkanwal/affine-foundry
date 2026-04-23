import React from "react";
import * as Yup from "yup";
import FormSubmission from "components/FormSubmission/FormSubmission";
import {
  AFForm,
  AFDropdown,
  AFTextField,
  AFTextArea,
} from "sharedComponents/Form";
import { useDataClassbyLevel } from "hooks/dataclass/useDataClassbyLevel";
import { useTransactionType } from "hooks/dataTransaction/useTransactionType";
import { useCreateDataResource } from "hooks/dataresources/useCreateDataResource";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { useDataFormat } from "hooks/useDataFormat";
import RequiredLabel from "sharedComponents/RequiredLabel";
export const dataLevelType = [
  { id: 1, name: "Raw" },
  { id: 2, name: "Bronze" },
  { id: 3, name: "Silver" },
  { id: 4, name: "Gold" },
];
function DataResourceInformation({ setFormikBag, setIsOpen }) {
  const { data: dataClass = [] } = useDataClassbyLevel(1);
  const { data: transactionType = [] } = useTransactionType();
  const { data: dataPackage = [] } = useDataPackage();
  const { data: dataFormatData = [] } = useDataFormat();
  const {
    mutateAsync: createDataResource,
    isLoading: isCreateDataResourceLoading,
  } = useCreateDataResource();

  const validationSchema = Yup.object().shape({
    dataPackage: Yup.object().required(),
    dataClass: Yup.object().required(),
    transactionType: Yup.object().required(),
    name: Yup.string().required(),
    dataFormat: Yup.object().required(),
    dataLevelType: Yup.object().required(),
    title: Yup.string().required(),
  });
  const initialValues = {
    dataPackage: "",
    dataClass: "",
    transactionType: "",
    name: "",
    description: "",
    dataLevelType: "",
    dataFormat: "",
    title: "",
  };
  const dataFormatOptions = dataFormatData?.map((data) => {
    return { value: data.id, label: data.name };
  });
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
  const dataLevelTypeOptions = dataLevelType.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const createDataResourceHanlder = async (formValues) => {
    const resourceData = {
      name: formValues.name,
      title: formValues.title,
      description: formValues.description,
      archive: false,
      autoProfileData: false,
      dataPackageId: formValues.dataPackage.value, //
      userId: 1, //
      dataClassId: formValues.dataClass.value,
      editable: false,
      transactionTypeId: formValues.transactionType.value,
      dataFormatId: formValues.dataFormat.value,
      dataLevelTypeId: formValues.dataLevelType.value,
    };
    await createDataResource(resourceData);
    setIsOpen(false);
  };

  return (
    <AFForm
      initialValues={initialValues}
      onSubmit={createDataResourceHanlder}
      validationSchema={validationSchema}
      isLoading={isCreateDataResourceLoading}
    >
      <FormSubmission setFormikBag={setFormikBag} />
      <AFDropdown
        label={<RequiredLabel value={"Data Package"} />}
        name="dataPackage"
        size={8}
        options={dataPackageOptions}
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
        size={8}
        label={<RequiredLabel value={"Name"} />}
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
      />
      <AFTextField
        name="title"
        size={8}
        label={<RequiredLabel value={"Title"} />}
      />
      <AFDropdown
        name="dataLevelType"
        label={<RequiredLabel value={"Data Level Type"} />}
        options={dataLevelTypeOptions || []}
      />
    </AFForm>
  );
}

export default DataResourceInformation;
