import React from "react";
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  Background,
  MarkerType,
} from "react-flow-renderer";
import { Add } from "@carbon/icons-react";
import CustomNodeWithHandle from "./CustomNodeWithHandle";
import CustomEdge from "./CustomEdge";
import { Button } from "carbon-components-react";
const generateEdges = (edgeData) => {
  return edgeData?.map((data) => {
    return {
      id: `${data?.id}`,
      source: `${data?.target}`,
      target: `${data?.source}`,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 40,
        height: 40,
      },
    };
  });
};

const generateNodes = (nodesData, runTimeData, canvasWidth, canvasHeight) => {
  const paddingX = 100;
  const paddingY = 100;
  const horizontalSpacing =
    (canvasWidth - 2 * paddingX) / Math.max(1, nodesData?.length - 1);
  const verticalSpacing =
    (canvasHeight - 2 * paddingY) / Math.max(1, nodesData?.length - 1);
  return nodesData?.map((data, index) => {
    return {
      id: `${data?.id}`,
      type: "customNodeWithHandle",
      data: {
        title: data?.name,
        path: data?.source,
        runtimeName: runTimeData?.filter(
          (runtimeData) => runtimeData?.id === data?.runtimeId
        )[0]?.name,
      },
      position: {
        x: data.dependsOn
          ? paddingX + index * (horizontalSpacing + 120)
          : index === 0
          ? paddingX + Math.floor(nodesData?.length) * 200
          : paddingX +
            Math.floor(nodesData?.length) * (horizontalSpacing + 130),
        y: data.dependsOn
          ? data.dependsOn?.split(",")?.length >= 2
            ? paddingY + verticalSpacing + 350
            : paddingY + 400
          : index === 0
          ? paddingY + 100
          : paddingY + verticalSpacing + 250,
      },
    };
  });
};
function TaskNodes({
  setIsNewTask,
  setIsEditTask,
  taskNodesDataByJobId,
  isTaskStarted,
  runTimeData = [],
}) {
  const nodesElement = React.useMemo(
    () => generateNodes(taskNodesDataByJobId?.nodeData, runTimeData, 1000, 900),
    [taskNodesDataByJobId, runTimeData]
  );
  const edgesElement = React.useMemo(
    () => generateEdges(taskNodesDataByJobId?.edgeData),
    [taskNodesDataByJobId]
  );
  const nodeTypes = React.useMemo(
    () => ({
      customNodeWithHandle: (nodeProps) => (
        <CustomNodeWithHandle
          {...nodeProps}
          handleEdit={setIsEditTask}
          taskNodesData={taskNodesDataByJobId?.nodeData}
          isTaskStarted={isTaskStarted}
        />
      ),
    }),
    [setIsEditTask, taskNodesDataByJobId, isTaskStarted]
  );
  const edgeTypes = React.useMemo(
    () => ({
      customEdge: CustomEdge,
    }),
    []
  );
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlowProvider>
        <Button
          renderIcon={Add}
          style={{ margin: "30px 0 0 30px", zIndex: "2" }}
          onClick={() => {
            setIsNewTask(true);
          }}
        >
          New Task
        </Button>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodesElement}
          edges={edgesElement}
          edgeTypes={edgeTypes}
          style={{ marginTop: "-75px", zIndex: "0" }}
          draggable={true}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default TaskNodes;
