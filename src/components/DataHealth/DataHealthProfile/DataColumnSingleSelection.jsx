import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import { DataValidation, Transformation } from "./DataHealthTabPanels";
function SingleColumnContent({ rowData = [] }) {
  return (
    <div style={{ paddingTop: "20px" }}>
      <h2
        style={{
          paddingBottom: "15px",
        }}
      >
        Column
      </h2>
      <div
        style={{
          backgroundColor: "#e0e0e0",
          padding: "20px",
          display: "flex",
        }}
      >
        <h6 style={{ width: "55%" }}>Name</h6>
        <h6>Data Class</h6>
      </div>
      <div>
        <div
          style={{
            backgroundColor: "#e8e8e8",
            padding: "20px",
            display: "flex",
          }}
        >
          {rowData?.map((data) => {
            return (
              <>
                <p style={{ width: "55%" }}>{data?.columnName}</p>
                {data?.dataType}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DataColumnSingleSelection({ rowData }) {
  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        <Tab>Data Class</Tab>
        <Tab>Transformation</Tab>
        <Tab>Validation</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SingleColumnContent rowData={rowData} />
        </TabPanel>
        <TabPanel>
          <Transformation />
        </TabPanel>
        <TabPanel>
          <DataValidation />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default DataColumnSingleSelection;
