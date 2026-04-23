import React, { useState, useEffect } from "react";
import ELK from "elkjs/lib/elk.bundled";
import { path as d3Path } from "d3-path";
import { Edge } from "@carbon/charts-react";
import { ArrowRightMarker } from "@carbon/charts-react";
import {
  CheckmarkFilled,
  ErrorFilled,
  PauseOutlineFilled,
  SendFilled,
  Error,
  ValueVariable,
  ProgressBarRound,
} from "@carbon/react/icons";
import { Loading, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { Folder, SoftwareResourceCluster } from "@carbon/icons-react";
import { shortInfo } from "utils/shortInfo";

const Link = ({ link }) => {
  const sections = link.sections[0];
  const path = d3Path();

  path.moveTo(sections.startPoint.x, sections.startPoint.y);

  if (sections.bendPoints) {
    sections.bendPoints.forEach((b) => {
      path.lineTo(b.x, b.y);
    });
  }

  path.lineTo(sections.endPoint.x, sections.endPoint.y);

  return <Edge path={path.toString()} markerEnd="arr" />;
};

const Node = ({ node, setIsEditTask, deleteAction }) => {
  const { x, id, y, height, width, data } = node;
  const { title, description, path, status } = data;
  return (
    <foreignObject
      transform={`translate(${x},${y})`}
      height={height}
      width={width}
      style={{ overflow: "visible" }}
    >
      <div
        style={{
          height,
          width,
          borderLeft: status === "running" ? "6px solid #198038" : "",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "10px 10px 10px 10px",
            background: "#FAF9F6",
            boxShadow: " 0px 2px 6px 0px #0000004D",
            cursor: "pointer",
          }}
          onClick={() => setIsEditTask(+id)}
        >
          <div
            style={{
              fontWeight: "bold",
              paddingBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{title}</span>
            <div style={{ display: "flex" }}>
              {
                <>
                  {status === "error" ? (
                    <PauseOutlineFilled color={"orange"} />
                  ) : status === "running" ? (
                    <>
                      <style>
                        {`
                      .green_loader .cds--loading__stroke{
                        stroke:#198038;
                      }
                      `}
                      </style>
                      <div className="green_loader">
                        <Loading
                          description="loading"
                          withOverlay={false}
                          small
                        />
                      </div>
                    </>
                  ) : status === "starting" ? (
                    <ProgressBarRound color={"dodgerblue"} />
                  ) : status === "success" ? (
                    <CheckmarkFilled color={"green"} />
                  ) : status === "fail" ? (
                    <ErrorFilled color={"red"} />
                  ) : status === "submitted" ? (
                    <SendFilled color={"blue"} />
                  ) : status === "dead" ? (
                    <ValueVariable color={"maroon"} />
                  ) : (
                    <Error color="#c6c6c6" />
                  )}
                </>
              }
              <OverflowMenu
                style={{ marginTop: "-11px", marginRight: "-10px" }}
                data-floating-menu-container
                flipped
                selectorPrimaryFocus={".optionOne"}
              >
                <OverflowMenuItem
                  className="optionOne"
                  itemText="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditTask(+id);
                  }}
                />
                <OverflowMenuItem
                  className="optionTwo"
                  itemText="Run Task"
                  onClick={(e) => {
                    e.stopPropagation();
                    // deleteAction(+id);
                  }}
                />
                <OverflowMenuItem
                  className="optionTwo"
                  itemText="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAction(+id);
                  }}
                />
              </OverflowMenu>
            </div>
          </div>
          <div
            className="display_flex"
            style={{ color: "#525252", paddingBottom: "8px" }}
          >
            <Folder />
            <p style={{ fontSize: "12px" }}>{path}</p>
          </div>
          <div className="display_flex" style={{ color: "#525252" }}>
            <SoftwareResourceCluster />
            <p style={{ fontSize: "12px" }}>{shortInfo(description, 7)}</p>
          </div>
        </div>
      </div>
    </foreignObject>
  );
};

const Elk = ({ nodes, links, layout, setIsEditTask, deleteAction }) => {
  const elk = React.useMemo(() => new ELK(), []);

  const [positions, setPositions] = useState(null);

  const graph = React.useMemo(
    () => ({
      id: "root",
      layoutOptions: {
        "elk.algorithm": layout,
        "elk.padding": "[left=220, top=30, right=0, bottom=50]",
        separateConnectedComponents: false,
        "spacing.nodeNode": 100,
        "spacing.nodeNodeBetweenLayers": 100,
      },
      children: nodes,
      edges: links,
    }),
    [layout, nodes, links]
  );

  useEffect(() => {
    elk
      .layout(graph)
      .then((g) => setPositions(g))
      .catch(console.error);
  }, [nodes, links, elk, graph]);

  if (!positions) return null;

  const buildNodes = () => {
    const { children } = positions;

    return children?.map((node, i) => {
      return (
        <Node
          key={`node_${i}`}
          node={node}
          setIsEditTask={setIsEditTask}
          deleteAction={deleteAction}
        />
      );
    });
  };

  const buildLinks = () => {
    const { edges } = positions;

    return edges.map((edge, i) => {
      return <Link key={`link_${i}`} link={edge} />;
    });
  };

  const nodeElements = buildNodes();
  const linkElements = buildLinks();

  return (
    <div
      className={`force`}
      style={{
        position: `relative`,
        height: 1000,
        width: 1300,
        margin: 32,
      }}
    >
      <svg style={{ height: "100%", width: "100%" }}>
        <defs>
          <ArrowRightMarker id="arr" width={10} height={8} />
        </defs>
        {linkElements}
        {nodeElements}
      </svg>
    </div>
  );
};

export default Elk;
