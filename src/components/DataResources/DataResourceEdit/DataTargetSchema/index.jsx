import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataTargetSchemaJSON from "./DataTargetSchemaJSON";
import DataTargetSchemaTableView from "./DataTargetSchemaTableView";
import { useResourceTargetSchema } from "hooks/dataresources/useResourceTargetSchema";

const DataTargetSchema = ({ selectedDataResourceId }) => {
  const { data: tableResourceSchema = [] } = useResourceTargetSchema(
    selectedDataResourceId
  );
  return (
    <div>
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>JSON View</Tab>
          <Tab>Table View</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DataTargetSchemaJSON
              tableResourceSchema={tableResourceSchema?.at(0)}
            />
          </TabPanel>
          <TabPanel>
            <DataTargetSchemaTableView
              tableResourceSchema={tableResourceSchema}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DataTargetSchema;
