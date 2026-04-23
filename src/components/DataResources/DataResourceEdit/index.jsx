import React from "react";
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataPackageInformation from "./DataResourceInformation";
import DataResourceProperties from "./DataResourceProperties";
import DataResourceActivities from "./DataResourceActivities";
import DataResourceSchema from "./DataResourceSchema";
import DataTargetSchema from "./DataTargetSchema";
import { useDataFormat } from "hooks/useDataFormat";

function DataResourceEditModal({
  isOpen,
  setIsOpen,
  selectedRow,
  dataClass,
  transactionType,
}) {
  const [formikBag, setFormikBag] = React.useState(null);
  const [resoruceName, setResourceName] = React.useState(null);
  const [primaryButtonShow, setPrimaryButtonShow] = React.useState(true);
  const { data: dataFormatData = [] } = useDataFormat();
  const dataFormat = dataFormatData?.find(
    (data) => data.id === selectedRow?.dataFormat?.id
  );
  const [setDataFormatType] = React.useState(dataFormat?.name);
  const handleTabChange = (activeTab) => {
    setPrimaryButtonShow(activeTab.selectedIndex === 0);
  };
  return (
    <Modal
      open={isOpen}
      modalHeading="Edit Data Resource"
      primaryButtonText="Save"
      onRequestSubmit={() => {
        if (!formikBag) {
          return;
        }

        formikBag.submitForm();
      }}
      onRequestClose={() => setIsOpen(false)}
      size="lg"
      className={!primaryButtonShow ? "hide-primary-button" : ""}
      secondaryButtonText="Cancel"
    >
      <div style={{ width: "100%", height: "680px" }}>
        <Tabs onChange={handleTabChange}>
          <TabList aria-label="List of tabs">
            <Tab>Information</Tab>
            <Tab>Activities</Tab>
            <Tab>Properties</Tab>
            {/* <Tab>Dialect</Tab> */}
            <Tab>Resource Schema</Tab>
            <Tab>Target Schema(s)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataPackageInformation
                setIsOpen={setIsOpen}
                transactionType={transactionType}
                dataClass={dataClass}
                selectedRow={selectedRow}
                setFormikBag={setFormikBag}
                setResourceName={setResourceName}
                setDataFormatType={setDataFormatType}
              />
            </TabPanel>
            <TabPanel>
              <DataResourceActivities selectedDataResourceId={selectedRow.id} />
            </TabPanel>
            <TabPanel>
              <DataResourceProperties selectedDataResourceId={selectedRow.id} />
            </TabPanel>
            <TabPanel>
              <DataResourceSchema
                selectedDataResourceId={selectedRow.id}
                selectedDataResourceName={resoruceName}
              />
            </TabPanel>
            <TabPanel>
              <DataTargetSchema selectedDataResourceId={selectedRow.id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Modal>
  );
}

export default DataResourceEditModal;
