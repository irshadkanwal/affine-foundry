import React from "react";
import * as Yup from "yup";
import { Cron } from "react-js-cron";

import {
  AFDropdown,
  AFFormModal,
  AFTextArea,
  AFTextField,
} from "../../../sharedComponents/Form";
import { useUpdateJob } from "hooks/workflow/useUpdateJob";
import { useJobTrigger } from "hooks/workflow/useJobTrigger";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import "react-js-cron/dist/styles.css";

function JobEditModal({ isEditModalOpen, setIsEditModalOpen, selectedRow }) {
  const [dropDownValue, setDropDownValue] = React.useState(
    selectedRow?.trigger
  );
  const selectedRowData = selectedRow;
  const [value, setValue] = React.useState(
    selectedRowData?.quartzCronExpression || ""
  );

  const { data: jobTrigger } = useJobTrigger();
  const { data: dataPackage } = useDataPackage();
  const jobTriggerOptions = jobTrigger?.map((data) => ({
    value: data?.id,
    label: data.name.charAt(0).toUpperCase() + data.name.slice(1),
  }));
  const dataPackageOptions = dataPackage?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  const { mutateAsync: updateAJob, isLoading: isUpdateJobLoading } =
    useUpdateJob();
  const validationSchema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   // trigger: Yup.object().required(),
    //   // dataPackage: Yup.object().required(),
//     maxConcurrentRuns: Yup.number().required(),
  });
  const initialValues = {
    name: selectedRowData.name,
    dataPackage: dataPackageOptions?.filter(
      (data) => data.value === selectedRowData?.dataPackageId
    )[0],
    trigger: jobTriggerOptions?.filter(
      (data) => data?.label?.toLowerCase() === selectedRowData?.trigger
    )[0],
    quartzCronExpression: selectedRowData?.quartzCronExpression,
    description: selectedRowData.description,
//     maxConcurrentRuns: selectedRowData.maxConcurrentTasks,
  };

  console.log('quartzCronExpression', selectedRowData?.quartzCronExpression);
  console.log('selectedRowData', selectedRowData);
  console.log('initialValues', initialValues);
  const handleOnSubmit = async (formValues) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");
    const jobData = {
      jobId: selectedRowData?.id,
      name: formValues.name,
      description: formValues.description,
      quartzCronExpression: formValues.trigger.label === "Scheduled" ? value : "",
      maxRetries: selectedRowData?.maxRetries,
//       maxConcurrentTasks: +formValues.maxConcurrentRuns,
      dataPackageId: 85,
      jobTriggerId: formValues?.trigger?.value,
      createdAt: newDate[0],
      userId: -1,
    };
    await updateAJob(jobData);
    setIsEditModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsEditModalOpen(false)}
      isLoading={isUpdateJobLoading}
      primaryButtonText="Save"
      isOpen={isEditModalOpen}
      initialValues={initialValues}
      title="Edit Job"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField name="name" label="Name" />
      {/* {dropDownValue === 2 && (
        <AFTextField name="quartzCronExpression" label="QuartzCron Exp." />
      )} */}
      <AFTextArea
        name="description"
        maxCount={300}
        maxLength={300}
        label="Description"
      />
{/*       <AFTextField name="maxConcurrentRuns" label="Max Concurrent Runs" /> */}
      <AFDropdown
        options={jobTriggerOptions || []}
        name="trigger"
        label="Trigger"
        setOnChangeValue={setDropDownValue}
      />
      <style>
        {`
        .ant-select-dropdown{
          z-index:99999
        }
        `}
      </style>

      {(dropDownValue === 3 || dropDownValue === "scheduled") && (
        <div>
          <Cron value={value} setValue={setValue} />
        </div>
      )}
    </AFFormModal>
  );
}
export default JobEditModal;
