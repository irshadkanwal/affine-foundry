import React from "react";
import CustomDiv from "./CardCustomDiv";
import { CustomEChart } from "sharedComponents/Charts";
const pieChartData = [
  { value: 1048, name: "High" },
  { value: 735, name: "Medium" },
  { value: 580, name: "Low" },
  { value: 484, name: "Not determined" },
];
const color = ["#8A3FFC", "#4589FF", "#74E792", "#BAE6FF"];
const barChartData = [
  {
    color: "#8A3FFC",
    count: 12,
  },
  {
    color: "#78A9FF",
    count: 28,
  },
  {
    color: "#74E792",
    count: 36,
  },
  {
    color: "#E8DAFF",
    count: 15,
  },
];
const barChartOptions = {
  grid: {
    left: 0,
    right: 0,
  },
  xAxis: {
    type: "category",
    show: false,
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      data: barChartData.map((item) => ({
        value: item.count,
        itemStyle: {
          color: item.color,
        },
      })),
      type: "bar",
      smooth: true,
      barCategoryGap: 0,
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};

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
          return color[params.dataIndex];
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

function DataHealthCard({ className = "" }) {
  return (
    <div className={`landing-page-card ${className}`}>
      <div className="landing-page-card-header">
        <p>Data Health</p>
      </div>
      <div className="landing-page-card-body">
        <div
          style={{
            gap: "2%",
            display: "flex",
            padding: "0 0 10px 15px",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <p>Data Health Status</p>
            <p
              style={{
                fontWeight: 300,
                fontSize: "32px",
                lineHeight: "40px",
              }}
            >
              60
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div className="display_flex" style={{ marginTop: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      flexDirection: "column",
                    }}
                  >
                    {color.map((color, index) => (
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
                    {pieChartData.map((data, index) => (
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
              <div style={{ marginTop: "-80px", width: "50%" }}>
                <CustomEChart
                  elementId="health_chart"
                  chartOptions={pieChartOptions}
                  chartStyles={{ width: "100%", height: "200px" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              flexGrow: 1,
              marginTop: "-12px",
            }}
          >
            <CustomDiv
              title={"Data Health Profiles"}
              value={112}
              showHr={false}
            />
            <CustomDiv title={"Data Inventory"} value={26}>
              <CustomEChart
                chartOptions={barChartOptions}
                chartStyles={{ width: "20%", height: "60px" }}
                elementId={"data-health-chart"}
              />
            </CustomDiv>
            <CustomDiv title={"Data Lineage"} value={34} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataHealthCard;
