import React from "react";
import CustomDataTable from "../Datatable";
import DataResourceGridView from "./DataResourceGridView";
import DataResourceEditModal from "./DataResourceEdit";
import DataResourceAddModal from "./DataResourceAdd";
import { useDataResource } from "../../hooks/dataresources/useDataResource";
import TopLevelComps from "../TopLevelComps";
import { formatDateTime } from "../../utils/formatDateTime";
import { useDeleteDataResource } from "../../hooks/dataresources/useDeleteDataResource";
import { transformedDate } from "../../utils/transformedDate";
import DeleteModel from "../DeleteModel/DeleteModel";
import { useDataClassbyLevel } from "../../hooks/dataclass/useDataClassbyLevel";
import { useTransactionType } from "../../hooks/dataTransaction/useTransactionType";
import { useDataPackage } from "../../hooks/datapackage/useDataPackage";

const headerData = [
  {
    key: "dataClassName",
    header: "Data Class",
  },
  {
    key: "transactionTypeName",
    header: "Transaction Type",
  },
  { key: "dataPackageName", header: " Data Package Name" },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "dataFormatted",
    header: "Data Format",
  },
  {
    key: "title",
    header: "Title",
  },
  {
    key: "archivedAt",
    header: "Archive Date",
  },
  {
    key: "lastActivityAt",
    header: "Last Active",
  },
];

function DataResource() {
  const { data: dataResource, isLoading: isResourceLoading } =
    useDataResource();
  const { data: dataPackage } = useDataPackage();

  const resources = React.useMemo(() => {
    return dataResource?.map((resource) => {
      return {
        ...resource,
        archivedAt: !resource.archivedAt
          ? ""
          : transformedDate(resource.archivedAt?.split(" ")[0]),
        dataClassId: resource.dataClass.id,
        transactionTypeId: resource.transactionType.id,
        dataClassName: resource.dataClass.name,
        transactionTypeName: resource.transactionType.name,
        lastActivityAt: resource.lastActivityAt
          ? formatDateTime(resource.lastActivityAt)
          : "",
        dataFormatted: resource?.dataFormat.name,
        dataPackageName: resource.dataPackage.name,
      };
    });
  }, [dataResource]);

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDataResourceEditModalOpen, setIsDataResourceEditModalOpen] =
    React.useState(false);

  const [filterData, setFilterData] = React.useState(null);

  const [isGridView, setIsGridView] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState();
  const {
    mutateAsync: deleteDataResource,
    isLoading: isDeleteResourceLoading,
  } = useDeleteDataResource();
  const { data: dataClass } = useDataClassbyLevel(1);
  const { data: transactionType } = useTransactionType();
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

  const deleteCaller = (id) => {
    deleteDataResource({ dataResourceId: id });
  };
  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const onSubmit = (formData) => {
    if (!formData.dataPackage.value) {
      setFilterData(resources);
      return;
    }
    const filtered = resources?.filter(
      (resource) => resource.dataPackage.id === formData.dataPackage?.value
    );
    setFilterData(filtered);
  };

  return (
    <>
      <TopLevelComps
        buttonName="New Data Resource"
        name="Data Resource"
        openAddModal={setIsAddModalOpen}
        shouldContentSwitecherRender={true}
        setIsViewChange={setIsGridView}
        onSubmit={onSubmit}
        filterLable="Has Title"
        searchFilter={resources}
        setFilterData={setFilterData}
        isCheckBoxFilter={false}
        dataPackage={dataPackage}
        isTableView={true}
      />
      <>
        {isGridView ? (
          <DataResourceGridView
            deleteActionHanlder={deleteActionHanlder}
            resources={filterData || resources}
            setSelectedRow={setSelectedRow}
            setIsDataResourceEditModalOpen={setIsDataResourceEditModalOpen}
            isResourceLoading={isResourceLoading}
          />
        ) : (
          <CustomDataTable
            rows={filterData || resources}
            deleteBatchAction={deleteBatchActionHanlder}
            headers={headerData}
            deleteAction={deleteActionHanlder}
            openEditModal={setIsDataResourceEditModalOpen}
            getSelectedRow={setSelectedRow}
            tableHeading="Data Resource"
            isTableLoading={isResourceLoading}
          />
        )}
      </>
      {isDataResourceEditModalOpen && (
        <DataResourceEditModal
          isOpen={isDataResourceEditModalOpen}
          setIsOpen={setIsDataResourceEditModalOpen}
          selectedRow={selectedRow}
          dataClass={dataClass}
          transactionType={transactionType}
        />
      )}
      {isAddModalOpen && (
        <DataResourceAddModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
        />
      )}

      {(isDeleteModelOpen || isDeleteResourceLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isDeleteResourceLoading}
        />
      )}
    </>
  );
}

export default DataResource;
