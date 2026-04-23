import React from "react";
import { Handle } from "react-flow-renderer";
import { Folder, SoftwareResourceCluster } from "@carbon/icons-react";
import { Loading } from "@carbon/react";

const CustomNodeWithHandle = ({ data, handleEdit, id, ...rest }) => {
  const { title, path, runtimeName } = data;
  const { isTaskStarted } = rest;

  return (
    <div
      style={{
        padding: "10px 15px 10px 15px",
        background: "#FAF9F6",
        boxShadow: " 0px 2px 6px 0px #0000004D",
        cursor: "pointer",
      }}
      onClick={() => {
        handleEdit(+id);
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          paddingBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ marginRight: "10px" }}>{title}</span>
        {isTaskStarted && (
          <Loading
            description="Active loading indicator"
            withOverlay={false}
            small
          />
        )}
      </div>
      <div className="display_flex" style={{ color: "#525252" }}>
        <Folder />
        <p>{path}</p>
      </div>
      <div className="display_flex" style={{ color: "#525252" }}>
        <SoftwareResourceCluster />
        <p>
          {runtimeName?.split(" ")?.length > 5
            ? `${runtimeName?.split(" ").slice(0, 4).join(" ")} ...`
            : runtimeName}
        </p>
      </div>
      <Handle type="target" position="top" style={{ background: "#555" }} />
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

export default CustomNodeWithHandle;
