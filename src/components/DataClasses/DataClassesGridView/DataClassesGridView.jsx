import React from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@carbon/react";
import DataClassesGridViewPublished from "./DataClassesGridViewPublished";
import DataClassesGridViewDraft from "./DataClassesGridViewDraft";

function DataClassesGridView({ setDataClassDetails, dataClass }) {
  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        <Tab>Published</Tab>
        <Tab>Draft</Tab>
      </TabList>
      <TabPanels>
        <TabPanel style={{ marginTop: "20px" }}>
          <DataClassesGridViewPublished
            dataClass={dataClass}
            setDataClassDetails={setDataClassDetails}
          />
        </TabPanel>
        <TabPanel style={{ marginTop: "20px" }}>
          <DataClassesGridViewDraft />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default DataClassesGridView;
