import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

function DataQualityStackedBarChart({ barChartData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const categoryList = barChartData?.byCategory?.map(
      (chartData) => chartData.category
    );
    const passList = barChartData?.byCategory?.map(
      (chartData) => chartData.passedCount
    );
    const failList = barChartData?.byCategory?.map(
      (chartData) => chartData.failedCount
    );
    const updateChartSize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", updateChartSize);

    const option = {
      xAxis: {
        type: "category",
        data: categoryList,
      },
      yAxis: {},

      series: [
        {
          data: passList,
          type: "bar",
          stack: "x",
          color: "#0f62fe",
        },
        {
          data: failList,
          type: "bar",
          stack: "x",
          color: "#E83D46",
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      window.removeEventListener("resize", updateChartSize);
      myChart.dispose();
    };
  }, [barChartData]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
}

export default DataQualityStackedBarChart;
