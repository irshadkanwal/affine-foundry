import CustomDataTable from "components/Datatable";

function DataHealthProfileCorrelationTable({
  headerList,
  correlationData,
  headerNameList,
}) {
  const correlationRowData = headerList?.map((item) => {
    const filtered = correlationData?.filter(
      (dataItem) => dataItem?.columnId1 === item
    );
    return filtered?.reduce((previousObject, currentObject) => {
      return Object.assign(previousObject, {
        id: item,
        name: item,
        [currentObject?.columnId2]: currentObject?.correlation,
      });
    }, {});
  });

  return (
    <>
      <CustomDataTable
        rows={correlationRowData || []}
        headers={headerNameList || []}
        isSelectionEnable={false}
        shouldActionsRender={false}
        shouldTableBatchActionsRender={false}
      />
    </>
  );
}

export default DataHealthProfileCorrelationTable;
