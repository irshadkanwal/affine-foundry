import React from "react";
import * as Yup from "yup";
import FormSubmission from "../../FormSubmission/FormSubmission";
import {
  AFCheckbox,
  AFForm,
  AFTextArea,
  AFTextField,
} from "../../../sharedComponents/Form";
import { useUpdateReferenceData } from "../../../hooks/referencedata/useUpdateReferenceData";
import RequiredLabel from "sharedComponents/RequiredLabel";

function ReferenceDataOverView({
  selectedRowData,
  setFormikBag,
  setIsOpen,
  setModalButtonConfig,
  setIsOverviewData,
}) {
  const {
    mutateAsync: updateReferenceData,
    isLoading: isUpdateReferenceDataLoading,
  } = useUpdateReferenceData();

  const initialValues = {
    name: selectedRowData.name,
    code: selectedRowData.code,
    description: selectedRowData.description,
    namespace: selectedRowData.namespace,
    maintainVersion: selectedRowData.maintainVersion,
    maxVersionCount: selectedRowData.maxVersionCount,
    versionIncrementIntervalDays: selectedRowData.versionIncrementIntervalDays,
    active: selectedRowData.active,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    namespace: Yup.string().required(),
    maxVersionCount: Yup.number().required(),
    versionIncrementIntervalDays: Yup.number().required(),
  });

  React.useEffect(() => {
    //is Submitting is updated when ever isLoading Changes while preventing old config

    setModalButtonConfig((prev) => ({
      ...prev,
      isSubmitting: isUpdateReferenceDataLoading,
    }));
  }, [isUpdateReferenceDataLoading, setModalButtonConfig]);

  const updateReferenceDataHanlder = async (formValues) => {
    const referenceData = {
      active: formValues.active, //
      cachingEnabled: selectedRowData.cachingEnabled,
      code: formValues.code, //
      description: formValues.description, //
      forceRefresh: selectedRowData.forceRefresh,
      isBroadcastEligible: selectedRowData.isBroadcastEligible,
      maintainVersion: formValues.maintainVersion, //
      maxVersionCount: +formValues.maxVersionCount, //
      name: formValues.name, //
      namespace: formValues.namespace, //
      preBuiltLookupCache: selectedRowData.preBuiltLookupCache,
      refreshCycle: selectedRowData.refreshCycle,
      rowCount: selectedRowData.rowCount,
      staticLookup: selectedRowData.staticLookup,
      staticSource: selectedRowData.staticSource,
      versionIncrementIntervalDays: +formValues.versionIncrementIntervalDays, //
      visible: selectedRowData.visible,
      dataSource: selectedRowData.dataSource, //
      createdAt: selectedRowData.createdAt,
    };
    setIsOverviewData(referenceData);

    await updateReferenceData({
      referenceData,
      referenceId: selectedRowData.id,
    });

    // setIsOpen(false);
  };
  return (
    <AFForm
      initialValues={initialValues}
      onSubmit={updateReferenceDataHanlder}
      validationSchema={validationSchema}
      isLoading={isUpdateReferenceDataLoading}
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

export default ReferenceDataOverView;
