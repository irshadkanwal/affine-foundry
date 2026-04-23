import React from "react";
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataPackageInformation from "./DataPackageInformation";
import DataPackageCollaborators from "./DataPackageCollaborators";
import DataPackageProperties from "./DataPackageProperties";
import DataPackageActivity from "./DataPackageActivity";
import DataPackageListResources from "./DataPackageListResources";

function DataPackageEditModal({
  isOpen,
  setIsOpen,
  selectedRow,
  tableNameSuggestions = [],
}) {
  const [formikBag, setFormikBag] = React.useState(null);
  const [selectedTrigger, setSelectedTrigger] = React.useState(null);
  const [primaryButtonShow, setPrimaryButtonShow] = React.useState(true);
  const handleTabChange = (activeTab) => {
    setPrimaryButtonShow(activeTab.selectedIndex === 0);
  };

  return (
    <Modal
      open={isOpen}
      modalHeading="Edit Data Package"
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
      className={!primaryButtonShow ? "hide-primary-button" : ""}
      secondaryButtonText="Cancel"
    >
      <div style={{ width: "100%", height: "570px" }}>
        <Tabs onChange={handleTabChange}>
          <TabList aria-label="List of tabs">
            <Tab>Information</Tab>
            {/* <Tab>Connectors</Tab> */}
            <Tab>Collaborators</Tab>
            <Tab>Activities</Tab>
            <Tab>Properties</Tab>
            <Tab>List Resources</Tab>
            {/* <Tab>Potential Names</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataPackageInformation
                selectedTrigger={selectedTrigger}
                setSelectedTrigger={setSelectedTrigger}
                selectedRow={selectedRow}
                tableNameSuggestions={tableNameSuggestions}
                setIsOpen={setIsOpen}
                setFormikBag={setFormikBag}
              />
            </TabPanel>
            <TabPanel>
              <DataPackageCollaborators
                selectedDataPackageId={selectedRow.id}
              />
            </TabPanel>
            <TabPanel>
              <DataPackageActivity selectedDataPackageId={selectedRow.id} />
            </TabPanel>
            <TabPanel>
              <DataPackageProperties selectedDataPackageId={selectedRow.id} />
            </TabPanel>
            <TabPanel>
              <DataPackageListResources
                selectedDataPackageId={selectedRow.id}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Modal>
  );
}

export default DataPackageEditModal;
