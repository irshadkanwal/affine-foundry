import React from "react";
import { Stop, ChevronDown, ChevronUp } from "@carbon/icons-react";
import { shortInfo } from "utils/shortInfo";

function Node({ node, setIsEditTask }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const { x, id, y, height, width, data } = node;
  const { title, description, type, sibling, columnCount, recordCount } = data;
  // React.useEffect(() => {
  //   if (col?.children === 0) {
  //     setIsCollapsed(true);
  //   }
  // }, [col]);
  const handleCloseCollapsable = () => {
    setIsCollapsed(true);
    // setCol((pre) => ({
    //   ...pre,
    //   children:
    //     pre.children >= data?.sibling?.length
    //       ? pre.children - data?.sibling?.length
    //       : 0,
    // }));
  };
  const handleOpenCollapsable = (event) => {
    event.stopPropagation();
    //console.log(data?.sibling?.length, "col");
    setIsCollapsed(false);
    // setCol((pre) => ({
    //   parentIndex: index,
    //   children:
    //     pre.children !== 0
    //       ? pre.children <= data?.sibling?.length
    //         ? data?.sibling?.length
    //         : pre.children
    //       : data?.sibling?.length,
    // }));
  };

  return (
    <foreignObject
      transform={`translate(${x},${y})`}
      height={!isCollapsed ? 300 : height}
      width={width}
      key={id}
      style={{ overflow: isCollapsed ? "visible" : "scroll" }}
    >
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
            {/* <p style={{ fontSize: "12px" }}>Collapse</p> */}
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
            padding: "8px",
            width: "100%",
            background: "#F4F4F4",
            borderLeft: `5px solid ${
              type === "raw"
                ? "#FAF9F6"
                : type === "bronze"
                ? "#E58642"
                : type === "silver"
                ? "#bfc1c2 "
                : "#FFC32B"
            }`,
            boxShadow: " 0px 2px 6px 0px #0000004D",
            cursor: "pointer",
            // color: type === "bronze" || type === "silver" ? "white" : "black",
          }}
          onClick={() => {
            setIsEditTask(+id);
          }}
        >
          <div className="flex_between">
            <div className="display_flex">
              {isCollapsed && <Stop size={22} />}
              <span
                style={{
                  fontWeight: isCollapsed ? "bold" : "",
                  paddingBottom: "10px",
                  fontSize: !isCollapsed ? "14px" : "",
                }}
              >
                {shortInfo(title, !isCollapsed && sibling ? 19 : 15, "")}
              </span>
            </div>
            {isCollapsed && sibling && (
              <div onClick={handleOpenCollapsable}>
                <ChevronDown />
              </div>
            )}
          </div>
          <div style={{ paddingLeft: "26px" }}>
            {isCollapsed && (
              <>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#525252",
                    marginBottom: "3px",
                  }}
                >
                  Host: {description}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#525252",
                    marginBottom: "3px",
                  }}
                >
                  Column Count: {columnCount}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#525252",
                  }}
                >
                  Record Count: {recordCount?.toLocaleString("en-US")}
                </p>
              </>
            )}
          </div>
        </div>
        {sibling &&
          !isCollapsed &&
          sibling?.map((val, i) => (
            <div
              key={i}
              style={{
                marginTop: "20px",
                padding: "8px",
                width: "100%",
                background: "#F4F4F4",
                borderLeft: `5px solid ${
                  type === "raw"
                    ? "#FAF9F6"
                    : type === "bronze"
                    ? "#E58642"
                    : type === "silver"
                    ? "#bfc1c2"
                    : "#FFC32B"
                }`,

                boxShadow: " 0px 2px 6px 0px #0000004D",
                cursor: "pointer",
                color: "black",
              }}
              onClick={() => {
                setIsEditTask(+val?.id);
              }}
            >
              <div className="flex_between">
                <div className="display_flex">
                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {shortInfo(title, !isCollapsed && sibling ? 19 : 15, "")}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </foreignObject>
  );
}
export default Node;
