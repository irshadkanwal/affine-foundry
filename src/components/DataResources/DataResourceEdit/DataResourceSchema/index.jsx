import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataResourceSchemaJSON from "./DataResourceSchemaJSON";
import DataResourceSchemaTableView from "./DataResourceSchemaTableView";

const DataResourceSchema = ({
  selectedDataResourceId,
  selectedDataResourceName,
}) => {
  return (
    <div>
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>JSON View</Tab>
          <Tab>Table View</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DataResourceSchemaJSON
              selectedDataResourceName={selectedDataResourceName}
              selectedDataResourceId={selectedDataResourceId}
            />
          </TabPanel>
          <TabPanel>
            <DataResourceSchemaTableView
              selectedDataResourceName={selectedDataResourceName}
              selectedDataResourceId={selectedDataResourceId}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DataResourceSchema;
