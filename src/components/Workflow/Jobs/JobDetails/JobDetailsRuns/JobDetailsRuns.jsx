import React from "react";
import CustomDataTable from "components/Datatable";
import BarChart from "./JobDetailsRunsMatrix";
import { calculateDuration, formatDateTime } from "utils/formatDateTime";
import { useJobRunListByJobId } from "hooks/workflow/useJobRunListByJobId";
import sortJobRunsArray from "utils/sortArrayForJobRuns";
import { InlineNotification } from "@carbon/react";

export const JobDetailsRuns = ({ jobId }) => {
  const [isMatrixView, setIsMatrixView] = React.useState(true);
  const [taskRuns, setTaskRuns] = React.useState([]);
  const [closedNotifications, setClosedNotifications] = React.useState(new Set());

  const {
    data: jobRunListByJobId = [],
    isLoading: isJobRunListByJobIdLoading,
  } = useJobRunListByJobId(jobId);

  const rowData = React.useMemo(() => {
    const sortedRuns = sortJobRunsArray(jobRunListByJobId);

    return sortedRuns?.map((data) => ({
      ...data,
      launchType:
        data?.launchType.charAt(0)?.toUpperCase() + data?.launchType.slice(1),
      startedAt: formatDateTime(data?.startedAt),
      duration: calculateDuration(data?.duration),
    }));
  }, [jobRunListByJobId]);

  const restartHandler = (id) => {
    //console.log("starting task again", id);
    // setSingleItemToDeleteID(id);
  };

  const handleCellClick = (row) => {
    const [item] = rowData.filter((item) => item.id === row.id) || [];
    let taskRuns = item?.taskRuns || [];

    // Filter taskRuns with status 'fail'
    taskRuns = taskRuns.filter((task) => task.status === 'fail');

    // Add row.id to each task in taskRuns
    taskRuns = taskRuns.map((task) => ({
      ...task,
      jobRunId: item.id,
    }));

    setTaskRuns(taskRuns);

    // Reset closed notifications when new row is clicked
    setClosedNotifications(new Set());
  };

  const handleNotificationClose = (taskRunId) => {
    setClosedNotifications((prev) => new Set(prev).add(taskRunId));
  };

  const headerData = [
    {
      key: "startedAt",
      header: "Start Time",
    },
    {
      key: "id",
      header: "Job Run ID",
    },
    {
      key: "duration",
      header: "Duration",
    },
    {
      key: "launchType",
      header: "Launched",
    },
    {
      key: "status",
      header: "Status",
    },
  ];

  return (
    <>
      {taskRuns?.length > 0 &&
        taskRuns.map((task, index) => {
          // Check if notification has been closed before rendering
          if (closedNotifications.has(task.jobRunId)) {
            return null; // Skip rendering this notification if it's closed
          }

          return (
            <InlineNotification
              key={index}
              kind="error"
              title={`Failed to run job ${task.jobRunId}`}
              subtitle={`Task '${task.taskName}' failed. ${task.errorMsg}`}
              style={{ maxWidth: '100%', marginTop: '1rem', marginBottom: '1rem' }}
              onClose={() => handleNotificationClose(task.jobRunId)}
            />
          );
        })
      }
      <div>
        <style>
          {`
            .cds--table-toolbar {
                display: none;
            }
            `}
        </style>
        <CustomDataTable
          headers={headerData}
          rows={rowData || []}
          tableHeading="Runs"
          shouldTableBatchActionsRender={false}
          shouldAddNewButton={false}
          buttonText="New Property +"
          deleteAction={restartHandler}
          isActiveTag={false}
          statusWidth="200px"
          isTableLoading={isJobRunListByJobIdLoading}
          inLineContentSwitch={true}
          shouldEditButtonRender={false}
          setIsViewChange={setIsMatrixView}
          shouldOtherViewRender={isMatrixView}
          isSelectionEnable={false}
          shouldDeleteButtonRender={false}
          shouldRenderRestartButton={true}
          isClickAbleCell={true}
          handleCellClick={handleCellClick}
        />
      </div>
      {!isMatrixView && <BarChart jobId={jobId} />}
    </>
  );
};
