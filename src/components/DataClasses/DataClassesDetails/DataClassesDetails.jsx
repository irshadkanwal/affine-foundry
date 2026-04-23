import React from "react";
import {
  Tabs,
  Tab,
  Tag,
  TabList,
  TabPanel,
  TabPanels,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "@carbon/react";
import DataClassesDetailsOverview from "./DataClassesDetailsOverview/DataClassesDetailsOverview";
import DataClassesDetailsRelatedContent from "./DataClassesDetailsRelatedContent";

function DataClassesDetails({ setDataClassDetails, dataClassDetails }) {
  return (
    <>
      <Breadcrumb>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDataClassDetails(null);
            }}
          >
            <BreadcrumbItem>Data Classes</BreadcrumbItem>
          </div>
          <p style={{ fontSize: "15px" }}>{dataClassDetails?.name}/</p>
        </div>
      </Breadcrumb>

      <div className="flex_between" style={{ padding: "10px 0 20px 0" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <h3>{dataClassDetails?.name}</h3>
          <Tag style={{ color: "#0043CE" }} type="blue" title="Clear Filter">
            Draft
          </Tag>
        </div>
        <div className="display_flex" style={{ gap: "20px" }}>
          <Button
            kind="secondary"
            onClick={() => {
              setDataClassDetails(null);
            }}
          >
            Delete Draft
          </Button>
          {/* <Button kind="danger">Delete Draft</Button> */}
          <Button>Send for Approval</Button>
        </div>
      </div>

      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Overview</Tab>
          <Tab>Related Content</Tab>
        </TabList>
        <TabPanels>
          <TabPanel style={{ marginTop: "20px" }}>
            <DataClassesDetailsOverview />
          </TabPanel>
          <TabPanel style={{ marginTop: "20px" }}>
            <DataClassesDetailsRelatedContent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default DataClassesDetails;
