import ReactEcharts from "echarts-for-react";

function Histogram({ histogramData, label, isValueFileName = false }) {
  const frequency = histogramData?.map((histogram) => {
    const result =
      histogram.frequencyPercent - Math.floor(histogram.frequencyPercent) < 0.5;

    if (result) return Math.floor(histogram.frequencyPercent);
    else return Math.ceil(histogram.frequencyPercent);
  });

  const dataValue = histogramData?.map((histogram) =>
    histogram.dataValue
      ? isValueFileName
        ? `${histogram.dataValue.split("/").pop()}`
        : `${histogram.dataValue}`
      : `${histogram?.suggestedDataType}`
  );
  const options = {
    color: "#78A9FF",
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      show: true,
      data: dataValue?.length ? dataValue : ["Value"],
    },
    yAxis: {
      type: "value",
      show: true,
      min: 0,
      max: 100,
    },
    series: [
      {
        data: frequency?.length ? frequency : [0],

        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <ReactEcharts
      option={options}
      style={{ width: "95%", height: "250px", marginLeft: "15px" }}
    ></ReactEcharts>
  );
}

export default Histogram;
