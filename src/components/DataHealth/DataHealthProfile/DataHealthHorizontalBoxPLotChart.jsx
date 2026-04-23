import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";

function DataHealthHorizontalBoxPLotChart({ boxPlotChartData }) {
  const chartContainerRef = useRef(null);
  // numMaxValue: selectedColumn?.numMaxValue,
  // numMean: selectedColumn?.numMean,
  // numMinValue: selectedColumn?.numMinValue,
  // numStddev: selectedColumn?.numStddev,

  useEffect(() => {
    const chartOptions = {
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        data: ["Category A"],
        show: false,
      },
      series: [
        {
          itemStyle: {
            color: "#D0E2FF",
          },
          type: "boxplot",
          data: [
            [
              0,
              boxPlotChartData.numMinValue,
              boxPlotChartData.numStddev,
              boxPlotChartData.numMean,
              boxPlotChartData.numMaxValue,
            ],
          ],
        },
      ],
    };
    const chart = echarts.init(chartContainerRef.current);
    chart.setOption(chartOptions);

    const resizeChart = () => {
      chart.resize();
    };

    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
      chart.dispose();
    };
  }, [
    boxPlotChartData.numMaxValue,
    boxPlotChartData.numMean,
    boxPlotChartData.numMinValue,
    boxPlotChartData.numStddev,
  ]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "60%" }} />
  );
}

export default DataHealthHorizontalBoxPLotChart;
