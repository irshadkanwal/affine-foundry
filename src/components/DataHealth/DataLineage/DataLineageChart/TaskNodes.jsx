import React from "react";
import ReactFlow, { ReactFlowProvider, MarkerType } from "react-flow-renderer";
import CustomNodeWithHandle from "./CustomNodeWithHandle";
import CustomEdge from "./CustomEdge";

const calculateScreenWidth = (initialValue) => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1600) {
    return parseInt(initialValue * 1.4);
  } else if (screenWidth >= 1000) {
    return parseInt(initialValue * 1.05);
  } else if (screenWidth >= 700) {
    return parseInt((initialValue / 8) * 6);
  }
};

const elements = [
  // Other nodes and edges in your diagram
  // For the custom node, use the 'data' property to provide the title and description.
  {
    id: "customNode1",
    type: "customNodeWithHandle", // This should match the type you define in the Node Types (explained below).
    position: { x: 10, y: 80 },
    data: {
      title: "Node 1",
      description: "This is the first custom node.",
      type: "raw",
    },
  },
  {
    id: "customNode2",
    type: "customNodeWithHandle",
    data: {
      title: "Node 2",
      description: "This is the 2nd custom node.",
      type: "bronze",
    },
    position: { x: 280, y: 80 },
  },
  {
    id: "customNode3",
    type: "customNodeWithHandle",
    data: {
      title: "Node 3",
      description: "This is the third custom node.",
      type: "bronze",
    },
    position: { x: 280, y: 220 },
  },
  {
    id: "customNode4",
    type: "customNodeWithHandle",
    data: {
      title: "Node 4",
      type: "silver",
      description: "This is the forth custom node.",
    },
    position: { x: 555, y: 80 },
  },
  {
    id: "customNode7",
    type: "customNodeWithHandle",
    data: {
      title: "Node 7",
      type: "silver",
      description: "This is the forth custom node.",
    },
    position: { x: 555, y: 220 },
  },
  {
    id: "customNode8",
    type: "customNodeWithHandle",
    data: {
      title: "Node 8",
      type: "silver",
      description: "This is the forth custom node.",
    },
    position: { x: 555, y: 380 },
  },
  {
    id: "customNode5",
    type: "customNodeWithHandle",
    data: {
      title: "Node 5",
      type: "gold",
      description: "This is the forth custom node.",
    },
    position: { x: 835, y: 80 },
  },
  {
    id: "customNode6",
    type: "customNodeWithHandle",
    data: {
      title: "Node 6",
      type: "bronze",
      description: "This is the forth custom node.",
    },
    position: { x: 280, y: 380 },
  },
  {
    id: "customNode9",
    type: "customNodeWithHandle",
    data: {
      title: "Node 9",
      type: "gold",
      sibling: {
        id: "customNode10",
        type: "customNodeWithHandle",
        data: {
          title: "Node 10",
          type: "gold",
          description: "This is the forth custom node.",
        },
        position: { x: 835, y: 500 },
      },
      description: "This is the forth custom node.",
    },
    position: { x: 835, y: 380 },
  },

  // Add more nodes as needed.
];
const edges = [
  {
    id: "edge1",
    source: "customNode1",
    target: "customNode2",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge2",
    source: "customNode1",
    target: "customNode3",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge3",
    source: "customNode2",
    target: "customNode4",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge5",
    source: "customNode4",
    target: "customNode5",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge6",
    source: "customNode1",
    target: "customNode6",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge7",
    source: "customNode3",
    target: "customNode7",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge8",
    source: "customNode6",
    target: "customNode8",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge9",
    source: "customNode8",
    target: "customNode9",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  {
    id: "edge10",
    source: "customNode8",
    target: "customNode10",
    markerEnd: {
      type: MarkerType.Arrow,

      width: 30,
      height: 30,
    },
  },
  // Add more edges as needed.
];

function TaskNodes({ setIsEditTask }) {
  const [initialElements, setInitialElements] = React.useState(elements);
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const updatePositions = () => {
    const updatedElements = elements.map((element) => {
      const { position, ...rest } = element;
      if (position) {
        const { x, y } = position;
        const newX = calculateScreenWidth(parseInt(x));
        return {
          ...rest,
          position: { x: newX, y },
        };
      }
      return element;
    });
    setInitialElements(updatedElements);
  };

  React.useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  const nodeTypes = React.useMemo(
    () => ({
      customNodeWithHandle: (nodeProps) => (
        <CustomNodeWithHandle
          {...nodeProps}
          setIsEditTask={setIsEditTask}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      ),
    }),
    [setIsEditTask, isCollapsed]
  );
  const edgeTypes = React.useMemo(
    () => ({
      customEdge: CustomEdge,
    }),
    [] // Connect the 'customNodeWithHandle' type to your custom node component.
  );
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={initialElements}
          edges={edges}
          edgeTypes={edgeTypes}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          zoomActivationKeyCode={false}
          zoomOnPinch={false}
          style={{ marginTop: "-50px" }}
        ></ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default TaskNodes;
