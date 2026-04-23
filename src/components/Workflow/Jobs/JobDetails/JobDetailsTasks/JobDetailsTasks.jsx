import React from "react";
import JobRunDetailsModal from "./JobRunDetailsModal";
import JobDetailsTasksAddModal from "./JobDetailsTasksAddModal";
import JobDetailsTasksEditModal from "./JobDetailsTasksEditModal";
import { useRuntime } from "hooks/runtime/useRuntime";
import { useTaskByJobId } from "hooks/workflow/useTaskByJobId";
import { useJobById } from "hooks/workflow/useJobById";
import JobDetailsTasksChart from "./TaskChart";
import DeleteModel from "components/DeleteModel/DeleteModel";
import { useDeleteTask } from "hooks/workflow/useDeleteTask";
import { useTaskNotification } from "hooks/workflow/useTaskNotification";

export const JobDetailsTasks = ({
  isJobRunDetailOpen,
  setIsJobRunDetailOpen,
  jobId,
}) => {
  const { data: jobById } = useJobById(jobId);
  const { data: taskNodesDataByJobId } = useTaskByJobId(jobId);
  const { data: runTime } = useRuntime();
  const { mutateAsync: deleteTask, isLoading: isTaskDeleteLoading } =
    useDeleteTask();
  const { data: taskNotification } = useTaskNotification();
  const [isNewTask, setIsNewTask] = React.useState(false);
  const [isEditTask, setIsEditTask] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

  const deleteCaller = (id) => {
    deleteTask({ taskId: id });
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  const handleEditTask = (id) => {
    setSelectedTask(
      ...taskNodesDataByJobId?.nodeData?.filter(
        (taskData) => taskData.id === id
      )
    );
    setIsEditTask(true);
  };
  return (
    <div
      style={{
        width: "100%",
        background: "white",
        height: "auto",
        paddingBottom: "4px",
      }}
    >
      <JobDetailsTasksChart
        runTimeData={runTime}
        jobById={jobById}
        deleteAction={deleteActionHanlder}
        setIsEditTask={handleEditTask}
        setIsNewTask={setIsNewTask}
        taskNodesDataByJobId={taskNodesDataByJobId}
      />

      {isJobRunDetailOpen && (
        <JobRunDetailsModal
          jobById={jobById}
          isJobRunDetailOpen={isJobRunDetailOpen}
          setIsJobRunDetailOpen={setIsJobRunDetailOpen}
        />
      )}

      {isNewTask && (
        <JobDetailsTasksAddModal
          jobId={jobId}
          isNewTask={isNewTask}
          taskNodesData={taskNodesDataByJobId?.nodeData}
          runTimeData={runTime}
          setIsNewTask={setIsNewTask}
        />
      )}

      {isEditTask && (
        <JobDetailsTasksEditModal
          jobId={jobId}
          deleteAction={deleteActionHanlder}
          isEditTask={isEditTask}
          taskNodesData={taskNodesDataByJobId?.nodeData}
          selectedTask={selectedTask}
          runTimeData={runTime}
          setIsEditTask={setIsEditTask}
          taskNotification={taskNotification}
        />
      )}
      {(isDeleteModelOpen || isTaskDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={[]}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={() => {}}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isTaskDeleteLoading}
        />
      )}
    </div>
  );
};
