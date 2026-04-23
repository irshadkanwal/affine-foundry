import Loading from "components/Loading";
import { useDataInventoryStatus } from "hooks/dashboard/useDataInventoryStatus";
import React from "react";
import { CustomEChart } from "sharedComponents/Charts";

function DataInventoryStatusCard({ className = "" }) {
  const { data: dataInventoryStatus, isLoading: IsDataInventoryStatusLoading } =
    useDataInventoryStatus();
  const colors = ["#8A3FFC", "#78A9FF", "#74E792", "#E8DAFF"];
  const chartData = dataInventoryStatus?.map((item, index) => ({
    color: colors[index],
    count: item.totalRecords,
    status: item.inventoryStatus,
  }));
  const totalRecordsSum = dataInventoryStatus?.reduce(
    (sum, item) => sum + item.totalRecords,
    0
  );

  const options = {
    grid: {
      left: 0,
      right: 0,
    },
    xAxis: {
      type: "category",
      data: chartData?.map((item) => ({
        value: item.status,
      })),
      show: false,
    },
    yAxis: {
      type: "value",
      show: true,
    },
    series: [
      {
        data: chartData?.map((item) => ({
          value: item.count,
          itemStyle: {
            color: item.color,
          },
        })),
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    label: {
      show: true,
      position: "top",
    },
  };

  return (
    <div className={`landing-page-card ${className}`}>
      <div className="landing-page-card-header">
        <p>Data Inventory Status </p>
      </div>
      {IsDataInventoryStatusLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="landing-page-card-body">
          <div
            className="landing-page-card-body-row"
            style={{
              fontWeight: 300,
              fontSize: "32px",
              lineHeight: "40px",
            }}
          >
            {totalRecordsSum}
          </div>
          <div className="landing-page-card-body-row">
            <CustomEChart
              chartOptions={options}
              chartStyles={{ width: "100%", minHeight: "5.5rem" }}
              elementId={"inventory-status-chart"}
            />
          </div>
          <div className="landing-page-legend">
            {dataInventoryStatus?.map((item, index) => (
              <div
                className="landing-page-legend-item"
                key={item.inventoryStatus}
              >
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    background: colors[index],
                  }}
                />
                <p>{item.inventoryStatus}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataInventoryStatusCard;
