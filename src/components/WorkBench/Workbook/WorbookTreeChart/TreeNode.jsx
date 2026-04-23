import React from "react";
import { EdgeNodeAlt } from "@carbon/react/icons";

function TreeNode({ event, selectedNode }) {
  const { height, width, node } = event;
//   const { title, id, type, description } = node?.data;
  const { title, id, type } = node?.data;

  const isNodeSelected = selectedNode === id;

  return (
    <foreignObject
      height={height}
      width={width}
      pointerEvents="none"
      key={id}
      style={{
        boxShadow: isNodeSelected ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "",
        cursor: "pointer",
        border: isNodeSelected ? "1px solid gray" : "",
      }}
    >
      <div className="tree_node">
        <div
          className="node_type"
          style={{
            backgroundColor:
              type === ""
                ? "green"
                : type === "Silver"
                ? "GrayText"
                : type === "Gold"
                ? "gold"
                : type === "Sandbox"
                ? "skyblue"
                : "gray",
          }}
        />
        <h6>
          <span>
            <EdgeNodeAlt />
          </span>
          {title}
        </h6>
      </div>
    </foreignObject>
  );
}
export default TreeNode;
