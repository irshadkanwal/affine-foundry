import React from "react";
import CustomDataTable from "../../Datatable";
import { useDataConnections } from "../../../hooks/dataconnectors/useDataConnectors";

const headerData = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "active",
    header: "Status",
  },
];

function DataResourceConnectors() {
  const { data: dataConnections } = useDataConnections();
  return (
    <CustomDataTable
      tableHeading="Data Connectors"
      headers={headerData}
      rows={dataConnections}
      shouldTableBatchActionsRender={true}
    />
  );
}

export default DataResourceConnectors;
