import React from "react";
import { IconButton } from "@carbon/react";
import { Canvas, Edge, MarkerArrow, Node } from "reaflow";
import { ZoomIn, ZoomOut, ZoomFit } from "@carbon/icons-react";
import TreeNode from "./TreeNode";
const legendInfo = [
  {
    id: 0,
    color: "#0f62fe",
    name: "Data Package",
  },
  {
    id: 1,

    color: "lightgreen",
    name: "Raw",
  },
  {
    id: 2,

    color: "#E58642",
    name: "Bronze",
  },
  {
    id: 3,

    color: "#bfc1c2",
    name: "Silver",
  },
  {
    id: 4,
    color: "#FFC32B",
    name: "Gold",
  },
];
function TreeChart({
  nodes,
  edges,
  edgesCount = 1,
  handleOpenLineageModal,
  nodeCount = 1,
  selectedLegend,
  setSelectedLegend,
}) {
  const haveSiblings = nodes?.find((data) => data?.data?.sibling);
  const [zoom, setZoom] = React.useState(0.7);
  const ref = React.useRef(null);
  const maxHeight = React.useMemo(
    () =>
      (selectedLegend ? nodeCount * 55 : edgesCount * 120) +
      1200 * (zoom / 1.2),
    [edgesCount, nodeCount, selectedLegend, zoom]
  );
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "68.5vh",
        overflow: "auto",
      }}
    >
      <div className="legend_container">
        <div style={{ marginRight: "10px", width: "60%" }}>
          <h6 className="noselect">Legend</h6>
          <div className="display_flex" style={{ marginTop: "5px" }}>
            <div
              className="display_flex"
              style={{
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  columnGap: "10px",
                  rowGap: "5px",
                }}
              >
                {legendInfo?.map((info, index) => (
                  <div
                    className="display_flex noselect"
                    key={index}
                    style={{
                      cursor: "pointer",
                      width: "max-content",
                    }}
                    onClick={() =>
                      setSelectedLegend((pre) =>
                        pre?.name === info.name ? "" : info
                      )
                    }
                  >
                    <div
                      style={{
                        background:
                          selectedLegend?.name === info?.name
                            ? "#e6e6e6"
                            : info.color,
                        height: "18px",
                        width: "18px",
                        borderRadius: "5px",
                      }}
                    />
                    <p
                      style={{
                        color:
                          selectedLegend?.name === info?.name ? "#e6e6e6" : "",
                      }}
                    >
                      {info.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid lightgray",
            paddingTop: "10px",
          }}
        >
          <h6
            style={{ marginBottom: "5px", marginLeft: "5px" }}
            className="noselect"
          >
            Zoom
          </h6>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "8px",
            }}
          >
            <IconButton
              label="Zoom In"
              kind="ghost"
              closeOnActivation={true}
              onClick={() => ref.current.zoomIn()}
            >
              <ZoomIn />
            </IconButton>
            <IconButton
              label="Zoom Out"
              kind="ghost"
              closeOnActivation={true}
              onClick={() => ref.current.zoomOut()}
            >
              <ZoomOut />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              label="Zoom Fit"
              kind="ghost"
              closeOnActivation={true}
              onClick={() => ref.current.fitCanvas()}
            >
              <ZoomFit />
            </IconButton>
          </div>
        </div>
      </div>
      <style>
        {`
          .edge {
            stroke: #5b5b5b;
            stroke-dasharray: 5;
            animation: dashdraw .5s linear infinite;
            stroke-width: 1;
          }
          @keyframes dashdraw {
            0% { stroke-dashoffset: 10; }
          }
          `}
      </style>
      <Canvas
        maxZoom={0.3}
        minZoom={-0.9}
        zoom={zoom}
        ref={ref}
        className="chart-canvas"
        readonly={true}
        nodes={nodes}
        edges={edges}
        fit={true}
        maxWidth={4200}
        defualtPosition={null}
        layoutOptions={{
          "spacing.nodeNode": haveSiblings ? 220 : 20,

          padding: 120,
        }}
        edge={<Edge className="edge" />}
        arrow={
          <MarkerArrow
            style={{
              fill: "#5b5b5b",
            }}
          />
        }
        direction="Right"
        maxHeight={maxHeight * 2 * zoom}
        node={
          <Node style={{ fill: "none", stroke: "none" }}>
            {(event) => (
              <TreeNode
                handleOpenLineageModal={handleOpenLineageModal}
                event={event}
                selectedLegend={selectedLegend}
              />
            )}
          </Node>
        }
        onZoomChange={(z) => {
          setZoom(z);
        }}
      />
    </div>
  );
}

export default TreeChart;
