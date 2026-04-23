import React from "react";
import CustomDataTable from "../../Datatable";
import DeleteModel from "../../DeleteModel/DeleteModel";
import DataResourceDialectEditModal from "./DataResourceDialectEditModal";
import { useDataResourceByIdDialect } from "../../../hooks/dataresources/useDataResourceDialectsById";
import DataResourceDialectAddModal from "./DataResourceDialectAddModal";
import { useDeleteResourceDialect } from "../../../hooks/dataresources/useDeleteResourceDialect";

function DataResourceDialects({ selectedDataResourceId, dataFormatType }) {
  const [isOpenEditModal, setIsOpenEditModal] = React.useState();
  const [selectedRow, setSelectedRow] = React.useState();
  const {
    mutateAsync: deleteResourceDialect,
    isLoading: isDeleteResourceDialectDeleteLoading,
  } = useDeleteResourceDialect(selectedDataResourceId);
  const [
    isDataResourceDialectAddModalOpen,
    setIsDataResourceDialectAddModalOpen,
  ] = React.useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const { data: resourceDialects } = useDataResourceByIdDialect(
    selectedDataResourceId
  );

  const deleteCaller = (id) => {
    deleteResourceDialect({ dialectId: id });
  };

  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const headerData = [
    {
      key: "key",
      header: "Display Name",
    },
    {
      key: "value",
      header: "Value",
    },
  ];

  const textDelimitedHeaderData = [
    {
      key: "skipLines",
      header: "Skip Lines",
    },
    {
      key: "skipFooter",
      header: "Skip Footer",
    },
    {
      key: "delimiter",
      header: "Delimiter",
    },
    {
      key: "header",
      header: "Header",
    },
    {
      key: "comment",
      header: "Comment",
    },
    {
      key: "fileNamingConvention",
      header: "File Naming Convention",
    },
  ];

  return (
    <>
      <CustomDataTable
        headers={
          dataFormatType === "Text_Delimited"
            ? textDelimitedHeaderData
            : headerData
        }
        deleteAction={deleteActionHanlder}
        deleteBatchAction={deleteBatchActionHanlder}
        getSelectedRow={setSelectedRow}
        rows={resourceDialects}
        tableHeading="Resource Dialects"
        shouldTableBatchActionsRender={true}
        shouldAddNewButton={true}
        buttonText="New Resource Dialect +"
        openEditModal={setIsOpenEditModal}
        openAddModal={setIsDataResourceDialectAddModalOpen}
      />
      {isOpenEditModal && (
        <DataResourceDialectEditModal
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          selectedDataResourceId={selectedDataResourceId}
          selectedRow={selectedRow}
        />
      )}
      {(isDeleteModelOpen || isDeleteResourceDialectDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          isDeleteModelOpen={isDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isDeleteResourceDialectDeleteLoading}
        />
      )}
      {isDataResourceDialectAddModalOpen && (
        <DataResourceDialectAddModal
          selectedDataResourceId={selectedDataResourceId}
          setIsDataResourceDialectAddModalOpen={
            setIsDataResourceDialectAddModalOpen
          }
          isDataResourceDialectAddModalOpen={isDataResourceDialectAddModalOpen}
          dataFormatType={dataFormatType}
        />
      )}
    </>
  );
}

export default DataResourceDialects;
