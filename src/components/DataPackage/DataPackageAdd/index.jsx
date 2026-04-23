import React from "react";
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataPackageInformation from "./DataPackageInformation";

function DataPackageAddModal({ isOpen, setIsOpen, tableNameSuggestions }) {
  const [formikBag, setFormikBag] = React.useState(null);
  const [selectedTrigger, setSelectedTrigger] = React.useState(null);

  return (
    <Modal
      open={isOpen}
      modalHeading="New Data Package"
      primaryButtonText="Save"
      preventCloseOnClickOutside={
        selectedTrigger?.trigger === "Scheduled" || selectedTrigger?.slaCron
      }
      onRequestSubmit={() => {
        if (!formikBag) {
          return;
        }

        formikBag.submitForm();
      }}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      size="lg"
      secondaryButtonText="Cancel"
    >
      <div style={{ width: "100%", height: "610px" }}>
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Information</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataPackageInformation
                selectedTrigger={selectedTrigger}
                setSelectedTrigger={setSelectedTrigger}
                setFormikBag={setFormikBag}
                tableNameSuggestions={tableNameSuggestions}
                setIsOpen={setIsOpen}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Modal>
  );
}

export default DataPackageAddModal;
