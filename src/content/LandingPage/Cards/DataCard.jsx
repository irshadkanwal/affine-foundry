import React from "react";
import CustomDiv from "./CardCustomDiv";
import { CustomEChart } from "sharedComponents/Charts";
import { useDataSummary } from "hooks/dashboard/useDataSummary";
import Loading from "components/Loading";

function DataCard() {
  const { data: dataSummary, isLoading: IsDataSummaryLoading } =
    useDataSummary();

  const color = [
    "#78A9FF",
    "#FF9A62",
    "#4ECB71",
    "#8A3FFC",
    "#E8DAFF",
    "#74E792",
  ];

  const chartData = dataSummary?.map((item) => ({
    value: item.totalCount,
    name: item.dataElement,
  }));

  const pieChartOptions = {
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        name: "Access From",
        type: "pie",
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
        data: chartData || [],
      },
    ],
  };

  return (
    <div className={`landing-page-card card_sla`}>
      <div className="landing-page-card-header">
        <p>Data</p>
      </div>
      {IsDataSummaryLoading ? (
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
        <div>
          {dataSummary?.map((summary, index) =>
            summary.dataElement === "Data Resource" ? (
              <CustomDiv
                title={summary.dataElement}
                value={summary.totalCount}
                key={index}
              >
                <CustomEChart
                  chartOptions={pieChartOptions}
                  chartStyles={{ height: "60px", width: "20%" }}
                  elementId={"data_chart"}
                />
              </CustomDiv>
            ) : (
              <CustomDiv
                title={summary.dataElement}
                value={summary.totalCount}
                key={index}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default DataCard;
