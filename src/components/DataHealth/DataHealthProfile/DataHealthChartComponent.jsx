import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import { HeatmapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
]);

const DataHealthChartComponent = ({ correlationData, axisNameList }) => {
  const chartRef = useRef(null);

  const correlationDataValue = React.useMemo(
    () => correlationData,
    [correlationData]
  );

  useEffect(() => {
    // Create the chart instance
    const myChart = echarts.init(chartRef.current);

    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener("resize", resizeChart);

    const xAxisData = axisNameList;
    const yAxisData = [...axisNameList].reverse();
    const arraysList = [];
    axisNameList?.forEach((item, id) => {
      const filtered = [...correlationDataValue]
        .reverse()
        ?.filter((dataItem) => dataItem.columnId1 === item);
      const setPair = filtered?.map(
        (currentValue, index) => [id, index, currentValue.correlation],
        []
      );
      arraysList.push(...setPair);
    });
    const data = arraysList;
    const option = {
      tooltip: {
        position: "top",
      },
      grid: {
        height: "70%",
        width: "88%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        splitArea: {
          show: true,
        },
        axisLabel: {
          rotate: 90,
        },
      },
      yAxis: {
        type: "category",
        data: yAxisData,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: -1,
        max: 1,
        textStyle: {
          color: "red",
          right: "40px",
        },
        show: false,
        itemHeight: 420,
        calculable: true,
        orient: "vertical",
        right: "34%",
        top: "9%",
        color: ["#0F62FE", "#F9F2F3", "#DA1E28"],
      },
      series: [
        {
          name: "Punch Card",
          type: "heatmap",
          data: data,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // Set the chart data
    myChart.setOption(option);

    // Clean up the chart instance when the component unmounts
    return () => {
      window.removeEventListener("resize", resizeChart);

      myChart.dispose();
    };
  }, [axisNameList, correlationDataValue]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          ref={chartRef}
          style={{ width: "100%", height: "600px", padding: "0 0 0 15%" }}
        />
        <div style={{}}>
          <div
            style={{
              width: "24px",
              height: "26.5rem",
              marginTop: "60px",
              backgroundImage:
                "linear-gradient(to top,#DA1E28,#F9F2F3,#0F62FE)",
            }}
          ></div>

          <div
            className="display_flex"
            style={{
              gap: "25%",

              width: "20rem",

              flexDirection: "column-reverse",
              height: "28rem",

              marginTop: "-134%",
              justifyContent: "start",
              alignItems: "start",
              paddingLeft: "30px",
            }}
          >
            <p>-1</p>
            <p>-0.5</p>
            <p>0.5</p>
            <p>1</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataHealthChartComponent;
