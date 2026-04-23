import React from "react";
import TreeChart from "./TreeChart";
import { dataLevelType } from "constants";

const height = 33;
const width = 150;

const generateNodes = (nodes) => {
  return nodes?.map((node) => {
    const { name, ruleData, dataLevelTypeId, ...restValues } = node || {};
    return {
      id: `${node.id}`,
      height: height,
      width: width,
      data: {
        ...restValues,
        title: name || "- -",
        ruleData,
        dataLevelTypeId,

        type: dataLevelType.find((item) => item.id === dataLevelTypeId)?.name,
      },
    };
  });
};

const generatelink = (children) => {
  return children?.map((data) => ({
    id: `${data?.id}`,
    from: `${data?.source}`,
    to: `${data?.target}`,
  }));
};

function WorkbookChart({
  dataPackages,
  nodeData = [],
  edgeData = [],
  activeWorkbook,
}) {
  const nodesElement = React.useMemo(() => generateNodes(nodeData), [nodeData]);

  const linkElements = React.useMemo(() => generatelink(edgeData), [edgeData]);

  return (
    <TreeChart
      dataPackages={dataPackages}
      nodes={nodesElement}
      edges={linkElements}
      activeWorkbook={activeWorkbook}
    />
  );
}

export default WorkbookChart;
