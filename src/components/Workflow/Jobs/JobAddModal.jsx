import React from "react";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import {
  AFDropdown,
  AFFormModal,
  AFTextArea,
  AFTextField,
} from "../../../sharedComponents/Form";
import { Cron } from "react-js-cron";

import * as Yup from "yup";
import { useCreateJob } from "hooks/workflow/useCreateJob";
import { useJobTrigger } from "hooks/workflow/useJobTrigger";
import "react-js-cron/dist/styles.css";

function JobAddModel({ isAddModalOpen, setIsAddModalOpen }) {
  const [dropDownValue, setDropDownValue] = React.useState(null);
  const [value, setValue] = React.useState("");

  const { mutateAsync: createANewJob, isLoading: isCreateJobLoading } =
    useCreateJob();
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    // trigger: Yup.object().required(),
    // dataPackage: Yup.object().required(),
//     maxConcurrentRuns: Yup.number().required(),
  });

  const initialValues = {
    name: "",
    trigger: "",
    dataPackage: "",
    description: "",
//     maxConcurrentRuns: "",
  };

  const handleOnSubmit = async (formValues) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");

    const jobData = {
      name: formValues.name,
      description: formValues.description,
      quartzCronExpression: formValues.trigger.label === "Scheduled" ? value : "",
      maxRetries: 3,
      jobTriggerId: formValues.trigger.value,
//       maxConcurrentTasks: +formValues.maxConcurrentRuns,
      dataPackageId: formValues.dataPackage.value,
      userId: -1,
      createdAt: newDate[0],
    };
    await createANewJob(jobData);
    setIsAddModalOpen(false);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      isLoading={isCreateJobLoading}
      primaryButtonText="Create"
      isOpen={isAddModalOpen}
      initialValues={initialValues}
      title="New Job"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFDropdown
        label="Data Package"
        name="dataPackage"
        options={dataPackageOptions}
      />
      <AFTextField name="name" label="Name" />
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

      {dropDownValue === 3 && (
        <div>
          <Cron value={value} setValue={setValue} />
        </div>
      )}
    </AFFormModal>
  );
}
export default JobAddModel;
