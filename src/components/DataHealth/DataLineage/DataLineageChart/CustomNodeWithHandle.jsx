import React from "react";
import { Handle } from "react-flow-renderer";
import { Stop, ChevronDown, ChevronUp } from "@carbon/icons-react";

const CustomNodeWithHandle = ({
  isCollapsed,
  setIsCollapsed,
  data,
  setIsEditTask,
}) => {
  const { title, description, type, sibling } = data;

  return (
    <div
      style={{
        background: sibling && !isCollapsed && "#F4F4F4",
        padding: sibling && !isCollapsed && "20px",
        cursor: "default",
      }}
    >
      {sibling && !isCollapsed && (
        <div
          className="flex_between"
          style={{ paddingBottom: "15px", cursor: "default" }}
        >
          <p style={{ fontSize: "12px" }}>Collapse</p>
          <div
            onClick={() => setIsCollapsed(true)}
            style={{ cursor: "pointer" }}
          >
            <ChevronUp />
          </div>
        </div>
      )}
      <div
        style={{
          padding: "8px",
          width: "100%",
          background: "#F4F4F4",
          // type === "raw"
          //   ? "#FAF9F6"
          //   : type === "bronze"
          //   ? "#E58642"
          //   : type === "silver"
          //   ? "#4C4C4C"
          //   : "#FFC32B",
          borderLeft: `5px solid ${
            type === "raw"
              ? "#FAF9F6"
              : type === "bronze"
              ? "#E58642"
              : type === "silver"
              ? "#4C4C4C"
              : "#FFC32B"
          }`,
          boxShadow: " 0px 2px 6px 0px #0000004D",
          cursor: "pointer",
          // color: type === "bronze" || type === "silver" ? "white" : "black",
        }}
        onClick={() => {
          setIsEditTask(true);
        }}
      >
        <div className="flex_between">
          <div
            className="display_flex"
            style={{ fontWeight: "bold", paddingBottom: "10px" }}
          >
            <Stop size={22} />
            {title}
          </div>
          {isCollapsed && sibling && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(false);
              }}
            >
              <ChevronDown />
            </div>
          )}
        </div>
        <div style={{ paddingLeft: "26px" }}>
          <p style={{ fontSize: "12px", color: "#525252" }}>{description}</p>
        </div>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <Handle type="source" position="right" style={{ background: "#555" }} />
      </div>
      {sibling && !isCollapsed && (
        <div
          style={{
            marginTop: "20px",
            padding: "8px",
            width: "100%",
            background: "#F4F4F4",
            // type === "raw"
            //   ? "#FAF9F6"
            //   : type === "bronze"
            //   ? "#E58642"
            //   : type === "silver"
            //   ? "#4C4C4C"
            //   : "#FFC32B",
            borderLeft: `5px solid ${
              type === "raw"
                ? "#FAF9F6"
                : type === "bronze"
                ? "#E58642"
                : type === "silver"
                ? "#4C4C4C"
                : "#FFC32B"
            }`,
            boxShadow: " 0px 2px 6px 0px #0000004D",
            cursor: "pointer",
            color: type === "bronze" || type === "silver" ? "white" : "black",
          }}
          onClick={() => {
            setIsEditTask(true);
          }}
        >
          <div className="flex_between">
            <div
              className="display_flex"
              style={{ fontWeight: "bold", paddingBottom: "10px" }}
            >
              <Stop size={22} />
              {sibling.data.title}
            </div>
          </div>
          <div style={{ paddingLeft: "26px" }}>
            <p style={{ fontSize: "12px", color: "#525252" }}>
              {sibling.data.description}
            </p>
          </div>
          <Handle
            type="target"
            position="left"
            style={{ background: "#555" }}
          />
          <Handle
            type="source"
            position="right"
            style={{ background: "#555" }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomNodeWithHandle;
