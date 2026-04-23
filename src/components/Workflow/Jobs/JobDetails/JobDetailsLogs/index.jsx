import React from "react";
import CustomDataTable from "components/Datatable";
import { generateCsv } from "utils/csvGenerator";

function JobDetailsLogs({ jobId }) {
  const rowData = [
    {
      id: 1,
      timestamp: "2021-01-01T00:00:00.000Z",
      logLevel: "INFO",
      message: "test message",
      jobId: "1",
      executorId: "1",
      taskId: "1",
    },
    {
      id: 2,
      timestamp: "2021-01-01T00:00:00.000Z",
      logLevel: "INFO",
      message: "test message",
      jobId: "1",
      executorId: "1",
      taskId: "1",
    },
    {
      id: 3,
      timestamp: "2021-01-01T00:00:00.000Z",
      logLevel: "DEBUG",
      message: "test message",
      jobId: "1",
      executorId: "1",
      taskId: "1",
    },
    {
      id: 4,
      timestamp: "2021-01-01T00:00:00.000Z",
      logLevel: "ERROR",
      message: "test message",
      jobId: "1",
      executorId: "1",
      taskId: "1",
    },
    {
      id: 5,
      timestamp: "2021-01-01T00:00:00.000Z",
      logLevel: "INFO",
      message: "test message",
      jobId: "1",
      executorId: "1",
      taskId: "1",
    },
  ];
  const headerData = [
    {
      key: "timestamp",
      header: "Timestamp",
    },
    {
      key: "logLevel",
      header: "Log Lavel (Info, Debug, Error)",
    },
    {
      key: "message",
      header: "Message",
    },
    {
      key: "jobId",
      header: "Job ID",
    },
    {
      key: "executorId",
      header: "Executor ID",
    },
    {
      key: "taskId",
      header: "Task ID",
    },
  ];
  const csvHeaders = [
    "timestamp",
    "logLevel",
    "message",
    "jobId",
    "executorId",
    "taskId",
  ];

  const downloadAction = () => {
    const csvStringValue = generateCsv(rowData, csvHeaders);
    const blob = new Blob([csvStringValue], { type: "text/plain" });

    const blobUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;

    downloadLink.download = `jobId(${rowData[0]?.jobId})_dataResource(${rowData[0]?.message}).csv`;
    downloadLink.click();

    URL.revokeObjectURL(blobUrl);
  };

  return (
    <>
      <CustomDataTable
        headers={headerData}
        rows={rowData || []}
        tableHeading="Logs"
        shouldTableBatchActionsRender={false}
        isSelectionEnable={false}
        shouldAddNewButton={false}
        //   isTableLoading={isInventoryLoading}
        isActiveTag={false}
        statusWidth="200px"
        tableInlineSearch={true}
        shouldActionsRender={false}
        showDownloadButton={true}
        downloadAction={downloadAction}
        isSortable={true}
        //   isClickAbleCell={true}
        //   handleCellClick={handleCellClick}
      />
    </>
  );
}

export default JobDetailsLogs;
