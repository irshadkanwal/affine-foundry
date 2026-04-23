import React from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@carbon/react";
import DataClassesListViewPublished from "./DataClassesListViewPublished";
import DataClassesListViewDraft from "./DataClassesListViewDraft";

function DataClassesGridView({ setDataClassDetails, dataClass }) {
  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        <Tab>Published</Tab>
        <Tab>Draft</Tab>
      </TabList>
      <TabPanels>
        <TabPanel style={{ marginTop: "20px" }}>
          <DataClassesListViewPublished
            dataClass={dataClass}
            setDataClassDetails={setDataClassDetails}
          />
        </TabPanel>
        <TabPanel style={{ marginTop: "20px" }}>
          <DataClassesListViewDraft />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default DataClassesGridView;
