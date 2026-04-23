import React from "react";
import ApplicationAddModal from "./ApplicationAddModal";
import ApplicationEditModal from "./ApplicationEditModal";
import CustomDataTable from "../Datatable";
import TopLevelComps from "../TopLevelComps";
import { CONNECTION_TYPES } from "constants";
import { useApplication } from "hooks/application/useApplication";
import ApplicationProperties from "./ApplicationPropertyModal";
import ApplicationGridView from "./ApplicationGridView";

const headerData = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "path",
    header: "Path",
  },
  {
    key: "className",
    header: "Class Name",
  },
];

function Application() {
  const { data: applicationData, isLoading: isApplicationLoading } =
    useApplication();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState();
  const [isGridView, setIsGridView] = React.useState(true);

  const application = React.useMemo(() => {
    return applicationData?.map((data) => ({
      ...data,
      name: data?.name,
      path: data?.path,
      className: data?.className,
    }));
  }, [applicationData]);

  const dataConnections = [
    {
      id: 1,
      name: "Application Name 01",
      path: "",
      className: "lorem ipsumjksdfbsduc",
    },
    {
      id: 2,
      name: "Application Name 02",
      path: "",
      className: "lorem ipsumjksdfbsdu",
    },
    {
      id: 3,
      name: "Application Name 03",
      path: "",
      className: "lorem ipsumjksdfbsduf",
    },
  ];
  const [filterData, setFilterData] = React.useState(null);

  const items = CONNECTION_TYPES;

  const onSubmit = (formData) => {
    if (formData.isYes && formData.isNo) {
      setFilterData(dataConnections);
      return;
    }

    if (formData.isYes && !formData.isNo) {
      const activeConnections = dataConnections.filter((connection) => {
        return connection.active === true;
      });
      setFilterData(activeConnections);
      return;
    }

    if (!formData.isYes && formData.isNo) {
      const inActiveConnections = dataConnections.filter((connection) => {
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
        buttonName="New Application"
        name="Applications"
        openAddModal={setIsAddModalOpen}
        onSubmit={onSubmit}
        filterLable="Connection Active"
        searchFilter={application}
        setFilterData={setFilterData}
        setIsViewChange={setIsGridView}
        isTableView={true}
        shouldContentSwitecherRender={true}
      />
      {isGridView ? (
        <ApplicationGridView
          setIsEditModalOpen={setIsEditModalOpen}
          applications={filterData || application}
          onCardClick={handleCardClick}
          setSelectedRow={setSelectedData}
          isApplicationLoading={isApplicationLoading}
        />
      ) : (
        <CustomDataTable
          headers={headerData}
          rows={filterData || application}
          openAddModal={setIsAddModalOpen}
          openEditModal={setIsEditModalOpen}
          isSelectionEnable={false}
          tableHeading="Applications"
          shouldDeleteButtonRender={false}
          getSelectedRow={setSelectedData}
          isClickAbleCell={true}
          handleCellClick={handleCardClick}
          isTableLoading={isApplicationLoading}
        />
      )}
      {isAddModalOpen && (
        <ApplicationAddModal
          items={items}
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
        />
      )}
      {isEditModalOpen && (
        <ApplicationEditModal
          items={items}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedData={selectedData}
          isGridView={isGridView}
        />
      )}
      {isPropertyModalOpen && (
        <ApplicationProperties
          isGridView={isGridView}
          isPropertiesModalOpen={isPropertyModalOpen}
          selectedData={selectedData}
          setisPropertiesModalOpen={setIsPropertyModalOpen}
        />
      )}
    </>
  );
}

export default Application;
