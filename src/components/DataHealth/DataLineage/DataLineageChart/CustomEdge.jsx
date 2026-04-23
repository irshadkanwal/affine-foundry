import React from "react";
import { EdgeText } from "react-flow-renderer";

const CustomEdge = ({ sourceX, sourceY, targetX, targetY, label }) => {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        stroke="#555"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      <EdgeText
        x={midX}
        y={midY}
        style={{
          fill: "#555",
          fontSize: "12px",
          fontWeight: "bold",
          textAnchor: "middle",
        }}
      >
        {label}
      </EdgeText>
    </>
  );
};

export default CustomEdge;

