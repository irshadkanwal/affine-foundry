import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([BarChart, CanvasRenderer]);

function GroupBarChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    function splitter(name) {
      if (name.length > 7) {
        return name.substring(0, 7) + "...";
      }
      return name;
    }

    const option = {
      dataset: {
        source: [
          ["score", "amount", "product"],
          [1, 5212, "Match Latte"],
          [0.2, 78254, "Milk Tea"],
          [0.5, 41032, "Cheese Cocoa"],
          [0.01, 12755, "Cheese Brownie"],
          [0.9, 20145, "Match Cocoa"],
          [0.4, 79146, "Tea"],
          [-1, 91852, "Orange Juice"],
          [0.6, 101852, "Lemon Juice"],
          [0.7, 20112, "Walnut Brownie"],
        ],
      },
      grid: { containLabel: true },

      xAxis: { name: "amount", show: false },

      yAxis: {
        type: "category",

        axisLabel: {
          formatter(params) {
            return splitter(params);
          },
        },
      },

      visualMap: {
        show: false,
        orient: "horizontal",

        left: "center",
        min: -1,
        max: 1,
        dimension: 0,
        inRange: {
          color: ["blue", "#D0E2FF", "#78A9FF"],
        },
      },
      series: [
        {
          type: "bar",

          encode: {
            x: "amount",
            y: "product",
          },
          label: {
            show: true,
            position: "right",
          },
        },
      ],
    };

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    window.addEventListener("resize", myChart.resize);

    return () => {
      myChart.dispose();
      window.removeEventListener("resize", myChart.resize);
    };
  }, []);

  return <div ref={chartRef} style={{ height: "350px", width: "100%" }}></div>;
}

export default GroupBarChart;
