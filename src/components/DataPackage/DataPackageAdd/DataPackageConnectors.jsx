import React, { useState } from "react";
import CustomDataTable from "../../Datatable";
import { useDataConnections } from "../../../hooks/dataconnectors/useDataConnectors";
import DataPackageAddModal from "../DataPackageAdd";
import DataConnectorAddModal from "../../DataConnector/DataConnectorAddModal";
import { CONNECTION_TYPES } from "../../../constants";

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

function DataPackageConnectors() {
  const { data: dataConnections } = useDataConnections();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [
    isDataPackageConnectorsAddModalOpen,
    setIsDataPackageConnectorsAddModalOpen,
  ] = useState(false);

  return (
    <>
      {isAddModalOpen && (
        <DataPackageAddModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          setIsDataPackageConnectorsAddModalOpen={
            setIsDataPackageConnectorsAddModalOpen
          }
        />
      )}
      {isDataPackageConnectorsAddModalOpen && (
        <DataConnectorAddModal
          setIsOpen={setIsDataPackageConnectorsAddModalOpen}
          isOpen={isDataPackageConnectorsAddModalOpen}
          items={CONNECTION_TYPES}
        />
      )}

      <CustomDataTable
        tableHeading="Data Connectors"
        headers={headerData}
        rows={dataConnections}
        shouldTableBatchActionsRender={true}
        shouldAddNewButton={true}
        openAddModal={() => setIsDataPackageConnectorsAddModalOpen(true)}
      />
    </>
  );
}

export default DataPackageConnectors;
