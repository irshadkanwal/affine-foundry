export const generateCsv = (csvRows = [], csvHeaders = []) => {
  //console.log(csvRows);
  const csvStringValue = [
    csvHeaders,
    ...csvRows.map((data) => {
      return csvHeaders.map((value) =>
        value !== "recordCount" ? data[value] : data[value]?.replace(/,/g, "")
      );
    }),
  ]
    .map((e) => e.join(","))
    .join("\n");
  return csvStringValue;
};
