import React from "react";
import { Stop, ChevronDown, ChevronUp, Datastore } from "@carbon/icons-react";
import { shortInfo } from "utils/shortInfo";

function TreeNode({ event, handleOpenLineageModal, selectedLegend }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { height, width, node } = event;
  const { title, id, type, sibling } = node?.data;
  const handleCloseCollapsable = () => {
    setIsCollapsed(true);
  };
  const handleOpenCollapsable = (event) => {
    event.stopPropagation();
    setIsCollapsed(false);
  };
  return (
    <foreignObject
      height={!isCollapsed && !selectedLegend ? 230 : height}
      width={width}
      key={id}
      style={{
        overflow: isCollapsed ? "visible" : "auto",

        boxShadow: isCollapsed ? "" : " 0px 2px 6px 0px #0000004D",
      }}
    >
      {id === "bucketNode" ? (
        <div
          style={{
            backgroundColor: "#F4F4F4",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            boxShadow: " 0px 2px 6px 0px #0000004D",
            alignItems: "center",
          }}
        >
          <Datastore size={36} />
        </div>
      ) : (
        <div
          style={{
            background: sibling && !isCollapsed && "#F4F4F4",
            padding: sibling && !isCollapsed && "20px",
            cursor: "default",
            height: selectedLegend && "100%",
          }}
        >
          {sibling && !isCollapsed && (
            <div
              className="flex_between"
              style={{
                cursor: "default",
                position: "sticky",
                top: "0px",
                width: "110%",
                height: "48px",
                marginLeft: "-10px",
                paddingLeft: "5px",
                background: "#F4F4F4",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  paddingBottom: "10px",
                  fontSize: "14px",
                }}
              >
                {shortInfo(title, 20, "")}
              </span>
              <div
                onClick={() => handleCloseCollapsable()}
                style={{ cursor: "pointer" }}
              >
                <ChevronUp />
              </div>
            </div>
          )}
          <div
            style={{
              height: "100%",
              padding: "8px",
              width: "100%",
              background: "#F4F4F4",
              borderLeft: `5px solid ${
                type === "raw"
                  ? "lightgreen"
                  : type === "bronze"
                  ? "#E58642"
                  : type === "silver"
                  ? "#bfc1c2 "
                  : type === "gold"
                  ? "#FFC32B"
                  : type === "dataPackage"
                  ? "#0f62fe"
                  : "#f4f4f4"
              }`,
              boxShadow: " 0px 2px 6px 0px #0000004D",
              cursor:
                type === "dataPackage" || id === "bucketNode" ? "" : "pointer",
            }}
            onClick={
              type === "dataPackage" || id === "bucketNode"
                ? () => {}
                : () => {
                    handleOpenLineageModal(+node?.id);
                  }
            }
          >
            <div className="flex_between">
              <div className="display_flex">
                {(isCollapsed || selectedLegend) && <Stop size={22} />}
                <span
                  style={{
                    fontWeight: isCollapsed || selectedLegend ? "bold" : "",
                    paddingBottom: "4px",
                    fontSize: !isCollapsed && !selectedLegend ? "14px" : "",
                  }}
                >
                  {shortInfo(title, !isCollapsed && sibling ? 20 : 18, "")}
                </span>
              </div>
              {isCollapsed && sibling && (
                <div onClick={handleOpenCollapsable}>
                  <ChevronDown />
                </div>
              )}
            </div>
          </div>
          {sibling &&
            !isCollapsed &&
            !selectedLegend &&
            sibling?.map((val, i) => (
              <div
                key={i}
                style={{
                  marginTop: "20px",
                  height: "100%",

                  padding: "8px",
                  width: "100%",
                  background: "#F4F4F4",
                  borderLeft: `5px solid ${
                    val?.type === "raw"
                      ? "lightgreen"
                      : val?.type === "bronze"
                      ? "#E58642"
                      : val?.type === "silver"
                      ? "#bfc1c2 "
                      : val?.type === "gold"
                      ? "#FFC32B"
                      : "#f4f4f4"
                  }`,
                  boxShadow: " 0px 2px 6px 0px #0000004D",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleOpenLineageModal(+val?.id);
                }}
              >
                <div className="flex_between">
                  <div className="display_flex">
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      {shortInfo(
                        val?.title,
                        !isCollapsed && sibling ? 19 : 15,
                        ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </foreignObject>
  );
}
export default TreeNode;
