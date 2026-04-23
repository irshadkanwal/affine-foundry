import React from "react";
import ELK from "elkjs/lib/elk.bundled";
import { path as d3Path } from "d3-path";
import { Edge } from "@carbon/charts-react";
import { ArrowRightMarker } from "@carbon/charts-react";
import Node from "./Node";

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

  return (
    <Edge
      path={path.toString()}
      // markerStart="circle"
      markerEnd="arr"
      // variant="dash-sm"
    />
  );
};
const getHeight = (nodes) =>
  350 * nodes?.filter(({ data }) => data?.type === "raw")?.length;
const Elk = ({ nodes, links, layout, setIsEditTask }) => {
  const elk = React.useMemo(() => new ELK(), []);
  const [height, setHeight] = React.useState(120);
  const [positions, setPositions] = React.useState(null);
  const [col, setCol] = React.useState({
    parentIndex: null,
    children: 0,
  });
  React.useEffect(() => {
    // setHeight(getHeight(nodes));
    const updateLayout = async () => {
      const screenWidth = window.innerWidth;
      let nodeNodeBetweenLayers = 40;

      if (screenWidth > 1600) {
        nodeNodeBetweenLayers = 160;
      } else if (screenWidth > 1400) {
        nodeNodeBetweenLayers = 40;
      }
      // const spacing = {
      //   nodeSpace: !col.children ? 20 : 20 + 57 * col.children,
      //   height: col.children
      //     ? 150 * col.children +
      //       130 *
      //         nodes[col.parentIndex]?.data?.sibling?.length *
      //         nodes?.filter(({ data }) => data?.type === "raw")?.length
      //     : getHeight(nodes),
      // };
      setHeight(getHeight(nodes));
      const graph = {
        id: "root",
        layoutOptions: {
          "elk.algorithm": layout,
          separateConnectedComponents: false,
          "spacing.nodeNode": 200,
          "spacing.nodeNodeBetweenLayers": nodeNodeBetweenLayers,
        },
        children: nodes,
        edges: links,
      };

      try {
        const g = await elk.layout(graph);
        setPositions(g);
      } catch (error) {
        console.error(error);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [layout, nodes, links, elk, col]);

  if (!positions) return null;

  const buildNodes = () => {
    const { children } = positions;

    return children.map((node, i) => {
      return (
        <Node
          index={i}
          key={i}
          node={node}
          setIsEditTask={setIsEditTask}
          setCol={setCol}
          col={col}
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
    <>
      <div
        className={`force`}
        style={{
          height: height,
          position: `relative`,
          paddingTop: "20px",
          marginLeft: "-10px",
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
    </>
  );
};

export default Elk;
