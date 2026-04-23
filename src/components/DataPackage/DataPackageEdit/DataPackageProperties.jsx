import React from "react";
import CustomDataTable from "../../Datatable";
import { useDataPackageProp } from "../../../hooks/datapackage/useDataPackageProperties";
import DataPackagePropertiesAddModal from "./DataPackagePropertiesAddModal";
import DataPackagePropertiesEditModal from "./DataPackagePropertiesEditModal";
import { useDeleteDataPackageProperty } from "../../../hooks/datapackage/useDeleteDataPackageProperties";
import DeleteModel from "../../DeleteModel/DeleteModel";

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

function DataPackageProperties({ selectedDataPackageId }) {
  const { data: DataPackageProperties, isLoading: isDataPackagePropsLoading } =
    useDataPackageProp();
  const dataPackageProp = DataPackageProperties?.filter(
    (data) => data?.dataPackageId === selectedDataPackageId
  );
  const [isOpenPropetiesAddModal, setIsOpenPopertiesAddModal] =
    React.useState();
  const [isOpenPropetiesEditModal, setIsOpenPopertiesEditModal] =
    React.useState();
  const [selectedRow, setSelectedRow] = React.useState();
  const {
    mutateAsync: deleteProperties,
    isLoading: isPackagePropertiesDeleteLoading,
  } = useDeleteDataPackageProperty();

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

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
        tableHeading="Properties"
        headers={headerData}
        rows={dataPackageProp}
        shouldTableBatchActionsRender={true}
        isActiveTag={false}
        openAddModal={setIsOpenPopertiesAddModal}
        openEditModal={setIsOpenPopertiesEditModal}
        getSelectedRow={setSelectedRow}
        isTableLoading={isDataPackagePropsLoading}
        deleteBatchAction={deleteBatchActionHanlder}
        deleteAction={deleteActionHanlder}
      />
      {isOpenPropetiesAddModal && (
        <DataPackagePropertiesAddModal
          isOpen={isOpenPropetiesAddModal}
          setIsOpen={setIsOpenPopertiesAddModal}
          selectedDataPackageId={selectedDataPackageId}
        />
      )}
      {isOpenPropetiesEditModal && (
        <DataPackagePropertiesEditModal
          isOpen={isOpenPropetiesEditModal}
          setIsOpen={setIsOpenPopertiesEditModal}
          selectedDataPackageId={selectedDataPackageId}
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
    </>
  );
}

export default DataPackageProperties;
