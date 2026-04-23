import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { getGraphData } from "utils/jobRunsGraphData";

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

function JobRunStackedBarChart({ jobRunCountsByStatus = [] }) {
  const chartRef = useRef(null);
  const graghData = React.useMemo(
    () => getGraphData(jobRunCountsByStatus),
    [jobRunCountsByStatus]
  );

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const updateChartSize = () => {
      myChart.resize();
    };

    window.addEventListener("resize", updateChartSize);

    const option = {
      xAxis: {
        type: "category",
        data: graghData?.xAxis || [],
      },

      yAxis: {},

      series: [
        {
          name: "Succeeded",
          data: graghData?.yAxis?.success || [],
          type: "bar",
          stack: "x",
          color: "#0F62FE",
        },
        {
          name: "Submitted",
          data: graghData?.yAxis?.submitted || [],
          type: "bar",
          stack: "x",
          color: "#8D8D8D",
        },
        {
          name: "Fail",
          data: graghData?.yAxis?.fail || [],
          type: "bar",
          stack: "x",
          color: "#DA1E28",
        },
      ],
      legend: {
        data: ["Submitted", "Succeeded", "Fail"],
        bottom: "10%",
        left: "10%",
        itemWidth: 15,
        itemHeight: 15,
      },
    };

    myChart.setOption(option);

    return () => {
      window.removeEventListener("resize", updateChartSize);
      myChart.dispose();
    };
  }, [graghData]);

  return <div ref={chartRef} style={{ width: "110%", height: "300px" }} />;
}

export default JobRunStackedBarChart;
