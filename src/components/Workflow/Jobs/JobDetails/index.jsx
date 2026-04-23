import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
//   Button,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
// import { Play, Stop } from "@carbon/icons-react";

import { JobDetailsRuns } from "./JobDetailsRuns/JobDetailsRuns";
import { JobDetailsTasks } from "./JobDetailsTasks/JobDetailsTasks";
import { ToastNotification } from "@carbon/react";
import JobDetailsLogs from "./JobDetailsLogs";

function JobDetails({
  setIsJobDetails,
  selectedRow,
  selectedJobId,
  handlePlayClick,
  notificationData,
}) {
  const [isTaskView, setIsTaskView] = React.useState(false);
  const [isJobRunDetailOpen, setIsJobRunDetailOpen] = React.useState(false);
//   const [isTaskStarted, setIsTaskStarted] = React.useState(null);
  const [isTaskStarted] = React.useState(null);
  const selectedRowData = selectedRow?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return {
      ...acc,
      [objectKey[1]]: value.value,
      jobId: Number(objectKey[0]),
    };
  }, {});

  return (
    <div>
      {notificationData?.shown && (
        <ToastNotification
          aria-label="closes notification"
          caption={notificationData?.caption}
          kind={notificationData?.kind}
          // timeout={2000}
          style={{
            marginRight: "-5px",
            position: "absolute",
            right: "36px",
            zIndex: "3",
            top: "59px",
          }}
          lowContrast
          onClose={function noRefCheck() {}}
          onCloseButtonClick={function noRefCheck() {}}
          statusIconDescription="notification"
          subtitle={notificationData?.subtitle}
          title="Job run"
        />
      )}
      <Breadcrumb>
        <BreadcrumbItem
          onClick={() => {
            setIsJobDetails(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Workflow
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            setIsJobDetails(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Jobs
        </BreadcrumbItem>
        <p>Details</p>
      </Breadcrumb>
      <div className="flex_between">
        <h3>{selectedRowData?.name}</h3>
        <div className="display_flex">
          {isTaskView && (
            <OverflowMenu
              data-floating-menu-container
              selectorPrimaryFocus={".optionOne"}
            >
              <OverflowMenuItem
                itemText="Job Run Details"
                onClick={() => setIsJobRunDetailOpen(true)}
              />
            </OverflowMenu>
          )}
{/*           <Button */}
{/*             kind={isTaskStarted ? "tertiary" : "primary"} */}
{/*             renderIcon={isTaskStarted ? Stop : Play} */}
{/*             onClick={() => { */}
{/*               setIsTaskView(true); */}
{/*               handlePlayClick(selectedRow); */}
{/*               setIsTaskStarted(""); */}
{/*             }} */}
{/*           > */}
{/*             {isTaskStarted ? "Stop Run" : "Run Now"} */}
{/*           </Button> */}
        </div>
      </div>
      <div style={{ padding: "20px 0 0 0" }}>
        <Tabs>
          <TabList aria-label="List of tabs" contained>
            <Tab onClick={() => setIsTaskView(false)}>Runs</Tab>
            <Tab onClick={() => setIsTaskView(true)}>Tasks</Tab>
            <Tab onClick={() => setIsTaskView(false)}>Logs</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <JobDetailsRuns jobId={selectedRowData?.jobId || selectedJobId} />
            </TabPanel>
            <TabPanel>
              <JobDetailsTasks
                isTaskStarted={isTaskStarted}
                jobId={selectedRowData?.jobId || selectedJobId}
                isJobRunDetailOpen={isJobRunDetailOpen}
                setIsJobRunDetailOpen={setIsJobRunDetailOpen}
              />
            </TabPanel>
            <TabPanel>
              <JobDetailsLogs jobId={selectedRowData?.jobId || selectedJobId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default JobDetails;
