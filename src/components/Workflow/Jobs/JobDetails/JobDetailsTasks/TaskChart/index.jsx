import React from "react";
import Elk from "./Elk";
// Charting styles
import "@carbon/charts/styles.css";
import { Button } from "carbon-components-react";
import { Add } from "@carbon/icons-react";

const height = 115;
const width = 275;
const generateNodes = (nodeData, runTimeData, jobStatus) => {
  return nodeData?.map((data) => ({
    id: `${data?.id}`,
    height: height,
    width: width,
    data: {
      title: data?.name,
      status: data?.taskRunStatus,
      id: data?.id,
      jobStatus: jobStatus,
      description: runTimeData?.filter(
        (runtimeData) => runtimeData?.id === data?.runtimeId
      )[0]?.name,
      path: data?.source,
    },
  }));
};
const generateLinkData = (edgeData) => {
  return edgeData?.map((data) => ({
    id: `${data?.id}`,
    source: `${data?.source}`,
    target: `${data?.target}`,
  }));
};

export default function JobDetailsTasksChart({
  setIsNewTask,
  setIsEditTask,
  taskNodesDataByJobId,
  runTimeData,
  jobById,
  deleteAction,
}) {
  const nodesElement = React.useMemo(
    () =>
      generateNodes(
        taskNodesDataByJobId?.nodeData,
        runTimeData,
        jobById?.lastRunStatus
      ),
    [taskNodesDataByJobId, runTimeData, jobById]
  );
  const linkElements = React.useMemo(
    () => generateLinkData(taskNodesDataByJobId?.edgeData),
    [taskNodesDataByJobId]
  );
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Button
        renderIcon={Add}
        style={{ margin: "30px 0 0 30px", zIndex: "2" }}
        onClick={() => {
          setIsNewTask(true);
        }}
      >
        New Task
      </Button>
      <div
        style={{
          marginTop: "-90px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Elk
          nodes={nodesElement || []}
          links={linkElements || []}
          layout="mrtree"
          setIsEditTask={setIsEditTask}
          deleteAction={deleteAction}
        />
      </div>
      {/*
       * "layout" can be:
       *    - force
       *    - layered//////
       *    - mrtree
       *    - stress
       */}
    </div>
  );
}
