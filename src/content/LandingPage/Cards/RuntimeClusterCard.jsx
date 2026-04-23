import Loading from "components/Loading";
import { useRuntime } from "hooks/runtime/useRuntime";
import React from "react";
import { CustomEChart } from "sharedComponents/Charts";

const transformStatuses = (Data) => {
  const statusCounts = {
    Error: 0,
    Running: 0,
    Terminated: 0,
    Succeeded: 0,
    Starting: 0,
    Failed: 0,
    Submitted: 0,
    Dead: 0,
    Offline: 0,
  };

  Data?.forEach((item) => {
    const status = item.state;

    if (status === "ERROR") {
      statusCounts["Error"]++;
    } else if (status === "RUNNING") {
      statusCounts["Running"]++;
    } else if (status === "TERMINATED") {
      statusCounts["Terminated"]++;
    } else if (status === "SUCCEEDED") {
      statusCounts["Succeeded"]++;
    } else if (status === "STARTING") {
      statusCounts["Starting"]++;
    } else if (status === "FAILED") {
      statusCounts["Failed"]++;
    } else if (status === "SUBMITTED") {
      statusCounts["Submitted"]++;
    } else if (status === "DEAD") {
      statusCounts["Dead"]++;
    } else if (status === "OFFLINE") {
      statusCounts["Offline"]++;
    }
  });
  return [
    { label: "Succeeded", count: statusCounts["Succeeded"], color: "#42BE65" },
    {
      label: "Terminated",
      count: statusCounts["Terminated"],
      color: "gray",
    },
    { label: "Failed", count: statusCounts["Failed"], color: "red" },
    { label: "Running", count: statusCounts["Running"], color: "#F1C21B" },
    { label: "Error", count: statusCounts["Error"], color: "orange" },

    { label: "Starting", count: statusCounts["Starting"], color: "dodgerblue" },

    {
      label: "Submitted",
      count: statusCounts["Submitted"],
      color: "blue",
    },
    { label: "Dead", count: statusCounts["Dead"], color: "maroon" },
    { label: "Offline", count: statusCounts["Offline"], color: "#E0E0E0" },
  ];
};

function RuntimeClusterCard() {
  const { data: runtimeData, isLoading: isRuntimeDataLoading } = useRuntime();

  const ClusterData = transformStatuses(runtimeData);

  const colors = ClusterData.map((item) => item.color);
  const pieChartData = ClusterData.map((item) => ({
    value: item.count,
    name: item.label,
  }));

  const pieChartOptions = {
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["45%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        itemStyle: {
          color: function (params) {
            return colors[params.dataIndex];
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: pieChartData || [],
      },
    ],
  };
  return (
    <div className={`landing-page-card`}>
      <div className="landing-page-card-header">
        <p>Runtime / Cluster</p>
      </div>
      <div className="landing-page-card-body">
        {isRuntimeDataLoading ? (
          <Loading />
        ) : (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="body_container"
          >
            <div>
              <p style={{ fontSize: "14px", lineHeight: "20px" }}>
                Last Run Status
              </p>
              <p
                style={{
                  fontSize: "32px",
                  lineHeight: "40px",
                  fontWeight: 300,
                }}
              >
                {runtimeData?.length}
              </p>
              <div className="display_flex" style={{ marginTop: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column",
                  }}
                >
                  {colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: color,
                        width: "10px",
                        height: "10px",
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "column",
                  }}
                >
                  {pieChartData.slice(0, 4).map((data, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "5px",
                        fontSize: "12px",
                        lineHeight: "16px",
                      }}
                    >
                      <div>{data.name}</div>
                      <div>{`(${data.value})`}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "-20px", width: "50%" }}>
              <CustomEChart
                chartOptions={pieChartOptions}
                chartStyles={{ height: "200px", width: "100%" }}
                elementId={"runtime_cluster"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RuntimeClusterCard;
