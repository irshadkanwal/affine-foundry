import React from "react";
import { Button, Dropdown, InlineNotification } from "carbon-components-react";
import InventoryPieChart from "./InventoryPieChart";
import CustomDataTable from "../../Datatable";
import InventoryLineChart from "./InventoryLineChart";
import { Renew } from "@carbon/react/icons";
import { useDataInventorySummary } from "hooks/dataInventory/useDataInventorySummary";
import { useDataResource } from "hooks/dataresources/useDataResource";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { useDataInventoryDetail } from "hooks/dataInventory/useDataInventoryDetail";
import { formatDateTime } from "utils/formatDateTime";
import { useMostRecentActivity } from "hooks/useMostRecentActivity";
import { generateCsv } from "utils/csvGenerator";

const headerData = [
  {
    key: "dataResourceName",
    header: "Assigned Resource",
  },
  {
    key: "fileName",
    header: "File Name",
  },
  {
    key: "dataFormat",
    header: "Data Format",
  },
  {
    key: "contentType",
    header: "Content Type",
  },
  {
    key: "receiptDateTime",
    header: "Receipt Date",
  },
  {
    key: "status",
    header: "Status",
    isSortable: true,
  },
  {
    key: "processedDateTime",
    header: "Processed Date",
  },
  {
    key: "sourcePath",
    header: "Source Path",
  },
  { key: "recordCount", header: "Record Count" },
];
const csvHeaders = [
  "dataPackageName",
  "dataResourceName",
  "fileName",
  "dataFormat",
  "contentType",
  "receiptDateTime",
  "status",
  "processedDateTime",
  "sourcePath",
  "recordCount",
];
export function DataInventory() {
  const [selectedDataPackage, setSelectedDataPackage] = React.useState(null);
  const { data: mostRecentActivity } = useMostRecentActivity();
  const [selectedDataResource, setSelectedResource] = React.useState(null);
  const [selectedLegend, setSeletedLegend] = React.useState(null);
  const { data: dataInventorySummary, refetch: refetchSummary } =
    useDataInventorySummary(
      selectedDataPackage || mostRecentActivity?.dataPackageId
    );
  const { data: dataPackage } = useDataPackage();
  const { data: dataRecources = [] } = useDataResource();
  const {
    data: dataInventoryDetails,
    isLoading: isInventoryLoading,
    refetch: refetchDetails,
  } = useDataInventoryDetail(
    selectedDataPackage || mostRecentActivity?.dataPackageId
  );
  const handleRefetch = () => {
    refetchDetails();
    refetchSummary();
  };

  const [fileInventoryItem, setFileInventoryItem] = React.useState();
  const [closedNotifications, setClosedNotifications] = React.useState(new Set());

  const handleCellClick = (row) => {
    const [item] = rowData.filter((item) => item.id === row.id) || [];

    setFileInventoryItem(item);

    // Reset closed notifications when new row is clicked
    setClosedNotifications(new Set());
  }

  const handleNotificationClose = (fileInventoryId) => {
    setClosedNotifications((prev) => new Set(prev).add(fileInventoryId));
  };

  const rowData = React.useMemo(() => {
    if (!selectedDataResource) {
      return dataInventoryDetails
        ?.filter((val) => (selectedLegend ? selectedLegend[val?.status] : true))
        ?.map((data, index) => ({
          ...data,
          fileName: data?.sourcePath?.split("/").pop(),
          id: index,
          processedDateTime: data?.processedDateTime
            ? formatDateTime(data?.processedDateTime)
            : "- -",
          receiptDateTime: data?.receiptDateTime
            ? formatDateTime(data?.receiptDateTime)
            : "- -",
          recordCount: data?.recordCount?.toLocaleString(),
        }));
    }

    return dataInventoryDetails
      ?.filter((data) => selectedDataResource === data?.dataResourceName)
      ?.filter((val) => (selectedLegend ? selectedLegend[val?.status] : true))
      ?.map((data, index) => ({
        ...data,
        fileName: data?.sourcePath?.split("/").pop(),
        id: index,
        processedDateTime: data?.processedDateTime
          ? formatDateTime(data?.processedDateTime)
          : "- -",
        receiptDateTime: data?.receiptDateTime
          ? formatDateTime(data?.receiptDateTime)
          : "- -",
        recordCount: data?.recordCount?.toLocaleString(),
      }));
  }, [dataInventoryDetails, selectedDataResource, selectedLegend]);

  const filteredDataResources = dataRecources?.filter(
    (data) => data.dataPackage?.id === selectedDataPackage
  );
  const downloadAction = () => {
    const csvStringValue = generateCsv(rowData, csvHeaders);
    const blob = new Blob([csvStringValue], { type: "text/plain" });

    const blobUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;

    downloadLink.download = `dataPackageId(${
      selectedDataPackage || mostRecentActivity?.dataPackageId
    })_dataResource(${selectedDataResource}).csv`;
    downloadLink.click();

    URL.revokeObjectURL(blobUrl);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ paddingBottom: "25px" }}>Data Inventory</h3>
        <div>
          <Button onClick={handleRefetch} renderIcon={Renew}>
            Refetch
          </Button>
        </div>
      </div>

      <div className="flex_between">
        <div style={{ width: "49%" }}>
          <Dropdown
            ariaLabel="Dropdown"
            id="carbon-dropdown-package"
            items={dataPackage || []}
            onChange={({ selectedItem }) => {
              setSelectedDataPackage(selectedItem?.id);
              setSelectedResource(null);
              setSeletedLegend(null);
            }}
            itemToString={(value) => value?.name}
            label="Choose an option"
            titleText="Data Package"
          />
        </div>
        <div style={{ width: "49%" }}>
          <Dropdown
            ariaLabel="Dropdown"
            id="carbon-dropdown-resource"
            items={filteredDataResources}
            selectedItem={
              selectedDataResource ? { name: selectedDataResource } : ""
            }
            disabled={selectedDataPackage ? false : true}
            onChange={({ selectedItem }) => {
              setSelectedResource(selectedItem?.name);
              setSeletedLegend(null);
            }}
            itemToString={(value) => value?.name}
            label={
              filteredDataResources?.length
                ? "Choose an option"
                : "No Resources Found"
            }
            titleText="Data Resource"
          />
        </div>
      </div>
      <div className="inventory_grid_container , flex_between">
        <div className="inventory_card , card_width">
          <h6>Count of Records by Status</h6>
          <div>
            <InventoryPieChart
              pieChartData={dataInventorySummary?.recordsByStatus}
              setSeletedLegend={setSeletedLegend}
            />
          </div>
        </div>
        <div className="inventory_card , card_width">
          <h6>Count of Records by Parsed-eventtime</h6>
          <div style={{ marginTop: "-40px" }}>
            <InventoryLineChart
              lineChartData={dataInventorySummary?.recordsByEventTime}
            />
          </div>
        </div>
        <div className="inventory_card , card_width__">
          <h6>Total Files</h6>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <h1>{dataInventorySummary?.totalRecordCount}</h1>
          </div>
        </div>
      </div>
      <div className="inventory_table_card">
        {fileInventoryItem?.errorMsg &&
          (!closedNotifications.has(fileInventoryItem.fileInventoryId) && (
            <InlineNotification
              key={fileInventoryItem.id}
              kind="error"
              title="Failed processing file"
              subtitle={`File '${fileInventoryItem.sourcePath}' failed. ${fileInventoryItem.errorMsg}`}
              style={{ maxWidth: '100%', marginTop: '1rem', marginBottom: '1rem' }}
              onClose={() => handleNotificationClose(fileInventoryItem.fileInventoryId)}
            />
          ))
        }
        <style>
          {`
            .cds--table-toolbar {
                display: none;
            }
            `}
        </style>
        <CustomDataTable
          headers={headerData}
          rows={rowData}
          tableHeading="Files"
          shouldTableBatchActionsRender={false}
          isSelectionEnable={false}
          shouldAddNewButton={false}
          buttonText="New Property +"
          isTableLoading={isInventoryLoading}
          isActiveTag={false}
          statusWidth="200px"
          tableInlineSearch={true}
          shouldActionsRender={false}
          showDownloadButton={true}
          downloadAction={downloadAction}
          isSortable={true}
          isClickAbleCell={true}
          handleCellClick={handleCellClick}
        />
      </div>
    </div>
  );
}
