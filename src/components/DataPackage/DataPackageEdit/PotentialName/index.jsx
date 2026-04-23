import React from "react";
import { useDeleteDataPackagePotentialName } from "hooks/datapackage/useDeleteDataPackagePotentialName";
import PotentialNameAddModal from "./PotentialNameAddModal";
import PotentialNameEditModal from "./PotentialNameEditModal";
import CustomDataTable from "components/Datatable";
import DeleteModel from "components/DeleteModel/DeleteModel";

const headerData = [
  {
    key: "regex",
    header: "Regex Expression",
  },
  {
    key: "potentialName",
    header: "Potential Name",
  },
];

function PotentialName({ selectedDataPackageId, tableNameSuggestions }) {
  const [isOpenPotentialNameAddModal, setIsOpenPotentialNameAddModal] =
    React.useState();
  const [isOpenPotentialNameEditModal, setIsOpenPotentialNameEditModal] =
    React.useState();
  const [selectedRow, setSelectedRow] = React.useState();
  const rowData = React.useMemo(
    () =>
      tableNameSuggestions?.filter(
        (name) => name?.dataPackageId === selectedDataPackageId
      ),
    [tableNameSuggestions, selectedDataPackageId]
  );
  const {
    mutateAsync: deletePotentialName,
    isLoading: isPotentialNameDeleting,
  } = useDeleteDataPackagePotentialName();

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

  const deleteCaller = (id) => {
    deletePotentialName({ potentialNameId: id });
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
        tableHeading="Potential Names"
        headers={headerData}
        rows={rowData}
        shouldTableBatchActionsRender={true}
        isActiveTag={false}
        buttonText="Add New Potential Name +"
        openAddModal={setIsOpenPotentialNameAddModal}
        openEditModal={setIsOpenPotentialNameEditModal}
        getSelectedRow={setSelectedRow}
        deleteBatchAction={deleteBatchActionHanlder}
        deleteAction={deleteActionHanlder}
      />
      {isOpenPotentialNameAddModal && (
        <PotentialNameAddModal
          isAddModalOpen={isOpenPotentialNameAddModal}
          setIsAddModalOpen={setIsOpenPotentialNameAddModal}
          selectedDataPackageId={selectedDataPackageId}
        />
      )}
      {isOpenPotentialNameEditModal && (
        <PotentialNameEditModal
          isOpen={isOpenPotentialNameEditModal}
          setIsOpen={setIsOpenPotentialNameEditModal}
          selectedDataPackageId={selectedDataPackageId}
          selectedRowData={tableNameSuggestions?.find(
            (data) => data?.id === selectedRow?.id
          )}
        />
      )}
      {(isDeleteModelOpen || isPotentialNameDeleting) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          isDeleteModelOpen={isDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isPotentialNameDeleting}
        />
      )}
    </>
  );
}

export default PotentialName;
