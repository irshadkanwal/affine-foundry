import React from "react";
import { ProgressBar, Tag } from "@carbon/react";
import {
  DoubleInteger,
  CharacterUpperCase,
  Unknown,
} from "@carbon/react/icons";
import Histogram from "./DataHealthHistogram";
import DataHealthHorizontalBoxPLotChart from "./DataHealthHorizontalBoxPLotChart";
import RangeSlider from "./RangeSlider";

function DataHealthRightColumn({
  selectedColumn,
  valueDistributionData,
  dataResourceProfileHeaderById,
  dataTypeValues,
  sliderValue,
  dataClassMapping = [],
  dataClassLevel2 = [],
  setSliderValue,
}) {
  const assignedDataClassId = dataClassMapping?.find(
    (mapping) => mapping?.fieldName === selectedColumn?.columnName
  );
  const assignedDataClass = dataClassLevel2?.find(
    (value) => assignedDataClassId?.dataClassId === value?.id
  );

  const uniqueValueContent = {
    left: !selectedColumn?.distinctValues
      ? "No Unique Rows"
      : dataResourceProfileHeaderById[0]?.totalRecords
      ? `${Math.ceil(
          (selectedColumn?.distinctValues /
            dataResourceProfileHeaderById[0]?.totalRecords) *
            100
        )}% of the rows are unique`
      : "No Unique Rows",
    right: dataResourceProfileHeaderById[0]?.totalRecords
      ? selectedColumn?.distinctValues
      : "- -",
  };

  const missingValueContent = {
    left: selectedColumn?.completeness
      ? selectedColumn?.completeness === 1
        ? "No Missing Value"
        : `${
            100 - Math.ceil(selectedColumn?.completeness * 100)
          }% Missing Values`
      : "100% Missing Values",
    right: selectedColumn?.completeness
      ? selectedColumn?.completeness === 1
        ? "0"
        : Math.ceil(
            ((100 - selectedColumn?.completeness * 100) *
              dataResourceProfileHeaderById[0]?.totalRecords) /
              100
          )
      : dataResourceProfileHeaderById[0]?.totalRecords,
  };

  const validValueContentRight = selectedColumn?.completeness
    ? Math.ceil(selectedColumn?.completeness * 100)
    : 0;

  const validValueContentLeft = Math.floor(
    (validValueContentRight * dataResourceProfileHeaderById[0]?.totalRecords) /
      100
  );

  const boxPlotChartData = {
    numMaxValue: selectedColumn?.numMaxValue,
    numMean: selectedColumn?.numMean,
    numMinValue: selectedColumn?.numMinValue,
    numStddev: selectedColumn?.numStddev,
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          height: "3.5rem",
          width: "100%",
          background: "white",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {selectedColumn ? (
            selectedColumn?.dataType === "Unknown" ? (
              <Unknown />
            ) : selectedColumn?.dataType === "String" ? (
              <CharacterUpperCase />
            ) : (
              <DoubleInteger />
            )
          ) : (
            ""
          )}
          <h5>{selectedColumn?.columnName}</h5>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h5>Quality Score:</h5>
            <Tag
              type="outline"
              style={{
                display: dataResourceProfileHeaderById[0]?.qualityScore
                  ? ""
                  : "none",
              }}
            >
              {dataResourceProfileHeaderById[0]?.qualityScore
                ? `${Math.floor(
                    dataResourceProfileHeaderById[0]?.qualityScore * 100
                  )}%`
                : "- -"}
            </Tag>
          </div>
          <h5 style={{ marginRight: "10px" }}>
            Total Records:{"  "}
            {dataResourceProfileHeaderById[0]?.totalRecords
              ? dataResourceProfileHeaderById[0]?.totalRecords?.toLocaleString(
                  "en-US"
                )
              : "- -"}
          </h5>
        </div>
      </div>
      <div className="grid_container_">
        <div className="top_card">
          <div className="card_content">
            <h6>Data Quality</h6>
            <div style={{ padding: "0 0 10px 0" }}>
              <ProgressBar
                value={selectedColumn?.completeness * 100}
                size="big"
                status="active"
              />
            </div>
            <div className="flex_between">
              <div className="display_flex">
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    background: "#0f62fe",
                  }}
                ></div>
                <p>Valid Values</p>
              </div>
              <div className="display_flex">
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    background: "#CACACA",
                  }}
                ></div>
                <p>Missing Values</p>
              </div>
            </div>
            <div className="flex_between" style={{ padding: "10px 0" }}>
              <div
                className="display_flex"
                style={{
                  gap: "20px",
                  alignItems: "baseline",
                  color: "#525252",
                }}
              >
                <h6>
                  {!isNaN(validValueContentLeft)
                    ? validValueContentLeft.toLocaleString("en-US")
                    : "- -"}
                </h6>
                <p>
                  {!isNaN(validValueContentLeft)
                    ? `${validValueContentRight}%`
                    : "- -"}
                </p>
              </div>
              <div
                className="display_flex"
                style={{
                  paddingRight: "4rem",
                  gap: "20px",
                  alignItems: "baseline",
                  color: "#525252",
                }}
              >
                <h6>
                  {missingValueContent.right
                    ? missingValueContent.right.toLocaleString("en-US")
                    : "- -"}
                </h6>
                <p>
                  {missingValueContent.right
                    ? `${
                        selectedColumn?.completeness
                          ? 100 - Math.ceil(selectedColumn?.completeness * 100)
                          : 100
                      }%`
                    : "- -"}
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <RangeSlider
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Min: {sliderValue[0]}%</div>
                <div>Max: {sliderValue[1]}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="top_card">
          <div className="card_content">
            <h6 style={{ paddingBottom: "5px" }}>Data Insights</h6>
            <div
              style={{
                width: "100%",
                height: "1px",
                marginTop: "4px",
                marginBottom: "4px",
                backgroundColor: "rgba(22,22,22,.5)",
              }}
            />
            <div className="flex_between">
              <div className="display_flex" style={{ gap: "20px" }}>
                <Tag type="blue" title="Clear Filter" filter={false}>
                  {selectedColumn?.dataType || "Data Type"}
                </Tag>
                <Tag type="green" title="Clear Filter" filter={false}>
                  Normal
                </Tag>
              </div>
              <div className="display_flex" style={{ gap: "20px" }}>
                <h6>{uniqueValueContent.left}</h6>
                <p>
                  {!isNaN(uniqueValueContent.right)
                    ? uniqueValueContent.right?.toLocaleString("en-US")
                    : "- -"}
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                marginTop: "4px",
                marginBottom: "4px",
                backgroundColor: "rgba(22,22,22,.5)",
              }}
            />
            <div className="flex_between">
              <Tag type="gray" title="Clear Filter" filter={false}>
                Missing
              </Tag>
              <div className="display_flex" style={{ gap: "20px" }}>
                <h6>{missingValueContent.left}</h6>
                <p>
                  {!isNaN(missingValueContent.right)
                    ? missingValueContent.right?.toLocaleString("en-US")
                    : "- -"}
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                marginTop: "4px",
                marginBottom: "4px",
                backgroundColor: "rgba(22,22,22,.5)",
              }}
            />
            <div className="flex_between">
              <Tag type="teal" title="Clear Filter" filter={false}>
                Data Class
              </Tag>
              <div className="display_flex" style={{ gap: "20px" }}>
                <h6>{`${assignedDataClass?.name || "N/A"}`}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid_container_">
        <div className="bottom_card">
          <div className="card_content">
            <h6>Value Distribution</h6>
            <style>
              {`
        .toolbar-control {
          display: none;
        }
        .checkbox {
          display: none;
        }
        p[id^="chart--legend-datagroup"] {
          display: none;
        }
        .clickable {
          display: none;
        }
       `}
            </style>
            <div>
              <Histogram
                histogramData={valueDistributionData}
                isValueFileName={
                  selectedColumn?.columnName === "input_file_name"
                }
              />
            </div>
            <div>
              <div style={{ padding: "0 50px 0 0" }}>
                <DataHealthHorizontalBoxPLotChart
                  boxPlotChartData={boxPlotChartData}
                />
              </div>
              <div
                className="flex_between"
                style={{ padding: "0 65px 0 55px" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>Min</p>
                  <p>{boxPlotChartData.numMinValue}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>Mean</p>
                  <p>{boxPlotChartData.numMean}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>Max</p>
                  <p>{boxPlotChartData.numMaxValue}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>Stand. Deviation</p>
                  <p>{boxPlotChartData.numStddev}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_card">
          <div className="card_content">
            <h6>Data Type Distribution</h6>
            <div>
              <Histogram
                histogramData={dataTypeValues}
                label={selectedColumn?.dataType}
              />
            </div>
            <hr />
            <div
              style={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                width:
                  selectedColumn?.columnName === "input_file_name"
                    ? "100%"
                    : "85%",
                gap: "30px",
                scrollBehavior: "smooth",
                overflowY: "auto",
                paddingBottom: "20px",
              }}
            >
              <div>
                <h6 style={{ marginBottom: "10px" }}>Values</h6>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    fontSize: "14px",
                    alignItems: "baseline",
                  }}
                >
                  <h6>Min: </h6>
                  {selectedColumn?.columnName === "input_file_name"
                    ? selectedColumn?.minValue?.split("/").pop()
                    : selectedColumn?.minValue}

                  <h6>Max: </h6>
                  {selectedColumn?.columnName === "input_file_name"
                    ? selectedColumn?.maxValue?.split("/").pop()
                    : selectedColumn?.maxValue}
                </div>
              </div>
              <div>
                <h6 style={{ marginBottom: "10px" }}>Length</h6>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    fontSize: "14px",
                    alignItems: "baseline",
                  }}
                >
                  <h6>Min: </h6> {selectedColumn?.minLength}
                  <h6>Max: </h6>
                  {selectedColumn?.maxLength}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Grid className="correlation_table">
        <DataHealthProfileCorrelation correlationData={correlationData} />
      </Grid> */}
    </div>
  );
}

export default DataHealthRightColumn;
