import React from "react";
import DeleteModel from "components/DeleteModel/DeleteModel";
import DataBucketAddModal from "./DataBucketAddModal";
import DataBucketEditModal from "./DataBucketEditModal";
import TopLevelComps from "../TopLevelComps";
import { useDataBucket } from "hooks/databucket/useDataBucket";
import { useDeleteBucket } from "hooks/databucket/useDeleteBucket";
import DataBucketGridView from "./DataBucketGridView";

function DataBucketTable() {
  const { data: dataBucket, isLoading: isDataBucketLoading } = useDataBucket();
  const [isDataBucketAddModalOpen, setIsDataBucketAddModalOpen] =
    React.useState(false);
  const [isDataBucketEditModalOpen, setIsDataBucketEditModalOpen] =
    React.useState(false);
  const [dataBucketName, setDataBucketName] = React.useState();
  const [arn, setARN] = React.useState();
  const [selectedRow, setSelectedRow] = React.useState();
  const [filterData, setFilterData] = React.useState(null);
  const { mutateAsync: deleteBucket, isLoading: isBucketDeleting } =
    useDeleteBucket();
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const deleteCaller = (id) => {
    deleteBucket({ bucketId: id });
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  const handleNameChange = (event) => {
    setDataBucketName(event.target.value);
  };

  const handleARNChange = (event) => {
    setARN(event.target.value);
  };

  const onSubmit = (formData) => {
    if (formData.isYes && formData.isNo) {
      setFilterData(dataBucket);
      return;
    }

    if (formData.isYes && !formData.isNo) {
      const active = dataBucket.filter((bucket) => {
        return bucket.active === true;
      });
      setFilterData(active);
      return;
    }

    if (!formData.isYes && formData.isNo) {
      const inActive = dataBucket.filter((bucket) => {
        return bucket.active === false;
      });
      setFilterData(inActive);
      return;
    }

    setFilterData([]);
  };

  return (
    <>
      <TopLevelComps
        buttonName="New Data Bucket"
        name="Data Bucket"
        openAddModal={setIsDataBucketAddModalOpen}
        onSubmit={onSubmit}
        filterLable="Bucket Active"
        searchFilter={dataBucket}
        setFilterData={setFilterData}
      />
      <DataBucketGridView
        setIsEditModalOpen={setIsDataBucketEditModalOpen}
        setSelectedRow={setSelectedRow}
        deleteActionHanlder={deleteActionHanlder}
        databucket={filterData || dataBucket}
        isDataBucketLoading={isDataBucketLoading}
      />

      {isDataBucketAddModalOpen && (
        <DataBucketAddModal
          isDataBucketAddModalOpen={isDataBucketAddModalOpen}
          setIsDataBucketAddModalOpen={setIsDataBucketAddModalOpen}
          dataBucketName={dataBucketName}
          arn={arn}
          handleNameChange={handleNameChange}
          handleARNChange={handleARNChange}
        />
      )}
      {isDataBucketEditModalOpen && (
        <DataBucketEditModal
          isDataBucketEditModalOpen={isDataBucketEditModalOpen}
          setIsDataBucketEditModalOpen={setIsDataBucketEditModalOpen}
          dataBucketName={dataBucketName}
          arn={arn}
          handleNameChange={handleNameChange}
          handleARNChange={handleARNChange}
          selectedRow={selectedRow}
        />
      )}
      {(isDeleteModelOpen || isBucketDeleting) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isBucketDeleting}
        />
      )}
    </>
  );
}

export default DataBucketTable;
