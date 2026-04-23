const sortJobRunsArray = (runs = []) => {
  const sortedRuns = runs?.sort((value1, value2) => {
    const date1 = value1?.startedAt ? new Date(value1.startedAt) : null;
    const date2 = value2?.startedAt ? new Date(value2.startedAt) : null;

    if (date1 === null && date2 === null) return 0;
    if (date1 === null) return 1;
    if (date2 === null) return -1;

    return date2 - date1;
  });
  const reverseSortedRuns = [...sortedRuns].reverse();
  return reverseSortedRuns;
};

export default sortJobRunsArray;
