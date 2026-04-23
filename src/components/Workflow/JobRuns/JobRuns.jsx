import React from "react";
import { ProgressBar } from "carbon-components-react";
import TopLevelComps from "../../TopLevelComps";
import JobRunStackedBarChart from "./JobRunStackedBarChart";
import CustomDataTable from "../../Datatable";
import JobDetails from "../Jobs/JobDetails";
import { useJobRun } from "hooks/workflow/useJobRun";
import { useJobs } from "hooks/workflow/useJobs";
import {
  calculateDuration,
  formatDate,
  formatDateTime,
} from "utils/formatDateTime";
import { useJobRunByJobId } from "hooks/workflow/useJobRunByJobId";
import { useJobRunSummary } from "hooks/workflow/useJobRunSummary";
import { shortInfo } from "utils/shortInfo";
import sortJobRunsArray from "utils/sortArrayForJobRuns";

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
    key: "name",
    header: "Job Name",
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
function JobRuns() {
  const [filterData, setFilterData] = React.useState(null);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [notificationTimeout, setNotificationTimeout] = React.useState(null);

  const [notificationData, setNotificationData] = React.useState({
    shown: false,
    subtitle: "Test Job Name",
    caption: "Success",
    kind: "info",
  });

  const [isJobDetails, setIsJobDetails] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const { mutateAsync: jobRunByJobId } = useJobRunByJobId();
  const { data: jobRunSummary } = useJobRunSummary();

  const { data: jobRun, isLoading: isJobRunLoading } = useJobRun();
  const { data: jobs } = useJobs();
  const handleSubmit = () => {};
  const rowData = React.useMemo(() => {
    const sortedRuns = sortJobRunsArray(jobRun);

    return sortedRuns?.map((data) => ({
      ...data,
      launchType:
        data?.launchType.charAt(0)?.toUpperCase() + data?.launchType.slice(1),
      name: jobs?.filter((job) => job.id === data?.jobId)[0]?.name,
      duration: calculateDuration(data?.duration),
      startedAt: formatDateTime(data?.startedAt),
    }));
  }, [jobs, jobRun]);

  const sortedSummaryStatus = React.useMemo(
    () =>
      jobRunSummary?.jobRunCountsByStatus
        ?.slice()
        .sort((a, b) => new Date(a.runDate) - new Date(b.runDate)),
    [jobRunSummary]
  );

  const minDate = formatDate(sortedSummaryStatus?.at(0)?.runDate);
  const maxDate = formatDate(sortedSummaryStatus?.at(-1)?.runDate);

  const handleCellClick = (row) => {
    const filteredRun = jobRun?.filter((run) => run?.id === row.id)[0];
    setSelectedJob(filteredRun?.jobId);
    setSelectedRow(row);
    setIsJobDetails(true);
  };
  const handlePlayClick = async (row) => {
    setNotificationData((prevData) => ({ ...prevData, shown: false }));
    const filteredRun = jobRun?.filter((data) => data?.id === row.id)[0];
    const filteredJob = jobs?.filter(
      (job) => job?.id === filteredRun?.jobId
    )[0];
    try {
      await jobRunByJobId({ jobId: row?.id });
      setNotificationData({
        shown: true,
        caption: "Submitted",
        subtitle: filteredJob?.name,
        kind: "success",
      });
    } catch (Error) {
      setNotificationData({
        shown: true,
        caption:
          filteredJob?.lastRunStatus.toLowerCase() === "n/a"
            ? "The requested resource could not be found but may be available again in the future."
            : filteredJob.lastRunStatus.toLowerCase() === "submitted" ||
              filteredJob.lastRunStatus.toLowerCase() === "running"
            ? "Job has already been submitted."
            : JSON.stringify(Error),
        subtitle: filteredJob?.name,
        kind: "error",
      });
    }

    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    const timeoutId = setTimeout(() => {
      setNotificationData((prevData) => ({
        ...prevData,
        shown: false,
      }));
    }, 3000);

    setNotificationTimeout(timeoutId);
  };

  const totalErrorsCount = jobRunSummary?.top5ErrorSummary?.reduce(
    (acc, curr) => acc + curr?.totalErrors,
    0
  );
  const progressValue = jobRunSummary?.top5ErrorSummary?.map((data) =>
    Math.round((data?.totalErrors / totalErrorsCount) * 100)
  );

  return (
    <>
      {!isJobDetails ? (
        <>
          <TopLevelComps
            buttonName="New Data Package"
            name="Job Runs"
            shouldContentSwitecherRender={true}
            onSubmit={handleSubmit}
            filterLable="Auto Profile"
            searchFilter={rowData}
            setFilterData={setFilterData}
            shouldRenderButton={false}
          />
          <div className="jobruns_grid_container , flex_between">
            <div className="jobruns_card , jobruns_card_width">
              <div className="flex_between">
                <h6>Finished runs count</h6>
                <p>
                  {minDate} - {maxDate}
                </p>
              </div>
              <div style={{ marginLeft: "-40px" }}>
                <JobRunStackedBarChart
                  jobRunCountsByStatus={jobRunSummary?.jobRunCountsByStatus}
                />
              </div>
            </div>
            <div className="jobruns_card , jobruns_card_width__">
              <div className="display_flex">
                <h6>Top 5 error types</h6>
                <p>{totalErrorsCount ? `(${totalErrorsCount})` : ""}</p>
              </div>
              <div style={{ padding: "20px 0 0 0" }}>
                {jobRunSummary?.top5ErrorSummary?.map((data, i) => (
                  <div style={{ paddingBottom: "10px", position: "relative" }}>
                    <ProgressBar
                      label={shortInfo(data?.taskErrorName, 70, "")}
                      value={progressValue[i]}
                      hideLabel={false}
                      size="big"
                    />
                    <div style={{ position: "absolute", top: "0", right: "0" }}>
                      {data?.totalErrors}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="jobruns_table_card">
            <style>
              {`
            .cds--table-toolbar {
                display: none;
            }
            .cds--data-table-header {
                display: none;
            }
            `}
            </style>
            <CustomDataTable
              headers={headerData}
              rows={filterData || rowData}
              shouldTableBatchActionsRender={false}
              shouldAddNewButton={false}
              buttonText="New Property +"
              isActiveTag={false}
              isClickAbleCell={true}
              handleCellClick={handleCellClick}
              getSelectedRow={setSelectedRow}
              statusWidth="200px"
              isTableLoading={isJobRunLoading}
              isSelectionEnable={false}
              shouldEditButtonRender={false}
              deleteAction={() => {}}
              shouldDeleteButtonRender={false}
              shouldRenderRestartButton={true}
            />
          </div>
        </>
      ) : (
        <JobDetails
          selectedJobId={selectedJob}
          setIsJobDetails={setIsJobDetails}
          selectedRow={selectedRow}
          handlePlayClick={handlePlayClick}
          notificationData={notificationData}
        />
      )}
    </>
  );
}

export default JobRuns;
