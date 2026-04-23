import React from "react";
import CustomDataTable from "../Datatable";
import DataPackageGridView from "./DataPackageGridView";
import { useDataPackage } from "../../hooks/datapackage/useDataPackage";
import DataPackageEditModal from "./DataPackageEdit";
import TopLevelComps from "../TopLevelComps";
import DataPackageAddModal from "./DataPackageAdd";
import DataConnectorAddModal from "../DataConnector/DataConnectorAddModal";
import { CONNECTION_TYPES } from "../../constants";
import { transformedDate } from "../../utils/transformedDate";
import { useDeleteDataPackage } from "../../hooks/datapackage/useDeleteDataPackage";
import DeleteModel from "../DeleteModel/DeleteModel";
import { useDataPackagePotentialTableName } from "hooks/datapackage/useDataPackagePotentialTableName";

const headerData = [
  {
    key: "dataBucketName",
    header: "Data Bucket",
  },
  {
    key: "ownerName",
    header: "Owner",
  },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "archivedAt",
    header: "Archive Date",
  },
  {
    key: "autoProfileData",
    header: "Auto Profile",
  },
  {
    key: "basePath",
    header: "Base Path",
  },
];

function DataPackage() {
  const { data: dataPackage, isLoading: isDataPackageLoading } =
    useDataPackage();
  const { data: tableNameSuggestions } = useDataPackagePotentialTableName();

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [
    isDataPackageConnectorsAddModalOpen,
    setIsDataPackageConnectorsAddModalOpen,
  ] = React.useState(false);
  const [isDataPackageEditModalOpen, setIsDataPackageEditModalOpen] =
    React.useState(false);

  const [isGridView, setIsGridView] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState();
  const [filterData, setFilterData] = React.useState(null);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

  const {
    mutateAsync: deleteDataPackage,
    isLoading: isDeleteDataPackageLoading,
  } = useDeleteDataPackage();

  const deleteCaller = (id) => {
    deleteDataPackage({ dataPackageId: id });
  };

  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const dataPackageRows = React.useMemo(() => {
    return dataPackage?.map((data) => ({
      ...data,
      dataBucketName: data.dataBucket.name,
      ownerName: data.owner.name,
      name: data.name,
      archivedAt: !data.archivedAt
        ? ""
        : transformedDate(data.archivedAt?.split(" ")[0]),
      autoProfileData: data.autoProfileData === true ? "Yes" : "No",
      basePath: data.basePath,
      lastActivityAt: data.lastActivityAt,
      dataClassification: data.dataClassification.type,
    }));
  }, [dataPackage]);

  const onSubmit = (formData) => {
    if (formData.isYes && formData.isNo) {
      setFilterData(dataPackageRows);
      return;
    }

    if (formData.isYes && !formData.isNo) {
      const active = dataPackageRows.filter((value) => {
        return value.autoProfileData === "Yes";
      });
      setFilterData(active);
      return;
    }

    if (!formData.isYes && formData.isNo) {
      const inActive = dataPackageRows.filter((value) => {
        return value.autoProfileData === "No";
      });
      setFilterData(inActive);
      return;
    }

    setFilterData([]);
  };

  return (
    <>
      <TopLevelComps
        buttonName="New Data Package"
        name="Data Package"
        openAddModal={setIsAddModalOpen}
        shouldContentSwitecherRender={true}
        setIsViewChange={setIsGridView}
        onSubmit={onSubmit}
        filterLable="Auto Profile"
        searchFilter={dataPackageRows}
        setFilterData={setFilterData}
        isTableView={true}
      />
      <>
        {isGridView ? (
          <DataPackageGridView
            deleteActionHanlder={deleteActionHanlder}
            dataPackage={filterData || dataPackage}
            setIsDataPackageEditModalOpen={setIsDataPackageEditModalOpen}
            setSelectedRow={setSelectedRow}
            isDataPackageLoading={isDataPackageLoading}
          />
        ) : (
          <CustomDataTable
            rows={filterData || dataPackageRows}
            headers={headerData}
            deleteBatchAction={deleteBatchActionHanlder}
            deleteAction={deleteActionHanlder}
            openEditModal={setIsDataPackageEditModalOpen}
            getSelectedRow={setSelectedRow}
            tableHeading="Data Package"
            isActiveTag={false}
            isTableLoading={isDataPackageLoading}
          />
        )}
      </>
      {isDataPackageEditModalOpen && (
        <DataPackageEditModal
          isOpen={isDataPackageEditModalOpen}
          setIsOpen={setIsDataPackageEditModalOpen}
          selectedRow={
            (dataPackage?.filter((data) => data?.id === selectedRow?.id))[0]
          }
          tableNameSuggestions={tableNameSuggestions}
          setIsDataPackageConnectorsAddModalOpen={
            setIsDataPackageConnectorsAddModalOpen
          }
          isDataPackageConnectorsAddModalOpen={
            isDataPackageConnectorsAddModalOpen
          }
        />
      )}
      {isAddModalOpen && (
        <DataPackageAddModal
          isOpen={isAddModalOpen}
          tableNameSuggestions={tableNameSuggestions}
          setIsOpen={setIsAddModalOpen}
          setIsDataPackageConnectorsAddModalOpen={
            setIsDataPackageConnectorsAddModalOpen
          }
        />
      )}
      {isDataPackageConnectorsAddModalOpen && (
        <DataConnectorAddModal
          setIsOpen={setIsDataPackageConnectorsAddModalOpen}
          isOpen={isDataPackageConnectorsAddModalOpen}
          items={CONNECTION_TYPES}
        />
      )}
      {(isDeleteModelOpen || isDeleteDataPackageLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isDeleteDataPackageLoading}
        />
      )}
    </>
  );
}

export default DataPackage;
