import React from "react";
import * as echarts from "echarts";

function EChart({ config, resize }) {
  const chart = React.useRef(null);
  const [chartEl, setChartEl] = React.useState(chart);

  React.useEffect(() => {
    //console.log(chartEl.current);

    if (resize) {
      chartEl.resize();
    }
    if (!chartEl.current) {
      chartEl.setOption(config);
    } else {
      setChartEl(echarts.init(chart.current));
    }
  }, [chartEl, config, resize]);
  return <div ref={chart} style={{ height: "300px", width: "320px" }}></div>;
}

export default EChart;
