import React from "react";
import { MultiSelect, Dropdown } from "@carbon/react";
import DataLineageModal from "./DataLineageModal";
import DataLineageTreeChart from "./DataLineageTreeChart";
import Loading from "components/Loading";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { useDataLineage } from "hooks/dataHealth/useDataLineage";
import { useDataResource } from "hooks/dataresources/useDataResource";
import { useMostRecentActivity } from "hooks/useMostRecentActivity";
import { useDataLineageByResourceId } from "hooks/dataHealth/useDataLineageByResourceId";
import { createParams } from "utils/createParam";
import { getEgdesandNodes } from "utils/getEdgesAndNodes";

function DataLineage() {
  const [isLineageModalOpen, setIsLineageModalOpen] = React.useState(false);
  const [selectedDataPackage, setSelectedDataPackage] = React.useState(null);
  const [selectedDataResource, setSelectedResource] = React.useState(null);
  const [selectedLineage, setSelectedLineage] = React.useState(null);
  const { data: dataPackage } = useDataPackage();
  const { data: dataResource } = useDataResource();
  const { data: mostRecentActivity, isLoading: isMostRecentActivityLoading } =
    useMostRecentActivity();
  const { data: dataLineage, isLoading: isDataLineageLoading } = useDataLineage(
    selectedDataPackage || mostRecentActivity?.dataPackageId
  );
  const { data: dataLineageByResourceId, isLoading: isDataLineageByIdLoading } =
    useDataLineageByResourceId(
      selectedDataPackage,
      createParams(selectedDataResource)
    );
  const filteredDataResources = dataResource?.filter(
    (data) => data.dataPackage?.id === selectedDataPackage
  );
  const { filteredNodesData, filteredEdgesData } = getEgdesandNodes(
    dataLineage,
    dataLineageByResourceId
  );
  const handleOpenModal = (id) => {
    setSelectedLineage(
      ...dataLineage?.nodeData?.filter((data) => data.id === id)
    );
    setIsLineageModalOpen(true);
  };
  const currentDataPackage = dataPackage?.find((data) =>
    selectedDataPackage
      ? data?.id === selectedDataPackage
      : data?.id === mostRecentActivity?.dataPackageId
  );
  return (
    <div>
      <h3 style={{ paddingBottom: "25px" }}>Data Lineage</h3>
      <div className="flex_between">
        <div style={{ width: "49%" }}>
          <Dropdown
            ariaLabel="Dropdown"
            id="carbon-dropdown-package"
            items={dataPackage || []}
            onChange={({ selectedItem }) => {
              setSelectedDataPackage(selectedItem?.id);
              setSelectedResource(null);
            }}
            itemToString={(value) => value?.name}
            label="Choose an option"
            titleText="Data Package"
          />
        </div>
        <div style={{ width: "49%" }}>
          <MultiSelect
            ariaLabel="Dropdown"
            id="carbon-dropdown-resource"
            items={filteredDataResources || []}
            selectedItem={
              selectedDataResource ? { name: selectedDataResource } : ""
            }
            disabled={selectedDataPackage ? false : true}
            onChange={({ selectedItems }) => {
              setSelectedResource(selectedItems);
            }}
            itemToString={(value) => value?.name}
            label={
              filteredDataResources?.length
                ? "Choose an option"
                : "No Resources Found"
            }
            titleText="Data Resource"
          />
        </div>
      </div>
      {isMostRecentActivityLoading ||
      isDataLineageLoading ||
      isDataLineageByIdLoading ? (
        <Loading />
      ) : (
        <div className="lineage_tasks_container">
          <div className="inner_container">
            <DataLineageTreeChart
              hideDataPackageNode={selectedDataResource?.length >= 1}
              currentDataPackage={currentDataPackage}
              nodeData={
                selectedDataResource?.length >= 1
                  ? filteredNodesData
                  : dataLineage?.nodeData
              }
              handleOpenLineageModal={handleOpenModal}
              edgeData={
                selectedDataResource?.length >= 1
                  ? filteredEdgesData
                  : dataLineage?.edgeData
              }
            />
          </div>
        </div>
      )}
      {isLineageModalOpen && (
        <DataLineageModal
          lineageData={selectedLineage}
          isLineageModalOpen={isLineageModalOpen}
          setIsLineageModalOpen={setIsLineageModalOpen}
        />
      )}
    </div>
  );
}

export default DataLineage;
