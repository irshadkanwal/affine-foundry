import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

function InventoryPieChart({ pieChartData, setSeletedLegend }) {
  const chartValues = React.useMemo(() => {
    if (!pieChartData) return [];

    return pieChartData.map((data) => ({
      value: data?.total,
      name: data?.status.charAt(0).toUpperCase() + data?.status.slice(1),
    }));
  }, [pieChartData]);
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const updateChartSize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", updateChartSize);

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "35%",
        right: "10%",
        orient: "vertical",
        itemWidth: 20,
        itemHeight: 20,
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          left: "-30%",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            color: function (params) {
              if (params.name === "Ready") {
                return "#ffd694";
              } else if (params.name === "Fail") {
                return "#ffd7d9";
              } else if (params.name === "Ingested") {
                return "#85B6FF";
              } else if (params.name === "Inspected") {
                return "#9ef0f0";
              } else if (params.name === "Parsed") {
                return "#e8daff";
              } else if (params.name === "Needs Attention") {
                return "#ffd6e8";
              } else if (params.name === "Success") {
                return "#4ECB71";
              } else if (params.name === "Duplicate") {
                return "#CBC2A0";
              }
            },
            borderWidth: 0,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: chartValues,
        },
      ],
    };

    myChart.setOption(option);
    myChart.on("legendselectchanged", (params) => {
      setSeletedLegend(params?.selected);
    });

    return () => {
      window.removeEventListener("resize", updateChartSize);
      myChart.dispose();
    };
  }, [chartValues, setSeletedLegend]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
}

export default InventoryPieChart;
