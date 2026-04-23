import React from "react";
import * as Yup from "yup";
import { Field } from "formik";
import {
  Toggle,
  Checkbox,
  CheckboxGroup,
  Column,
} from "carbon-components-react";
import {
  AFDropdown,
  AFFormModal,
  AFMultiSelect,
  AFTextField,
} from "sharedComponents/Form";
import { useCreateTask } from "hooks/workflow/useCreateTask";
import { useApplication } from "hooks/application/useApplication";
import { Modal, MultiSelect } from "@carbon/react";
import { useCreateTaskNotification } from "hooks/workflow/useCreateTaskNotification";
import { useRuleWorkBook } from "hooks/ruleworkbook/useRuleWorkBook";

function JobDetailsTasksAddModal({
  isNewTask,
  jobId,
  setIsNewTask,
  taskNodesData = [],
  runTimeData = [],
}) {
  const [isNotificationOn, setIsNotificationOn] = React.useState(false);
  const { mutateAsync: createANewTask, isLoading: isCreateTaskLoading } =
    useCreateTask();

  const {
    mutateAsync: createTaskNotification,
    isLoading: isTaskNotificationLoading,
  } = useCreateTaskNotification();
  const [selectedTaskList, setSelectedTaskList] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(null);

  const { data: application } = useApplication();
  const { data: ruleWorkbook } = useRuleWorkBook();

  const runtimeOptions = runTimeData?.map((data) => ({
    label: data?.name,
    value: data?.id,
  }));
  const applicationOptions = application?.map((data) => ({
    label: data?.name,
    value: data?.id,
  }));

  const workbookOptions = ruleWorkbook?.map((data) => ({
    label: data?.name,
    value: data?.id,
  }));

  const dependsOnOptions = taskNodesData?.map((data) => ({
    label: data?.name,
    value: data?.id,
  }));
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    application: Yup.object().required(),
    runTime: Yup.object().required(),
    email: isNotificationOn ? Yup.string().email().required() : "",
  });
  const initialValues = {
    name: "",
    type: "",
    application: "",
    runTime: "",
    source: "",
    ruleWorkbook: "",
    email: "",
    notifyOn: [],
  };
  const handleOnSubmit = async (formValues) => {
    const taskData = {
      applicationId: formValues.application.value, //
      jobId: jobId, //
      name: formValues.name,
      parentId: 1,
      runtimeId: formValues.runTime.value,
      source: formValues.source,
      ruleWorkbookId: formValues.ruleWorkbook.value,
      taskTypeId: 1, //
      dependsOn: selectedTaskList?.map((data) => data?.value)?.join(","),
    };
    const createdTaskData = await createANewTask(taskData);

    const notificationData = {
      taskId: createdTaskData?.id,
      email: formValues?.email,
      success: formValues?.notifyOn?.includes("success"),
      failure: formValues?.notifyOn?.includes("failure"),
      start: formValues?.notifyOn?.includes("start"),
    };

    if (createdTaskData?.id) {
      await createTaskNotification(notificationData);
    }
    setIsNewTask(false);
  };
  return (
    <>
      <AFFormModal
        onClose={() => {
          setSelectedTaskList([]);
          setIsNewTask(false);
        }}
        isLoading={isCreateTaskLoading || isTaskNotificationLoading}
        primaryButtonText="Save"
        isOpen={isNewTask}
        initialValues={initialValues}
        title="New Task"
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
        modelSize="lg"
      >
        <AFTextField name="name" label="Task Name" size={8} />
        <AFDropdown
          options={applicationOptions || []}
          name="application"
          label="Application"
          size={8}
        />
        <AFDropdown
          options={runtimeOptions}
          name="runTime"
          label="Run-Time"
          size={8}
        />
        <AFTextField name="source" label="Source" size={8} />
        <AFDropdown
          options={workbookOptions || []}
          name="ruleWorkbook"
          label="Workbook"
          size={16}
        />
        <AFMultiSelect
          name="dependsOn"
          onMenuChange={() => setShowPopup(true)}
          selectedItems={selectedTaskList || []}
          options={dependsOnOptions || []}
          onChange={() => {
            setSelectedTaskList([]);
          }}
          label="Depends On"
        />
        <Column span={1} style={{ marginBottom: "20px" }}>
          <Field name="notification">
            {({ field }) => (
              <Toggle
                labelText="Notification"
                labelA=""
                labelB=""
                id="toggle-1"
                onClick={() => setIsNotificationOn((prev) => !prev)}
                {...field}
              />
            )}
          </Field>
        </Column>
        {isNotificationOn && (
          <>
            <Column
              span={4}
              style={{ marginBottom: "20px", paddingTop: "25px" }}
            >
              <Field name="notifyOn">
                {({ field }) => (
                  <CheckboxGroup
                    legendText=""
                    style={{ display: "flex", alignItem: "baseline" }}
                  >
                    <Checkbox
                      labelText="Start"
                      id="start"
                      {...field}
                      value="start"
                    />
                    <Checkbox
                      labelText="Success"
                      id="success"
                      {...field}
                      value="success"
                    />
                    <Checkbox
                      labelText="Failure"
                      id="failure"
                      {...field}
                      value="failure"
                    />
                  </CheckboxGroup>
                )}
              </Field>
            </Column>
            <AFTextField
              label={""}
              name="email"
              placeHolder="example@email.com"
              style={{ marginTop: "25px" }}
              size={11}
            />
          </>
        )}
      </AFFormModal>
      {showPopup && (
        <div>
          <style>
            {`.cds--modal-container{
              height:520px
            }
            .cds--list-box--expanded .cds--list-box__menu {
              max-height:330px;
            }
            `}
          </style>
          <Modal
            open={showPopup}
            modalHeading={"Select Task"}
            passiveModal
            onRequestClose={() => setShowPopup(false)}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
            size="md"
          >
            <MultiSelect
              items={dependsOnOptions || []}
              id="ms-1"
              initialSelectedItems={selectedTaskList || []}
              label="Choose option"
              name="DependOnOpt"
              onChange={({ selectedItems }) =>
                setSelectedTaskList(selectedItems)
              }
              titleText={"Depends On"}
              open
            />
          </Modal>
        </div>
      )}
    </>
  );
}
export default JobDetailsTasksAddModal;
