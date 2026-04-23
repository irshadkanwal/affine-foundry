import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "carbon-components-react";
import DataQualityDashboardOverview from "./DataQualityDashboardOverview";
import { DataQualityDashboardResults } from "./DataQualityDashboardResults";
import { useDataResource } from "hooks/dataresources/useDataResource";
import { useMostRecentActivity } from "hooks/useMostRecentActivity";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { useDataQualityByResourceId } from "hooks/dataHealth/useDataQualityByResourceId";

function DataQualityDashboard() {
  const [selectedResource, setSelectedResource] = React.useState(null);
  const [selectedDataPackage, setSelectedDataPackage] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const { data: dataRecources = [] } = useDataResource();
  const { data: mostRecentActivity } = useMostRecentActivity();
  const filteredDataResources = dataRecources?.filter(
    (data) =>
      data.dataPackage?.id ===
      (selectedDataPackage
        ? selectedDataPackage
        : mostRecentActivity?.dataPackageId)
  );

  const { data: dataPackage } = useDataPackage();
  const { data: dataQualityData, isLoading: isDataQualityLoading } =
    useDataQualityByResourceId(
      selectedResource ? selectedResource : filteredDataResources[0]?.id
    );
  return (
    <div>
      <h3 style={{ paddingBottom: "30px" }}>Data Quality Dashboard</h3>
      <div>
        <Tabs>
          <TabList aria-label="List of tabs" contained>
            <Tab>Overview</Tab>
            <Tab>Results</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataQualityDashboardOverview
                selectedResource={selectedResource}
                dataQualityData={dataQualityData}
                filteredDataResources={filteredDataResources}
                selectedDataPackage={selectedDataPackage}
                setSelectedDataPackage={setSelectedDataPackage}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                dataPackage={dataPackage}
                isDataQualityLoading={isDataQualityLoading}
                setSelectedResourceValue={setSelectedResource}
              />
            </TabPanel>
            <TabPanel>
              <DataQualityDashboardResults dataQualityData={dataQualityData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default DataQualityDashboard;
