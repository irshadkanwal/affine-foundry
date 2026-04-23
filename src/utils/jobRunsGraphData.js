export const getGraphData = (data) => {
  if (!data?.length) {
    return;
  }
  const dates = [...new Set(data?.map(({ runDate }) => runDate))]?.sort();
  let tempArray = new Array(dates?.length).fill(0);

  const intitalReducerValue = {
    success: tempArray,
    submitted: tempArray,
    fail: tempArray,
  };

  const yAxis = data?.reduce((acc, curr, i) => {
    const dataIndex = dates.indexOf(curr.runDate);
    const updatesTotal = acc[curr.status]?.map((total, index) => {
      return dataIndex === index ? curr.total : total;
    });

    return { ...acc, [curr.status]: updatesTotal };
  }, intitalReducerValue);

  return { xAxis: dates, yAxis };
};
