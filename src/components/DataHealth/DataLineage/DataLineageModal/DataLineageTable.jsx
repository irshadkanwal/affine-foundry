import React from "react";
import CustomDataTable from "components/Datatable";
import { jsonStringify } from "utils/jsonStringify";

const headers = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "dataType",
    header: "Type",
  },
  {
    key: "nullable",
    header: "Nullable",
  },
];

function DataLineageTable({ lineageData }) {
  const parsed = jsonStringify(lineageData?.tableSchema);
  const rows = parsed?.fields?.map((values, index) => {
    return {
      ...values,
      dataType: JSON.stringify(values.type),
      id: index,
    };
  });
  return (
    <>
      <CustomDataTable
        rows={rows || []}
        headers={headers}
        shouldTableBatchActionsRender={false}
        shouldAddNewButton={false}
        shouldActionsRender={false}
        isActiveTag={false}
        isSelectionEnable={false}
      />
    </>
  );
}
export default DataLineageTable;
