import React from "react";
import * as Yup from "yup";
import {
  AFCheckbox,
  AFForm,
  AFTextArea,
  AFTextField,
} from "../../../sharedComponents/Form";
import FormSubmission from "../../FormSubmission/FormSubmission";
import { useCreateReferenceData } from "../../../hooks/referencedata/useCreateReferenceData";
import RequiredLabel from "sharedComponents/RequiredLabel";

function ReferenceDataAddOverView({ setFormikBag, setIsOpen }) {
  const {
    mutateAsync: createReferenceData,
    isLoading: isCreateReferenceLoading,
  } = useCreateReferenceData();

  const initialValues = {
    name: "",
    code: "",
    description: "",
    namespace: "",
    maintainVersion: false,
    maxVersionCount: "",
    versionIncrementIntervalDays: "",
    active: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    namespace: Yup.string().required(),
    maxVersionCount: Yup.number().required(),
    versionIncrementIntervalDays: Yup.number().required(),
  });

  const createReferenceDataHandler = async (formValues) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");

    const referenceData = {
      active: formValues.active, //
      cachingEnabled: false,
      code: formValues.code, //
      description: formValues.description, //
      forceRefresh: false,
      isBroadcastEligible: false,
      maintainVersion: formValues.maintainVersion, //
      maxVersionCount: +formValues.maxVersionCount, //
      name: formValues.name, //
      namespace: formValues.namespace, //
      preBuiltLookupCache: false,
      refreshCycle: 0,
      rowCount: 3,
      staticLookup: true,
      staticSource: true,
      versionIncrementIntervalDays: +formValues.versionIncrementIntervalDays, //
      visible: true,
      dataSource: "{}", //
      createdAt: newDate[0],
    };

    await createReferenceData(referenceData);
    setIsOpen(false);
  };
  return (
    <AFForm
      initialValues={initialValues}
      onSubmit={createReferenceDataHandler}
      validationSchema={validationSchema}
      isLoading={isCreateReferenceLoading}
    >
      <FormSubmission setFormikBag={setFormikBag} />
      <AFTextField
        name="name"
        label={<RequiredLabel value="Name" />}
        size={8}
      />
      <AFTextField
        name="code"
        size={8}
        label={<RequiredLabel value="Code" />}
      />

      <AFTextArea
        name="description"
        label="Description"
        placeholder="description"
        maxCount={300}
        maxLength={300}
      />
      <AFTextField
        name="namespace"
        label={<RequiredLabel value="Namespace" />}
      />
      <AFCheckbox
        name="maintainVersion"
        label="Yes"
        legend="Maintain Version"
        size={8}
      />

      <AFTextField
        name="maxVersionCount"
        label={<RequiredLabel value="Max. Version Counter" />}
        size={8}
      />

      <AFTextField
        name="versionIncrementIntervalDays"
        label={<RequiredLabel value="Version Incremental Days" />}
        size={8}
      />

      <AFCheckbox name="active" label="Active" legend="Status" size={8} />
    </AFForm>
  );
}

export default ReferenceDataAddOverView;
