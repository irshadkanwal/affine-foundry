import React from "react";
import { Loading, Modal } from "@carbon/react";
import AddNewProperty from "./AddNewProperty";
import EditPropertyModal from "./EditPropertyModal";
import CustomDataTable from "../Datatable";
import DeleteModel from "../DeleteModel/DeleteModel";
import { useDeleteDataConnectionProp } from "hooks/dataconnectors/useDeleteDataConnectionProperty";
import { useDataConnectionProps } from "hooks/dataconnectors/useConnectionProp";

const headerData = [
  {
    key: "key",
    header: "Key",
  },
  {
    key: "value",
    header: "Value",
  },
  {
    key: "isSecret",
    header: "Secret Key",
  },
];

function DataConnectionProperties({
  selectedData,
  isConnectionPropertyModalOpen,
  setIsConnectionPropertyModalOpen,
}) {
  const {
    data: dataConnectionProperties = [],
    isLoading: isdataConnectionPropertiesLoading,
  } = useDataConnectionProps(selectedData?.id);
  const {
    mutateAsync: deleteDataConnectionProp,
    isLoading: isDeleteConnectionPropLoading,
  } = useDeleteDataConnectionProp();

  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = React.useState();
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] =
    React.useState();
  const [selectedRow, setSelectedRow] = React.useState();
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const [connectionPropertiesById, setConnectionPropertiesById] =
    React.useState([]);

  React.useEffect(() => {
    const filteredConnectionProperties = dataConnectionProperties?.filter(
      (connection) => connection.connectionId === selectedData?.id
    );
    setConnectionPropertiesById(filteredConnectionProperties);
  }, [dataConnectionProperties, selectedData]);
  const deleteCaller = (id) => {
    deleteDataConnectionProp({ connectionPropId: id });
  };

  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const selectedRowData = selectedData;
  // ?.cells.reduce((acc, value) => {
  //   const objectKey = value.id.split(":");
  //   return { ...acc, [objectKey[1]]: value.value, id: selectedData.id };
  // }, {});

  return (
    <Modal
      open={isConnectionPropertyModalOpen}
      modalHeading="Connection Properties"
      primaryButtonText="Add"
      onRequestClose={() => setIsConnectionPropertyModalOpen(false)}
      passiveModal
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <div style={{ height: "600px" }}>
        <div
          style={{
            display: "flex",
            padding: "10px",
            marginRight: "150px",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px" }}>Connection ID</p>
              <p>{selectedRowData?.id}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px" }}>Connection Name</p>
              <p>{selectedRowData?.name}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px" }}>Active</p>
              <p>{selectedRowData?.active ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
        {isdataConnectionPropertiesLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "150px",
              alignItems: "center",
            }}
          >
            <Loading withOverlay={false} />
          </div>
        ) : (
          <CustomDataTable
            tableHeading="Properties"
            headers={headerData}
            rows={connectionPropertiesById}
            deleteAction={deleteActionHanlder}
            deleteBatchAction={deleteBatchActionHanlder}
            buttonText="New Property +"
            shouldTableBatchActionsRender={true}
            openEditModal={setIsEditPropertyModalOpen}
            openAddModal={setIsAddPropertyModalOpen}
            getSelectedRow={setSelectedRow}
            isActiveTag={false}
          />
        )}

        {isAddPropertyModalOpen && (
          <AddNewProperty
            selectedConnectionId={selectedRowData?.id}
            isAddPropertyModalOpen={isAddPropertyModalOpen}
            setIsAddPropertyModalOpen={setIsAddPropertyModalOpen}
            selectedRow={selectedRow}
          />
        )}
        {isEditPropertyModalOpen && (
          <EditPropertyModal
            selectedConnectionId={selectedRowData?.id}
            isEditPropertyModalOpen={isEditPropertyModalOpen}
            setIsEditPropertyModalOpen={setIsEditPropertyModalOpen}
            selectedRow={selectedRow}
          />
        )}
        {(isDeleteModelOpen || isDeleteConnectionPropLoading) && (
          <DeleteModel
            deleteActionHanlder={deleteActionHanlder}
            deleteCaller={deleteCaller}
            itemsToDeleteIDs={itemsToDeleteIDs}
            setIsDeleteModelOpen={setIsDeleteModelOpen}
            setitemsToDeleteIDs={setitemsToDeleteIDs}
            singleItemToDeleteID={singleItemToDeleteID}
            setSingleItemToDeleteID={setSingleItemToDeleteID}
            isLoading={isDeleteConnectionPropLoading}
          />
        )}
      </div>
    </Modal>
  );
}

export default DataConnectionProperties;
