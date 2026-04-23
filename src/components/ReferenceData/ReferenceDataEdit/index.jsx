import React from "react";
import { Modal, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import ReferenceDataOverView from "./ReferenceDataOverView";
import ReferenceDataSource from "./ReferenceDataSource";
import CustomDataTable from "../../Datatable";
import { useLookupSchema } from "../../../hooks/referencedata/useLookupSchema";
import { INITIAL_BUTTON_CONFIG } from "../../../constants";

const headerData = [
  {
    key: "name",
    header: "Field Name",
  },
  {
    key: "dataType",
    header: "Data Type",
  },
];

function ReferenceEditModal({ isOpen, setIsOpen, selectedRow }) {
  const [isOverviewTab, setIsOverviewTab] = React.useState(true);
  const [formikBag, setFormikBag] = React.useState(null);
  const [formikBagSource, setFormikBagSource] = React.useState(null);
  const [isOverviewSubmitting, setIsOverViewSubmitting] = React.useState(true);
  const [isDataSouceSubmitting, setIsDataSouceSubmitting] =
    React.useState(false);
  const [overViewData, setIsOverviewData] = React.useState(selectedRow);
  const { data: lookupSchemaData } = useLookupSchema();
  const [modalButtonConfig, setModalButtonConfig] = React.useState(
    INITIAL_BUTTON_CONFIG
  );

  const handleTabChange = (activeTab) => {
    if (activeTab.selectedIndex === 0) {
      setIsOverViewSubmitting(true);
      setIsDataSouceSubmitting(false);
    } else if (activeTab.selectedIndex === 1) {
      setIsDataSouceSubmitting(true);
      setIsOverViewSubmitting(false);
    }
    setModalButtonConfig((prev) => ({
      ...prev,
      // need to double check if the active tab is a form tab
      // notice that tabs are zero indexed

      isFormTab: activeTab.selectedIndex === 0 || activeTab.selectedIndex === 1,
    }));
  };

  return (
    <Modal
      open={isOpen}
      modalHeading="Edit Reference Data"
      primaryButtonText="Save"
      onRequestSubmit={() => {
        if (!formikBag || !formikBagSource) {
          return;
        }

        if (isOverviewSubmitting) formikBag.submitForm();
        if (isDataSouceSubmitting) formikBagSource.submitForm();
      }}
      primaryButtonDisabled={modalButtonConfig.isSubmitting}
      className={!modalButtonConfig.isFormTab ? "hide-primary-button" : ""}
      secondaryButtonText={isOverviewTab ? "Force Fresh" : "Cancel"}
      onRequestClose={() => setIsOpen(false)}
    >
      <div style={{ width: "100%", height: "535px" }}>
        <Tabs onChange={handleTabChange}>
          <TabList aria-label="List of tabs">
            <Tab onClick={() => setIsOverviewTab(true)}>Overview</Tab>
            <Tab onClick={() => setIsOverviewTab(false)}>Data Source</Tab>
            <Tab onClick={() => setIsOverviewTab(false)}>Schema</Tab>
            <Tab onClick={() => setIsOverviewTab(false)}>Sample Data</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReferenceDataOverView
                setIsOverviewData={setIsOverviewData}
                setModalButtonConfig={setModalButtonConfig}
                selectedRowData={selectedRow}
                setFormikBag={setFormikBag}
                setIsOpen={setIsOpen}
              />
            </TabPanel>
            <TabPanel>
              <ReferenceDataSource
                overViewData={overViewData}
                setIsOpen={setIsOpen}
                setModalButtonConfig={setModalButtonConfig}
                dataSourceValues={selectedRow}
                setFormikBag={setFormikBagSource}
              />
            </TabPanel>
            <TabPanel>
              <CustomDataTable
                tableHeading=""
                headers={headerData}
                rows={lookupSchemaData}
                shouldActionsRender={false}
                shouldTableBatchActionsRender={true}
                shouldAddNewButton={false}
                isSelectionEnable={false}
              />
            </TabPanel>
            <TabPanel>
              <CustomDataTable
                tableHeading=""
                headers={headerData}
                rows={lookupSchemaData}
                shouldActionsRender={false}
                shouldTableBatchActionsRender={true}
                isSelectionEnable={false}
                shouldAddNewButton={false}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ReferenceEditModal;
