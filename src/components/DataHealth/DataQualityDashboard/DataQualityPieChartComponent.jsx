import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

function PieChartComponent({ pieChartData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const dataForChart = [
      { value: pieChartData?.header.pass, name: "Pass" },
      { value: pieChartData?.header.fail, name: "Fail" },
    ];
    const updateChartSize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", updateChartSize);

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "40%",
        right: "10%",
        orient: "vertical",
        itemWidth: 20,
        itemHeight: 20,
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            color: function (params) {
              if (params.name === "Pass") {
                return "#0F62FE";
              } else if (params.name === "Fail") {
                return "#E83D46";
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
          data: dataForChart,
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      window.removeEventListener("resize", updateChartSize);
      myChart.dispose();
    };
  }, [pieChartData]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
}

export default PieChartComponent;
