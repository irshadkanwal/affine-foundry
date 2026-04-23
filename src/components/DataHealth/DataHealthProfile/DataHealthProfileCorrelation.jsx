import { Column, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import DataHealthChartComponent from "./DataHealthChartComponent";
import DataHealthProfileCorrelationTable from "./DataHealthProfileCorrelationTable";

function DataHealthProfileCorrelation({ correlationData }) {
  const columnNameList = correlationData?.map((data) => data?.columnId1);

  const headerList = [...new Set(columnNameList)];
  const headerNameList = headerList?.map((data) => ({
    key: data,
    header: data,
  }));
  return (
    <>
      <Column sm={4} md={6} lg={16} className="card_correlation">
        <h4
          style={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "22px",
            letterSpacing: 0,
            padding: "16px",
          }}
        >
          Correlations
        </h4>
        <Tabs>
          <TabList aria-label="List of tabs" style={{ marginBottom: "20px" }}>
            <Tab>Heatmap</Tab>
            <Tab>Table</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataHealthChartComponent
                correlationData={correlationData}
                axisNameList={headerList}
              />
            </TabPanel>
            <TabPanel>
              <DataHealthProfileCorrelationTable
                headerList={headerList}
                correlationData={correlationData}
                headerNameList={[
                  { key: "name", header: "" },
                  ...headerNameList,
                ]}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Column>
    </>
  );
}
export default DataHealthProfileCorrelation;
