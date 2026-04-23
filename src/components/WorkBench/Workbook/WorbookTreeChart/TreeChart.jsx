import React, { useState, useRef, useEffect } from "react";
import { Canvas, Edge, Node, Port } from "reaflow";
import TreeNode from "./TreeNode";
import UpdateNodeForm from "../WorkbookChartSection/UpdateNodeForm";
import {
  Edit,
  TrashCan,
} from "@carbon/react/icons";
import { useUpdateWorkbookDetail } from "hooks/ruleworkbook/useUpdateWorkbookDetail";
import { useDeleteWorkbookDetail } from "hooks/ruleworkbook/useDeleteWorkbookDetail";

function TreeChart({ nodes, edges, dataPackages, activeWorkbook }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [activeNodeData, setActiveNodeData] = useState(null);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(null);
  const containerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { mutate: updateWorkbookDetail } = useUpdateWorkbookDetail();
  const { mutate: deleteWorkbookDetail } = useDeleteWorkbookDetail();

  const ports = nodes.map((node) => {
    const hasOutgoingEdge = edges.some(
      (edge) => edge.from === node.id.toString()
    );
    const hasIncomingEdge = edges.some(
      (edge) => edge.to === node.id.toString()
    );

    const nodePorts = [];
    if (hasOutgoingEdge) {
      nodePorts.push({
        id: `${node.id}-from`,
        width: 10,
        height: 10,
        side: "EAST",
      });
    }
    if (hasIncomingEdge) {
      nodePorts.push({
        id: `${node.id}-to`,
        width: 10,
        height: 10,
        side: "WEST",
      });
    }

    return {
      ...node,
      ports: nodePorts,
    };
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDropdownPosition(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const updatedEdges = edges.map((edge) => ({
    ...edge,
    fromPort: `${edge.from}-from`,
    toPort: `${edge.to}-to`,
  }));

  const activeNodeHandling = (event, id, nodesData) => {
    if (selectedNode === id) {
      setSelectedNode(null);
      setDropdownPosition(null);
    } else {
      setSelectedNode(id);
      setActiveNodeData(nodesData);
    }

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    setDropdownPosition({
      top: rect.top + window.scrollY - rect.height / (zoomLevel + 5),
      left: rect.left + window.scrollX - rect.width / zoomLevel / 0.53,
    });
  };

  const handleUpdate = (updatedData) => {
    if (
      updatedData.ruleType === 1 &&
      typeof updatedData.ruleData === "string"
    ) {
      try {
        updatedData.ruleData = JSON.parse(updatedData.ruleData);
      } catch (error) {
        console.error("Invalid JSON in ruleData:", error);
      }
    }
    updateWorkbookDetail({
      workbookDetailId: selectedNode,
      data: updatedData,
    });
  };
  const handleDelete = () => {
    if (!selectedNode) return;
    deleteWorkbookDetail({ workbookDetailId: selectedNode });
    setSelectedNode(null);
  };

  return (
    <>
      <div style={{ position: "relative" }} ref={containerRef}>
        {selectedNode && !isSideNavExpanded && dropdownPosition && (
          <div
            className="dropdown"
            style={{
              position: "absolute",
              top: `${dropdownPosition.top-115}px`,
              left: `${dropdownPosition.left-200}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <ul>
              <li onClick={() => setIsSideNavExpanded(true)}>
                <span>
                  <Edit />
                </span>
                Edit
              </li>
              <li onClick={handleDelete}>
                <span>
                  <TrashCan />
                </span>
                Delete
              </li>
            </ul>
          </div>
        )}
        <style>
          {`
          .edge {
            stroke: gray;
            animation: dashdraw .5s linear infinite;
            stroke-width: 2;
          }
          `}
        </style>
        <Canvas
          className="workbook-chart-canvas"
          nodes={ports}
          edges={updatedEdges}
          edge={<Edge className="edge" />}
          arrow={null}
          zoomable
          direction="Right"
          maxZoom={0.3}
          minZoom={-0.6}
          maxHeight={550}
          maxWidth={1200}
          onZoomChange={(zoom) => setZoomLevel(zoom)}
          onCanvasClick={(event) => {
            setSelectedNode(null);
          }}
          node={
            <Node
              onClick={(event, node) => {
                activeNodeHandling(event, node.id, node);
                setIsSideNavExpanded(false);
              }}
              port={
                <Port
                  style={{
                    fill: "gray",
                    stroke: "none",
                  }}
                  rx={10}
                  ry={10}
                />
              }
            >
              {(event) => {
                return <TreeNode selectedNode={selectedNode} event={event} />;
              }}
            </Node>
          }
        />
      </div>
      {isSideNavExpanded && (
        <UpdateNodeForm
          setIsSideNavExpanded={setIsSideNavExpanded}
          activeNodeData={activeNodeData}
          isEditNode={true}
          selectedNode={selectedNode}
          dataPackages={dataPackages}
          activeWorkbook={activeWorkbook}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

export default TreeChart;
