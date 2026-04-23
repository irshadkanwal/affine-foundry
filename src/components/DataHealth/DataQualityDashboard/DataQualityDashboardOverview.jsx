import React from "react";
import { Dropdown, DatePicker, DatePickerInput } from "carbon-components-react";
import DataQualityPieChartComponent from "./DataQualityPieChartComponent";
import { Download } from "@carbon/react/icons";
import DataQualityStackedBarChart from "./DataQualityStackedBarChart";
import DataQualityVerificationTable from "./DataQualityVerificationTable";
import {
  formatDataForTable,
  formatTotalRowForTable,
} from "utils/formatQualityDataForTable";
import { Loading } from "@carbon/react";
import { formatDateForApi } from "utils/formatDateTime";

function DataQualityDashboardOverview({
  setSelectedResourceValue,
  selectedResource,
  dataPackage = [],
  setSelectedDataPackage,
  selectedDataPackage,
  selectedDate,
  setSelectedDate,
  filteredDataResources,
  dataQualityData,
  isDataQualityLoading,
}) {
  const rowDataValues = formatDataForTable(dataQualityData?.summaryTable) || [];
  const totalRowData = formatTotalRowForTable(dataQualityData?.summaryTable);

  //console.log("selectedDate", selectedDate);
  return (
    <div className="dashboard_main">
      <div className="flex_between">
        <div style={{ width: "31%" }}>
          <Dropdown
            ariaLabel="Dropdown"
            id="carbon-dropdown-package"
            items={dataPackage || []}
            onChange={({ selectedItem }) => {
              setSelectedDataPackage(selectedItem?.id);
              setSelectedResourceValue(null);
              setSelectedDate(null);
            }}
            itemToString={(value) => value?.name}
            label="Choose an option"
            titleText="Data Package"
          />
        </div>
        <div style={{ width: "31%" }}>
          <Dropdown
            ariaLabel="Dropdown"
            id="carbon-dropdown-resource-12"
            items={filteredDataResources}
            selectedItem={
              selectedResource
                ? {
                    name: filteredDataResources?.filter(
                      (data) => data?.id === selectedResource
                    )[0]?.name,
                  }
                : ""
            }
            disabled={selectedDataPackage ? false : true}
            onChange={({ selectedItem }) => {
              setSelectedResourceValue(selectedItem?.id);
              setSelectedDate(null);
            }}
            itemToString={(value) => value?.name}
            label={
              filteredDataResources?.length >= 1
                ? "Choose an option"
                : "No Resources Found"
            }
            titleText="Data Resource"
          />
        </div>
        <div>
          <DatePicker
            datePickerType="single"
            onChange={(value) => {
              value?.length !== 0
                ? setSelectedDate(formatDateForApi(value))
                : setSelectedDate(null);
            }}
          >
            <DatePickerInput
              disabled={selectedResource ? false : true}
              placeholder="mm/dd/yyyy"
              labelText="Run Date"
              id="date-picker-single"
              size="md"
            />
          </DatePicker>
        </div>
      </div>
      <h4 style={{ marginTop: "20px" }}>
        Quality Score:{" "}
        {dataQualityData?.header?.qualityScore
          ? `${Math.ceil(dataQualityData?.header?.qualityScore * 100)}%`
          : "- -"}
      </h4>
      <div className="chart_grid_container , flex_between">
        <div className="dashboard_top_card" style={{ width: "49%" }}>
          <div className="flex_between">
            <h6>Total Results</h6>
            <Download size={20} />
          </div>
          <div>
            <DataQualityPieChartComponent pieChartData={dataQualityData} />
          </div>
        </div>

        <div className="dashboard_top_card" style={{ width: "49%" }}>
          <div className="flex_between">
            <h6>Total Result by Categories</h6>
            <div className="display_flex">
              <div className="display_flex" style={{ marginRight: "15px" }}>
                <div
                  style={{
                    background: "#E83D46",
                    height: "18px",
                    width: "18px",
                    borderRadius: "5px",
                  }}
                ></div>
                Fail
              </div>
              <div className="display_flex">
                <div
                  style={{
                    background: "#0f62fe",
                    height: "18px",
                    width: "18px",
                    borderRadius: "5px",
                  }}
                ></div>
                Pass
              </div>
            </div>
          </div>
          <DataQualityStackedBarChart barChartData={dataQualityData} />
        </div>
      </div>
      <div className="table_card ">
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginTop: "5%",
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              marginRight: "2%",
            }}
          >
            {dataQualityData?.summaryTable?.map((value) => (
              <h5>{value?.category}</h5>
            ))}
            <h5>Total</h5>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexGrow: 1, gap: "30%" }}>
              <h5>Verification</h5>
              <h5>Validation</h5>
              <h5>Total</h5>
            </div>
            {isDataQualityLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading
                  description="Active loading indicator"
                  withOverlay={false}
                />
              </div>
            ) : (
              <DataQualityVerificationTable
                rowData={[...rowDataValues, totalRowData] || []}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataQualityDashboardOverview;
