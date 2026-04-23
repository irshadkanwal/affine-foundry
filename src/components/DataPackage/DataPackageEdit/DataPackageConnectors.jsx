import React from "react";
import CustomDataTable from "../../Datatable";
import DeleteModel from "../../DeleteModel/DeleteModel";
import DataConnectorEditModal from "../../DataConnector/DataConnectorEditModal";
import DataConnectorAddModal from "../../DataConnector/DataConnectorAddModal";
import { useDeleteDataConnector } from "../../../hooks/dataconnectors/useDeleteDataConnector";
import { CONNECTION_TYPES } from "../../../constants";
import { useDataPackageConnections } from "hooks/datapackage/useDataPackageConnections";
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

function DataPackageConnectors({ selectedDataPackageId }) {
  const { data: dataConnections } = useDataPackageConnections(
    selectedDataPackageId
  );
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState();

  const {
    mutateAsync: deleteConnection,
    isLoading: isConnectionDeleteLoading,
  } = useDeleteDataConnector();

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const deleteCaller = (id) => {
    deleteConnection({ connectionId: id });
  };
  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const items = CONNECTION_TYPES;

  return (
    <>
      <CustomDataTable
        headers={headerData}
        deleteAction={deleteActionHanlder}
        shouldTableBatchActionsRender={true}
        deleteBatchAction={deleteBatchActionHanlder}
        rows={dataConnections}
        buttonText="New Connection +"
        openAddModal={setIsAddModalOpen}
        openEditModal={setIsEditModalOpen}
        tableHeading="Data Connectors"
        getSelectedRow={setSelectedData}
      />
      {isAddModalOpen && (
        <DataConnectorAddModal
          items={items}
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          setIsConnectionPropertyModalOpen={() => {}}
        />
      )}
      {isEditModalOpen && (
        <DataConnectorEditModal
          items={items}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedData={selectedData}
        />
      )}

      {(isDeleteModelOpen || isConnectionDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isConnectionDeleteLoading}
        />
      )}
    </>
  );
}

export default DataPackageConnectors;
