import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { calculateDuration } from "utils/formatDateTime";

echarts.use([BarChart, GridComponent, CanvasRenderer]);

function JobDetailsRunsMatrixChart({ updateBarWidth, chartData }) {
  const chartRef = useRef(null);
  const data = React.useMemo(() => {
    const data =
      chartData?.constructor === Object ? Object.values(chartData) : [];
    const maxValues = data.map((item) => item.value);
    const max = Math.max(...maxValues);
    const averageValue = Math.floor(
      data?.reduce((acc, currentValue) => acc + currentValue.value, 0) /
        data?.length
    );

    return {
      max,
      data,
      averageValue,
    };
  }, [chartData]);
  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const resizeChart = () => {
      myChart.resize();
      calculateBarWidth();
    };

    window.addEventListener("resize", resizeChart);

    const option = {
      color: "#0F62FE",
      grid: { top: 20, right: 40, bottom: 20, left: 40 },
      xAxis: {
        type: "category",
        show: false,
        data: data?.data,
      },
      yAxis: {
        title: "Run Total Duration",
        type: "value",
        show: true,
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          data: data?.data,

          type: "bar",
          smooth: true,
          color: "#0F62FE",
          markLine: {
            data: [
              {
                yAxis: data?.averageValue,
                lineStyle: {
                  color: "lightgray",
                  type: "solid",
                },
                label: {
                  position: "insideStartTop",
                  color: "black",
                  formatter: calculateDuration(data?.averageValue, false),
                },
                symbol: "",
                symbolSize: 0,
              },
              {
                yAxis: data?.max,
                lineStyle: {
                  color: "lightgray",
                  type: "solid",
                },
                label: {
                  position: "insideStartTop",
                  color: "black",
                  formatter: calculateDuration(data?.max, false),
                },
                symbol: "",
                symbolSize: 0,
              },
            ],
          },
        },
      ],
      tooltip: {
        trigger: "axis",

        formatter: function (params) {
          return (
            params[0].data?.date +
            ":<br/>" +
            calculateDuration(params[0].value, false)
          );
        },
      },
    };

    myChart.setOption(option);

    const calculateBarWidth = () => {
      if (myChart) {
        const seriesData = myChart.getOption().series[0].data;
        if (seriesData.length > 0) {
          const barCount = seriesData.length;
          const gridOption = myChart.getModel().getComponent("grid")?.option;
          const barGap = myChart.getModel().getComponent("bar")?.option?.barGap;
          const categoryGap = myChart.getModel().getComponent("bar")
            ?.option?.barCategoryGap;
          const gridWidth =
            myChart.getWidth() -
            (gridOption?.left || 0) -
            (gridOption?.right || 0);
          const singleBarWidth =
            gridWidth / barCount - (barGap || 0) - (categoryGap || 0);
          updateBarWidth(singleBarWidth);
        }
      }
    };

    calculateBarWidth();

    return () => {
      window.removeEventListener("resize", resizeChart);
      myChart.dispose();
    };
  }, [updateBarWidth, data]);

  return <div ref={chartRef} style={{ width: "100%", height: "200px" }} />;
}

export default JobDetailsRunsMatrixChart;
