import React from "react";
import ReferenceDataGridView from "./ReferenceDataGridView";
import ReferenceDataListView from "./ReferenceDataListView";
import ReferenceEditModal from "./ReferenceDataEdit";
import TopLevelComps from "../TopLevelComps";
import ReferenceAddModal from "./ReferenceDataAdd";
import DeleteModel from "../DeleteModel/DeleteModel";
import { useReferenceData } from "../../hooks/referencedata/useReferenceData";
import { useDeleteReferenceData } from "../../hooks/referencedata/useDeleteReferenceData";

function DataReference() {
  const { data: referenceData, isLoading: isGetReferenceDataLoading } =
    useReferenceData();

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isReferenceEditModalOpen, setIsReferenceEditModalOpen] =
    React.useState(false);
  const [isGridView, setIsGridView] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState();
  const [filterData, setFilterData] = React.useState(null);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const {
    mutateAsync: deleteDataReference,
    isLoading: isDeleteReferenceDataLoading,
  } = useDeleteReferenceData();
  const deleteCaller = (id) => {
    deleteDataReference({ referenceId: id });
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  return (
    <>
      <TopLevelComps
        buttonName="New Reference Data"
        name="Reference Data"
        openAddModal={setIsAddModalOpen}
        shouldContentSwitecherRender={true}
        setIsViewChange={setIsGridView}
        isGridView={true}
        onSubmit={() => {}}
        searchFilter={referenceData}
        setFilterData={setFilterData}
      />

      <>
        {isGridView ? (
          <ReferenceDataGridView
            setSelectedRow={setSelectedRow}
            deleteActionHanlder={deleteActionHanlder}
            reference={filterData || referenceData}
            setIsReferenceEditModalOpen={setIsReferenceEditModalOpen}
            isGetReferenceDataLoading={isGetReferenceDataLoading}
          />
        ) : (
          <ReferenceDataListView
            setSelectedRow={setSelectedRow}
            reference={filterData || referenceData}
            deleteActionHanlder={deleteActionHanlder}
            setIsReferenceEditModalOpen={setIsReferenceEditModalOpen}
          />
        )}
      </>
      {isReferenceEditModalOpen && (
        <ReferenceEditModal
          isOpen={isReferenceEditModalOpen}
          setIsOpen={setIsReferenceEditModalOpen}
          selectedRow={selectedRow}
        />
      )}
      {isAddModalOpen && (
        <ReferenceAddModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
        />
      )}
      {(isDeleteModelOpen || isDeleteReferenceDataLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={[]}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          isDeleteModelOpen={isDeleteModelOpen}
          setitemsToDeleteIDs={() => {}}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isDeleteReferenceDataLoading}
        />
      )}
    </>
  );
}

export default DataReference;
