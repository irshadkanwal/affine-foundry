import React from "react";
import RuntimeAddModal from "./RuntimeAddModal";
import RuntimeEditModal from "./RuntimeEditModal";
import CustomDataTable from "../Datatable";
import TopLevelComps from "../TopLevelComps";
import { CONNECTION_TYPES } from "../../constants";
import { useRuntime } from "hooks/runtime/useRuntime";
import RuntimePropertyModal from "./RuntimePropertyModal";
import RuntimeGridView from "./RuntimeGridView";
import { formatDateTime } from "utils/formatDateTime";

const headerData = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "awsClusterId",
    header: "Cluster ID",
  },
  {
    key: "startTime",
    header: "Start Time",
  },
  {
    key: "terminatedTime",
    header: "Terminated Time",
  },
  {
    key: "hostUrl",
    header: "Host URL",
  },
  {
    key: "state",
    header: "Runtime State",
  },
  {
    key: "clusterSize",
    header: "Cluster Size",
  },
  {
    key: "managedByPlatform",
    header: "Managed by Platform",
  },
  {
    key: "isJupyterEnabled",
    header: "Jupyter Enabled",
  },
];

function Runtime() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isListView, setIsListView] = React.useState(true);

  const [isPropertyModalOpen, setIsPropertyModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState();
  const { data: runtimeData, isLoading: isRuntimeLoading } = useRuntime();

  const runtime = React.useMemo(() => {
    return runtimeData?.map((data) => ({
      ...data,
      startTime: formatDateTime(data?.startTime),
      terminatedTime: formatDateTime(data?.terminatedTime),
      managedByPlatform: data?.managedByPlatform ? "Yes" : "No",
      isJupyterEnabled: data?.isJupyterEnabled ? "Yes" : "No",
    }));
  }, [runtimeData]);

  const [filterData, setFilterData] = React.useState(null);

  const items = CONNECTION_TYPES;

  const onSubmit = (formData) => {
    if (formData.isYes && formData.isNo) {
      setFilterData(runtime);
      return;
    }

    if (formData.isYes && !formData.isNo) {
      const activeConnections = runtime.filter((connection) => {
        return connection.active === true;
      });
      setFilterData(activeConnections);
      return;
    }

    if (!formData.isYes && formData.isNo) {
      const inActiveConnections = runtime.filter((connection) => {
        return connection.active === false;
      });
      setFilterData(inActiveConnections);
      return;
    }

    setFilterData([]);
  };
  const handleCardClick = (selectedRow) => {
    setSelectedData(selectedRow);
    setIsPropertyModalOpen(true);
  };
  return (
    <>
      <TopLevelComps
        buttonName="New Runtimes"
        name="Runtimes"
        openAddModal={setIsAddModalOpen}
        onSubmit={onSubmit}
        filterLable="Connection Active"
        searchFilter={runtime}
        setFilterData={setFilterData}
        shouldContentSwitecherRender={true}
        isListView={true}
        setIsViewChange={setIsListView}
        isTableView={true}
      />
      {!isListView ? (
        <CustomDataTable
          headers={headerData}
          rows={filterData || runtime}
          handleCellClick={handleCardClick}
          isClickAbleCell={true}
          shouldDeleteButtonRender={false}
          isSelectionEnable={false}
          openAddModal={setIsAddModalOpen}
          isTableLoading={isRuntimeLoading}
          openEditModal={setIsEditModalOpen}
          tableHeading="Runtimes"
          getSelectedRow={setSelectedData}
        />
      ) : (
        <RuntimeGridView
          runtime={filterData || runtime}
          onCardClick={handleCardClick}
          isGetRuntimeDataLoading={isRuntimeLoading}
          setIsRuntimeEditModalOpen={setIsEditModalOpen}
          setSelectedRow={setSelectedData}
        />
      )}
      {isAddModalOpen && (
        <RuntimeAddModal
          items={items}
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
        />
      )}
      {isEditModalOpen && (
        <RuntimeEditModal
          items={items}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedData={runtime?.find((data) => data?.id === selectedData?.id)}
          isListView={isListView}
        />
      )}
      {isPropertyModalOpen && (
        <RuntimePropertyModal
          isListView={isListView}
          isPropertiesModalOpen={isPropertyModalOpen}
          selectedData={selectedData}
          setisPropertiesModalOpen={setIsPropertyModalOpen}
        />
      )}
    </>
  );
}

export default Runtime;
