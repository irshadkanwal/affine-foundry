import React from "react";
import CustomDataTable from "../../Datatable";
import DeleteModel from "../../DeleteModel/DeleteModel";
import { formatDateTime } from "../../../utils/formatDateTime";
import { transformedDate } from "../../../utils/transformedDate";
import { useDataPackageResourceById } from "../../../hooks/datapackage/useDataPackageResourceById";
import DataPackageResourceEditModal from "./DataPackageListResourceEditMode";
import { useDeleteDataPackageResource } from "../../../hooks/datapackage/useDeleteDataPackageResource";
import { useDataClass } from "../../../hooks/dataclass/useDataClass";
import { useTransactionType } from "../../../hooks/dataTransaction/useTransactionType";
const headerData = [
  {
    key: "dataClassName",
    header: "Data Class",
  },
  {
    key: "transactionTypeName",
    header: "Transaction Type",
  },
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
    key: "",
    header: "Archive Date",
  },
  {
    key: "lastActivityAt",
    header: "Last Active",
  },
];
function DataPackageListResources({ selectedDataPackageId }) {
  const { data: dataResource, isLoading: isDataPackageResourceLoading } =
    useDataPackageResourceById(selectedDataPackageId);
  const { data: dataClass } = useDataClass();
  const { data: transactionType } = useTransactionType();
  const resources = React.useMemo(() => {
    return dataResource?.map((resource) => {
      return {
        ...resource,
        archivedAt: !resource.archivedAt
          ? ""
          : transformedDate(resource.archivedAt?.split(" ")[0]),
        dataClassId: resource.dataClass.id,
        dataClassName: resource.dataClass.name,
        transactionTypeName: resource.transactionType.name,
        transactionTypeId: resource.transactionType.id,
        lastActivityAt: resource.dataPackage?.lastActivityAt
          ? formatDateTime(resource.dataPackage.lastActivityAt)
          : "",
        dataFormatted: resource.dataFormat.name,
      };
    });
  }, [dataResource]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState();

  const { mutateAsync: deleteResource, isLoading: isResourceDeleteLoading } =
    useDeleteDataPackageResource(selectedDataPackageId);

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const deleteCaller = (id) => {
    deleteResource({ resourceId: id });
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
        deleteAction={deleteActionHanlder}
        deleteBatchAction={deleteBatchActionHanlder}
        rows={resources}
        isTableLoading={isDataPackageResourceLoading}
        openEditModal={setIsEditModalOpen}
        tableHeading="Data Resources"
        getSelectedRow={setSelectedData}
      />

      {isEditModalOpen && (
        <DataPackageResourceEditModal
          dataClass={dataClass}
          transactionType={transactionType}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedRow={selectedData}
        />
      )}

      {(isDeleteModelOpen || isResourceDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isResourceDeleteLoading}
        />
      )}
    </>
  );
}

export default DataPackageListResources;
