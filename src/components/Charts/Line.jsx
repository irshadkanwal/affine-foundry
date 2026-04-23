import React from "react";
import * as echarts from "echarts/core";
import EChart from "../EChart";

function Line({ color, colorTop, colorBottom }) {
  let option;
  let base = +new Date(2016, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let valueBase = Math.random() * 300;
  let valueBase2 = Math.random() * 50;
  let data = [];
  for (var i = 1; i < 10; i++) {
    var now = new Date((base += oneDay));
    var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join(
      "-"
    );
    valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
    valueBase <= 0 && (valueBase = Math.random() * 300);
    data.push([dayStr, valueBase]);
    valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
    valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
  }
  //console.log(data, "line-charts");
  option = {
    legend: {
      top: "bottom",
      data: ["Intention"],
    },
    xAxis: {
      show: false,
      type: "time",
      axisPointer: {
        value: "2016-10-7",
        snap: true,
        lineStyle: {
          color: "#7581BD",
          width: 2,
        },
      },
    },
    yAxis: {
      show: false,
      //   type: "value",
      axisTick: {
        // inside: true,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        // inside: true,
        // formatter: "{value}\n",
      },
      //   z: 10,
    },
    grid: {
      top: 110,
      left: 15,
      right: 15,
      height: 160,
    },
    dataZoom: [
      {
        type: "inside",
        throttle: 50,
      },
    ],
    series: [
      {
        name: "Fake Data",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        sampling: "average",
        itemStyle: {
          color: color,
        },
        stack: "a",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorTop,
            },
            {
              offset: 1,
              color: colorBottom,
            },
          ]),
        },
        data: data,
      },
    ],
  };
  return <EChart config={option} />;
}

export default Line;
