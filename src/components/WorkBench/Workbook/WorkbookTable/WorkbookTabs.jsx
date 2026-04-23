import React from "react";
import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@carbon/react";
import CustomDataTable from "components/Datatable";
import { formatDateForApi } from "utils/formatDateTime";

const errorTabHeaderData = [
  {
    key: "target",
    header: "Target",
  },
  {
    key: "Reported",
    header: "Reported",
  },
  {
    key: "failure_reason",
    header: "Failure reason",
    type: "integar",
  },
];

const historyTabheaderData = [
  {
    key: "id",
    header: "id",
    type: "integar",
  },
  {
    key: "work_book_id",
    header: "work_book_id",
    type: "integar",
  },
  {
    key: "ruleType",
    header: "rule_type",
    type: "integar",
  },
  {
    key: "depends_on",
    header: "depends_on",
    type: "character varying (80)",
  },
  {
    key: "name",
    header: "name",
    type: "character varying (150)",
  },
  {
    key: "description",
    header: "description",
    type: "character varying (255)",
  },
  {
    key: "savedData",
    header: "saved_data",
    type: "boolean",
  },
  {
    key: "rule_data",
    header: "rule_data",
    type: "json",
  },
  {
    key: "dataLevelTypeId",
    header: "data_level_type_id",
    type: "integar",
  },
  {
    key: "dataClassId",
    header: "data_class_id",
    type: "integar",
  },
  {
    key: "createdAt",
    header: "created_at",
    type: "timestamp without timezone",
  },
  {
    key: "updatedAt",
    header: "updated_at",
    type: "timestamp without timezone",
  },
];

const WorkbookTabs = ({ runHistoryData, errorsData, activeWorkbook }) => {
  const runHistory = runHistoryData?.map((data) => ({
    ...data,
    work_book_id: activeWorkbook?.id,
    createdAt: formatDateForApi(data.createdAt),
    updatedAt: formatDateForApi(data.updatedAt),
  }));
  return (
    <div>
      <Tabs>
        <TabList aria-label="List of tabs">
          <Tab>Run History</Tab>
          <Tab>Error</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <style>
              {`.noheader .cds--data-table-header {
                          display:none;
                          padding:0;
                          }
                          .noheader .cds--table-toolbar {
                            min-height: 0;
                        }`}
            </style>
            <div className="noheader" style={{ overflowX: "auto" }}>
              <CustomDataTable
                headers={historyTabheaderData}
                rows={runHistory}
                shouldTableBatchActionsRender={false}
                isSelectionEnable={false}
                shouldAddNewButton={false}
                isActiveTag={false}
                statusWidth="200px"
                tableInlineSearch={false}
                shouldActionsRender={false}
                showDownloadButton={false}
                isSortable={true}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div
              className="noheader"
              style={{ overflowX: "auto", width: "100%" }}
            >
              <CustomDataTable
                headers={errorTabHeaderData}
                rows={errorsData}
                shouldTableBatchActionsRender={false}
                isSelectionEnable={false}
                shouldAddNewButton={false}
                isActiveTag={false}
                statusWidth="200px"
                tableInlineSearch={false}
                shouldActionsRender={false}
                showDownloadButton={false}
                isSortable={true}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default WorkbookTabs;
