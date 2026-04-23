import React from "react";
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataResourceInformation from "./DataResourceInformation";

function DataResourceAddModal({ isOpen, setIsOpen }) {
  const [formikBag, setFormikBag] = React.useState(null);

  return (
    <Modal
      open={isOpen}
      modalHeading="Add Data Resource"
      primaryButtonText="Save"
      onRequestSubmit={() => {
        if (!formikBag) {
          return;
        }

        formikBag.submitForm();
      }}
      size="lg"
      onRequestClose={() => setIsOpen(false)}
      secondaryButtonText="Cancel"
    >
      <div style={{ width: "100%", height: "680px" }}>
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Information</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataResourceInformation
                setFormikBag={setFormikBag}
                setIsOpen={setIsOpen}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      {}
    </Modal>
  );
}

export default DataResourceAddModal;
