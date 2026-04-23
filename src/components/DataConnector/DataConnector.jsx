import React from "react";
import { useDataConnections } from "hooks/dataconnectors/useDataConnectors";
import DataConnectorAddModal from "./DataConnectorAddModal";
import DataConnectorEditModal from "./DataConnectorEditModal";
// import CustomDataTable from "../Datatable";
import TopLevelComps from "../TopLevelComps";
import DataConnectionProperties from "./DataConnectionProperties";
import { useDeleteDataConnector } from "hooks/dataconnectors/useDeleteDataConnector";
import DeleteModel from "../DeleteModel/DeleteModel";
import DataConnectorGridView from "./DataConnectGridView";

function DataConnector() {
  const [selectedData, setSelectedData] = React.useState();
  const { data: dataConnections = [], isLoading: isConnectionsLoading } =
    useDataConnections();
  const {
    mutateAsync: deleteConnection,
    isLoading: isConnectionDeleteLoading,
  } = useDeleteDataConnector();

  const [filterData, setFilterData] = React.useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const [isConnectionPropertyModalOpen, setIsConnectionPropertyModalOpen] =
    React.useState(false);

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

  const deleteCaller = (id) => {
    deleteConnection({ connectionId: id });
  };
  // const deleteBatchActionHanlder = (idList) => {
  //   setIsDeleteModelOpen(true);
  //   setitemsToDeleteIDs(idList);
  // };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const handleCardClick = (selectedRow) => {
    setSelectedData(selectedRow);
    setIsConnectionPropertyModalOpen(true);
  };

  // const headerData = [
  //   {
  //     key: "name",
  //     header: "Name",
  //   },
  //   {
  //     key: "type",
  //     header: "Type",
  //   },
  //   {
  //     key: "active",
  //     header: "Status",
  //   },
  // ];

  const onSubmit = (formData) => {
    if (formData.isYes && formData.isNo) {
      setFilterData(dataConnections);
      return;
    }

    if (formData.isYes && !formData.isNo) {
      const activeConnections = dataConnections.filter((connection) => {
        return connection.active === true;
      });
      setFilterData(activeConnections);
      return;
    }

    if (!formData.isYes && formData.isNo) {
      const inActiveConnections = dataConnections.filter((connection) => {
        return connection.active === false;
      });
      setFilterData(inActiveConnections);
      return;
    }

    setFilterData([]);
  };

  return (
    <>
      <TopLevelComps
        buttonName="New Data Connectors"
        name="Data Connectors"
        openAddModal={setIsAddModalOpen}
        onSubmit={onSubmit}
        filterLable="Connection Active"
        searchFilter={dataConnections}
        setFilterData={setFilterData}
      />
      <DataConnectorGridView
        onCardClick={handleCardClick}
        isDataConnectorLoading={isConnectionsLoading}
        setIsEditModalOpen={setIsEditModalOpen}
        setSelectedRow={setSelectedData}
        dataConnector={filterData || dataConnections}
        deleteActionHanlder={deleteActionHanlder}
      />
      {/* <CustomDataTable
        headers={headerData}
        deleteAction={deleteActionHanlder}
        deleteBatchAction={deleteBatchActionHanlder}
        rows={filterData || dataConnections}
        openAddModal={setIsAddModalOpen}
        openEditModal={setIsEditModalOpen}
        tableHeading="Data Connectors"
        getSelectedRow={setSelectedData}
        isClickAbleCell={true}
        handleCellClick={handleCellClick}
        isTableLoading={isConnectionsLoading}
      /> */}
      {isAddModalOpen && (
        <DataConnectorAddModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
        />
      )}
      {isEditModalOpen && (
        <DataConnectorEditModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedData={selectedData}
        />
      )}
      {isConnectionPropertyModalOpen && (
        <DataConnectionProperties
          selectedData={selectedData}
          //  connectionPropertiesById={connectionPropertiesById}
          setIsConnectionPropertyModalOpen={setIsConnectionPropertyModalOpen}
          isConnectionPropertyModalOpen={isConnectionPropertyModalOpen}
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

export default DataConnector;
