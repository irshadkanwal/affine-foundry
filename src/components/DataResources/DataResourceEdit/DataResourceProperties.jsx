import React from "react";
import CustomDataTable from "../../Datatable";
import { useDataResourceByIdProperties } from "../../../hooks/dataresources/useDataResourceProp";
import DeleteModel from "../../DeleteModel/DeleteModel";
import DataResourcePropertyEditModal from "./DataResourcePropertyEditModel";
import DataResourcePropertyAddModal from "./DataResourcePropertyAddModal";
import { useDeleteDataResourcePropety } from "../../../hooks/dataresources/useDeleteDataResourceProperties";

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
    key: "appendToRecord",
    header: "Append To Record",
  },
];

function DataResourceProperties({ selectedDataResourceId }) {
  const { data: resourceProp } = useDataResourceByIdProperties(
    selectedDataResourceId
  );
  const [isOpenPropetiesEditModal, setIsOpenPopertiesEditModal] =
    React.useState();
  const [selectedRow, setSelectedRow] = React.useState();
  const {
    mutateAsync: deleteProperties,
    isLoading: isPackagePropertiesDeleteLoading,
  } = useDeleteDataResourcePropety(selectedDataResourceId);

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const [
    isDataResourcePropertyAddModalOpen,
    setIsDataResourcePropertyAddModalOpen,
  ] = React.useState(false);
  const deleteCaller = (id) => {
    deleteProperties({ propertyId: id });
  };

  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  return (
    <>
      <CustomDataTable
        headers={headerData}
        rows={resourceProp}
        tableHeading="Properties"
        shouldTableBatchActionsRender={true}
        shouldAddNewButton={true}
        buttonText="New Property +"
        deleteBatchAction={deleteBatchActionHanlder}
        deleteAction={deleteActionHanlder}
        getSelectedRow={setSelectedRow}
        openEditModal={setIsOpenPopertiesEditModal}
        openAddModal={setIsDataResourcePropertyAddModalOpen}
        isActiveTag={false}
        statusWidth="200px"
      />
      {isOpenPropetiesEditModal && (
        <DataResourcePropertyEditModal
          isOpen={isOpenPropetiesEditModal}
          setIsOpen={setIsOpenPopertiesEditModal}
          selectedDataResourceId={selectedDataResourceId}
          selectedRow={selectedRow}
        />
      )}
      {(isDeleteModelOpen || isPackagePropertiesDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          isDeleteModelOpen={isDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isPackagePropertiesDeleteLoading}
        />
      )}
      {isDataResourcePropertyAddModalOpen && (
        <DataResourcePropertyAddModal
          selectedDataResourceId={selectedDataResourceId}
          setIsDataResourcePropertyAddModalOpen={
            setIsDataResourcePropertyAddModalOpen
          }
          isDataResourcePropertyAddModalOpen={
            isDataResourcePropertyAddModalOpen
          }
        />
      )}
    </>
  );
}

export default DataResourceProperties;
