import React from "react";
import { Modal } from "@carbon/react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "carbon-components-react";
import DataLineageInformation from "./DataLineageInformation";
import DataLineageTable from "./DataLineageTable";

function DataLineageModal({
  isLineageModalOpen,
  setIsLineageModalOpen,
  lineageData,
}) {
  return (
    <Modal
      onRequestClose={() => setIsLineageModalOpen(false)}
      open={isLineageModalOpen}
      modalHeading="Data Lineage Information"
      passiveModal
    >
      <div style={{ height: "450px" }}>
        <Tabs>
          <TabList aria-label="List of tabs" contained>
            <Tab>Information</Tab>
            <Tab>Schema</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataLineageInformation lineageData={lineageData} />
            </TabPanel>
            <TabPanel>
              <DataLineageTable lineageData={lineageData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Modal>
  );
}

export default DataLineageModal;
