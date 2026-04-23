import React from "react";
import TopLevelComps from "components/TopLevelComps/TopLevelContainer";
import DataClassesAddModal from "./DataClassesAddModal";
import DataClassesGridView from "./DataClassesGridView/DataClassesGridView";
import DataClassesListView from "./DataClassesListView/DataClassesListView";
import DataClassesDetails from "./DataClassesDetails/DataClassesDetails";
import { useDataClass } from "hooks/dataclass/useDataClass";
import Loading from "components/Loading";
const classesSortBy = [
  {
    value: "name",
    label: "Name",
  },
];
const showClasses = [{ value: "all", label: "All" }];
function DataClasses() {
  const [isGridView, setIsGridView] = React.useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [dataClassDetails, setDataClassDetails] = React.useState(false);
  const [filteredData, setFilterData] = React.useState();
  const { data: dataClass, isLoading: isDataClassLoading } = useDataClass();

  const handleSubmit = () => {};
  return (
    <>
      {dataClassDetails ? (
        <DataClassesDetails
          setDataClassDetails={setDataClassDetails}
          dataClassDetails={dataClassDetails}
        />
      ) : (
        <>
          <TopLevelComps
            buttonName="New Data Class"
            name="Data Classes"
            openAddModal={setIsAddModalOpen}
            shouldContentSwitecherRender={true}
            setIsViewChange={setIsGridView}
            filterLable="Has Title"
            searchFilter={dataClass}
            setFilterData={setFilterData}
            isCheckBoxFilter={false}
            isTableView={false}
            showDateInput={false}
            classesSortBy={classesSortBy}
            showClasses={showClasses}
            onSubmit={handleSubmit}
          />
          {isDataClassLoading ? (
            <Loading />
          ) : isGridView ? (
            <DataClassesGridView
              dataClass={filteredData || dataClass}
              setDataClassDetails={setDataClassDetails}
            />
          ) : (
            <DataClassesListView
              dataClass={filteredData || dataClass}
              setDataClassDetails={setDataClassDetails}
            />
          )}
        </>
      )}
      {isAddModalOpen && (
        <DataClassesAddModal
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      )}
    </>
  );
}

export default DataClasses;
