import React from "react";
import * as Yup from "yup";
import { Field } from "formik";
import {
  Toggle,
  Checkbox,
  CheckboxGroup,
  Column,
} from "carbon-components-react";
import { TrashCan } from "@carbon/icons-react";
import {
  AFDropdown,
  AFFormModal,
  AFMultiSelect,
  AFTextField,
} from "sharedComponents/Form";
import { useUpdateTask } from "hooks/workflow/useUpdateTask";
import { useApplication } from "hooks/application/useApplication";
import { IconButton, Modal, MultiSelect } from "@carbon/react";
import { useCreateTaskNotification } from "hooks/workflow/useCreateTaskNotification";
import { useDeleteTaskNotification } from "hooks/workflow/useDeleteTaskNotification";
import { useUpdateTaskNotifications } from "hooks/workflow/useUpdateTaskNotifications";
import { useRuleWorkBook } from "hooks/ruleworkbook/useRuleWorkBook";
import DeleteModel from "components/DeleteModel/DeleteModel";

function JobDetailsTasksEditModal({
  isEditTask,
  setIsEditTask,
  selectedTask,
  jobId,
  taskNodesData = [],
  runTimeData = [],
  deleteAction,
  taskNotification,
}) {
  const { mutateAsync: updateTask, isLoading: isUpdateTaskLoading } =
    useUpdateTask();

  const {
    mutateAsync: createTaskNotification,
    isLoading: isTaskCreateNotificationLoading,
  } = useCreateTaskNotification();

  const {
    mutateAsync: deleteTaskNotification,
    isLoading: isTaskNotificationDeleteLoading,
  } = useDeleteTaskNotification();

  const {
    mutateAsync: updateTaskNotification,
    isLoading: isTaskNotificationUpdateLaoding,
  } = useUpdateTaskNotifications();

  const [showNotificationDeleteModal, setShowNotificationDeleteModal] =
    React.useState(false);
  const [showPreSelected, setShowPreSelected] = React.useState(true);
  const [selectedTaskList, setSelectedTaskList] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(null);
  const { data: application } = useApplication();
  const { data: ruleWorkbook } = useRuleWorkBook();

  const currentTaskNotification = taskNotification?.find(
    (value) => value?.taskId === selectedTask?.id
  );

  const propertiesToAssign = ["fail", "success", "start"];

  const checkBoxValues = propertiesToAssign.filter(
    (property) =>
      currentTaskNotification?.hasOwnProperty(property) &&
      currentTaskNotification[property] === true
  );

  const [isNotificationOn, setIsNotificationOn] = React.useState(
    !!currentTaskNotification
  );

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

  const dependsOnOptions = taskNodesData
    ?.filter((task) => task?.id !== selectedTask?.id)
    ?.map((data) => ({
      label: data?.name,
      value: data?.id,
    }));
  const dependsOnDV = selectedTask?.dependsOn?.split(",");

  const preSelected = dependsOnDV?.flatMap((data) => {
    return dependsOnOptions?.filter((depend) => depend?.value === +data);
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    application: Yup.object().required(),
    runTime: Yup.object().required(),
    email: isNotificationOn ? Yup.string().email().required() : "",
  });

  const initialValues = {
    name: selectedTask?.name,
    application: applicationOptions?.filter(
      (data) => selectedTask?.applicationId === data.value
    )[0],
    runTime: runtimeOptions?.filter(
      (data) => selectedTask?.runtimeId === data.value
    )[0],
    source: selectedTask?.source,
    ruleWorkbook: workbookOptions?.filter(
      (data) => selectedTask?.ruleWorkbookId === data.value
    )[0],
    email: currentTaskNotification?.email,
    notifyOn: checkBoxValues || [],
  };

  const deleteCaller = async (id) => {
    await deleteTaskNotification({
      taskNotificationId: id,
    });
  };

  const handleOnSubmit = async (formValues) => {
    const taskData = {
      applicationId: formValues?.application.value, //
      taskId: selectedTask?.id,
      jobId: jobId, //
      name: formValues.name,
      parentId: 2,
      runtimeId: formValues.runTime.value,
      source: formValues.source,
      ruleWorkbookId: formValues.ruleWorkbook.value,
      taskTypeId: 1, //
      dependsOn: showPreSelected
        ? preSelected?.map((data) => data?.value)?.join(",")
        : selectedTaskList?.map((data) => data?.value)?.join(","),
    };

    await updateTask(taskData);
    const notificationData = {
      taskId: selectedTask?.id,
      email: formValues?.email,
      success: formValues?.notifyOn?.includes("success"),
      failure: formValues?.notifyOn?.includes("failure"),
      start: formValues?.notifyOn?.includes("start"),
    };
    if (isNotificationOn && !!!currentTaskNotification) {
      await createTaskNotification(notificationData);
    } else if (
      isNotificationOn &&
      currentTaskNotification !== undefined &&
      currentTaskNotification !== null
    ) {
      await updateTaskNotification({
        taskId: selectedTask?.id,
        email: formValues?.email,
        success: formValues?.notifyOn?.includes("success"),
        failure: formValues?.notifyOn?.includes("failure"),
        start: formValues?.notifyOn?.includes("start"),
        notificationId: currentTaskNotification?.id,
      });
    }
    setIsEditTask(false);
  };

  return (
    <>
      <AFFormModal
        onClose={() => {
          setSelectedTaskList([]);
          setIsEditTask(false);
        }}
        isLoading={
          isUpdateTaskLoading ||
          isTaskCreateNotificationLoading ||
          isTaskNotificationDeleteLoading ||
          isTaskNotificationUpdateLaoding
        }
        primaryButtonText="Save"
        isOpen={isEditTask}
        initialValues={initialValues}
        title="Edit Task"
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
          options={runtimeOptions || []}
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
          label="Depends On"
          onMenuChange={() => setShowPopup(true)}
          selectedItems={showPreSelected ? preSelected : selectedTaskList || []}
          options={dependsOnOptions || []}
          onChange={() => {
            setShowPreSelected(false);
            setSelectedTaskList([]);
          }}
        />

        <Column span={1} style={{ marginBottom: "20px" }}>
          <Field name="notification">
            {({ field }) => (
              <Toggle
                toggled={isNotificationOn}
                labelText="Notification"
                labelA=""
                labelB=""
                id="toggle-2"
                onClick={() => {
                  setIsNotificationOn((prev) => !prev);
                  setShowNotificationDeleteModal(true);
                }}
                {...field}
              />
            )}
          </Field>
        </Column>
        {isNotificationOn ? (
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
                      defaultChecked={field.value?.includes("start")}
                      {...field}
                      value="start"
                    />
                    <Checkbox
                      labelText="Success"
                      id="success"
                      {...field}
                      defaultChecked={field.value?.includes("success")}
                      value="success"
                    />
                    <Checkbox
                      labelText="Failure"
                      id="failure"
                      defaultChecked={field.value?.includes("fail")}
                      {...field}
                      value="failure"
                    />
                  </CheckboxGroup>
                )}
              </Field>
            </Column>
            <AFTextField
              name="email"
              placeHolder="example@email.com"
              style={{ marginTop: "25px" }}
              size={11}
            />
          </>
        ) : (
          !!currentTaskNotification &&
          showNotificationDeleteModal && (
            <DeleteModel
              deleteActionHanlder={() => {}}
              deleteCaller={() => deleteCaller(currentTaskNotification?.id)}
              itemsToDeleteIDs={[]}
              setIsDeleteModelOpen={setShowNotificationDeleteModal}
              setitemsToDeleteIDs={() => {}}
              singleItemToDeleteID={currentTaskNotification?.id}
              setSingleItemToDeleteID={() => {}}
              externalOnClose={() => setIsNotificationOn(true)}
              isLoading={isTaskNotificationDeleteLoading}
            />
          )
        )}
        <Column span={16} style={{ marginBottom: "5px" }}>
          <IconButton
            label="Delete Task"
            kind="tertiary"
            closeOnActivation={true}
            onClick={() => {
              deleteAction(selectedTask?.id);
            }}
          >
            <TrashCan />
          </IconButton>
        </Column>
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
              id="ms-2"
              initialSelectedItems={
                showPreSelected ? preSelected : selectedTaskList || []
              }
              name="DependOnOpt"
              label="Choose option"
              onChange={({ selectedItems }) => {
                setShowPreSelected(false);
                setSelectedTaskList(selectedItems);
              }}
              titleText={"Depends On"}
              open
            />
          </Modal>
        </div>
      )}
    </>
  );
}

export default JobDetailsTasksEditModal;
