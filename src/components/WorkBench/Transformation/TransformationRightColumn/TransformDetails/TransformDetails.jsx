import React from "react";
import { TabList, TabPanel, TabPanels, Tab, Tabs } from "@carbon/react";
import TransformDetailsOverview from "./TransformDetailsOverview";
import TransformDetailsSources from "./TransformDetailsSources";
import TransformDetailsTarget from "./TransformDetailsTarget";
import TransformDetailsRules from "./TransformDetailsRules/TransformDetailsRules";

function TransformDetails() {
  return (
    <div>
      <p>Project Name 1</p>
      <h4 style={{ paddingBottom: "25px" }}>Transformation 01</h4>
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>Overview</Tab>
          <Tab>Sources</Tab>
          <Tab>Target/Sink</Tab>
          <Tab>Rules</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TransformDetailsOverview />
          </TabPanel>
          <TabPanel>
            <TransformDetailsSources />
          </TabPanel>
          <TabPanel>
            <TransformDetailsTarget />
          </TabPanel>
          <TabPanel>
            <TransformDetailsRules />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default TransformDetails;
