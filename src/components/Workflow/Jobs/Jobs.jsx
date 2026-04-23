import React from "react";
import TopLevelComps from "../../TopLevelComps";
import CustomDataTable from "../../Datatable";
import JobDetails from "./JobDetails/index";
import JobAddModel from "./JobAddModal";
import JobEditModal from "./JobEditModal";
import DeleteModel from "../../DeleteModel/DeleteModel";
import { useJobs } from "hooks/workflow/useJobs";
import { useDeleteJob } from "hooks/workflow/useDeleteJob";
import { ToastNotification } from "@carbon/react";
import { useJobRunByJobId } from "hooks/workflow/useJobRunByJobId";
import { useStopJobByJobId } from "hooks/workflow/useStopJobByJobId";

const headerData = [
  {
    key: "name",
    header: "Job Name",
  },
  {
    key: "createdBy",
    header: "Created By",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "trigger",
    header: "Trigger",
  },
  {
    key: "lastRunStatus",
    header: "Last Run Status",
  },
];

function Jobs() {
  const { mutateAsync: deleteJob, isLoading: isJobDeleteLoading } =
    useDeleteJob();
  const { data: jobs, isLoading: isJobsLoading } = useJobs();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [filterData, setFilterData] = React.useState(null);
  const [notificationTimeout, setNotificationTimeout] = React.useState(null);

  const [notificationData, setNotificationData] = React.useState({
    shown: false,
    subtitle: "Test Job Name",
    caption: "Success",
    kind: "info",
  });
  const handleSubmit = () => {};
  const { mutateAsync: jobRunByJobId } = useJobRunByJobId();
  const { mutateAsync: stopJobByJobId } = useStopJobByJobId();
  const [isJobDetails, setIsJobDetails] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState("");

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const rowData = React.useMemo(() => {
    const jobData = jobs?.map((data) => ({
      ...data,
      trigger:
        data?.trigger?.charAt(0)?.toUpperCase() + data?.trigger?.slice(1),
    }));
    return [...(jobData || [])]?.reverse();
  }, [jobs]);
  React.useEffect(() => {
    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, [notificationTimeout]);

  const deleteCaller = (id) => {
    deleteJob({ jobId: id });
  };
  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  const handleCellClick = (row) => {
    setSelectedRow(row);
    setIsJobDetails(true);
  };
  const handlePlayClick = async (row) => {
    setNotificationData((prevData) => ({ ...prevData, shown: false }));
    const filteredJob = jobs?.filter((job) => job?.id === row?.id)[0];
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

  const handleStopClick = async (row) => {
    setNotificationData((prevData) => ({ ...prevData, shown: false }));
    const filteredJob = jobs?.filter((job) => job?.id === row?.id)[0];
    try {
      // Assuming `stopJobByJobId` is the API call for stopping a job
      await stopJobByJobId({ jobId: row?.id });
      setNotificationData({
        shown: true,
        caption: "Stop request submitted",
        subtitle: filteredJob?.name,
        kind: "success",
      });
    } catch (Error) {
      setNotificationData({
        shown: true,
        caption:
          filteredJob?.lastRunStatus.toLowerCase() === "n/a"
            ? "The requested resource could not be found but may be available again in the future."
            : filteredJob?.lastRunStatus.toLowerCase() === "stopping" ||
              filteredJob?.lastRunStatus.toLowerCase() === "stopped"
            ? "Job is already stopping or stopped."
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

  return (
    <>
      {!isJobDetails ? (
        <div>
          {notificationData?.shown && (
            <ToastNotification
              aria-label="closes notification"
              caption={notificationData?.caption}
              kind={notificationData?.kind}
              // timeout={2000}
              style={{
                marginRight: "-5px",
                position: "absolute",
                right: "36px",
                zIndex: "3",
                top: "59px",
              }}
              lowContrast
              onClose={function noRefCheck() {}}
              onCloseButtonClick={function noRefCheck() {}}
              statusIconDescription="notification"
              subtitle={notificationData?.subtitle}
              title="Job run"
            />
          )}
          <TopLevelComps
            buttonName="New Job"
            name="Jobs"
            openAddModal={setIsAddModalOpen}
            shouldContentSwitecherRender={false}
            onSubmit={handleSubmit}
            filterLable="Auto Profile"
            searchFilter={rowData}
            setFilterData={setFilterData}
            shouldRenderButton={true}
          />
          <div>
            <style>
              {`
            .cds--toolbar-content {
                display: none;
            }
            `}
            </style>
            <CustomDataTable
              headers={headerData}
              deleteAction={deleteActionHanlder}
              deleteBatchAction={deleteBatchActionHanlder}
              rows={filterData || rowData}
              tableHeading="Jobs"
              handlePlayClick={handlePlayClick}
              handleStopClick={handleStopClick}
              openEditModal={setIsEditModalOpen}
              getSelectedRow={setSelectedRow}
              shouldAddNewButton={false}
              shouldTableBatchActionsRender={true}
              isActiveTag={false}
              statusWidth="200px"
              isClickAbleCell={true}
              isTableLoading={isJobsLoading}
              handleCellClick={handleCellClick}
              shouldPlayButtonRender={true}
            />
          </div>
        </div>
      ) : (
        <JobDetails
          setIsJobDetails={setIsJobDetails}
          selectedRow={selectedRow}
          handlePlayClick={handlePlayClick}
          notificationData={notificationData}
        />
      )}
      {isAddModalOpen && (
        <JobAddModel
          setIsAddModalOpen={setIsAddModalOpen}
          isAddModalOpen={isAddModalOpen}
        />
      )}

      {isEditModalOpen && (
        <JobEditModal
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          selectedRow={
            (jobs?.filter((data) => data?.id === selectedRow?.id))[0]
          }
        />
      )}

      {(isDeleteModelOpen || isJobDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isJobDeleteLoading}
        />
      )}
    </>
  );
}

export default Jobs;
