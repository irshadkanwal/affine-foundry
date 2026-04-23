import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { dateFormatChart } from "utils/formatDateTime";

echarts.use([LineChart, GridComponent, CanvasRenderer]);

function InventoryLineChart({ lineChartData }) {
  const chartRef = useRef(null);
  const dateTimeList = React.useMemo(() => {
    if (!lineChartData) return [];

    return lineChartData.map((data) =>
      data?.processedDateTime ? dateFormatChart(data?.processedDateTime) : ""
    );
  }, [lineChartData]);

  const totalCountList = React.useMemo(() => {
    if (!lineChartData) return [];

    return lineChartData.map((data) => data?.total);
  }, [lineChartData]);
  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener("resize", resizeChart);

    const option = {
      color: "#78A9FF",
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dateTimeList,
        // axisLabel: {
        //     padding: [10, 50]
        // }
        axisPointer: {
          show: true,
          type: "shadow",
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: totalCountList,
          type: "line",
          areaStyle: {},
        },
      ],
      dataZoom: [
        {
          type: "slider",
          bottom: 10,
          start: 0,
          end: 100,
          backgroundColor: "#78A9FF",
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      window.removeEventListener("resize", resizeChart);
      myChart.dispose();
    };
  }, [dateTimeList, totalCountList]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
}

export default InventoryLineChart;
