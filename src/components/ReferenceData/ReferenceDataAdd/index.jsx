import React from "react";
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import ReferenceDataAddOverView from "./ReferenceDataAddOverView";

function ReferenceAddModal({ isOpen, setIsOpen }) {
  const [formikBag, setFormikBag] = React.useState(null);

  return (
    <Modal
      open={isOpen}
      modalHeading="Add Reference Data"
      onRequestSubmit={() => {
        if (!formikBag) {
          return;
        }

        formikBag.submitForm();
      }}
      primaryButtonText="Save"
      onRequestClose={() => setIsOpen(false)}
      secondaryButtonText="Force Fresh"
    >
      <div style={{ width: "100%", height: "535px" }}>
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab>Overview</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReferenceDataAddOverView
                setFormikBag={setFormikBag}
                setIsOpen={setIsOpen}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ReferenceAddModal;
