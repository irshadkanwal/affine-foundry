import React from "react";
import Elk from "./Elk";
import "@carbon/charts/styles.css";

const height = 120;
const width = 230;
const typeArray = ["", "raw", "bronze", "silver", "gold"];
function removeDuplicatesById(data) {
  const uniqueData = data.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = item;
    } else if (item.sibling) {
      acc[item.id] = item;
    }
    return acc;
  }, {});

  return Object.values(uniqueData);
}

const generateNodes = (nodeData, children = []) => {
  const sourceNodes = children?.map((data) => {
    const value = nodeData?.filter((node) => node?.id === data[0]?.source)[0];
    const filteredSibling = data?.slice(1)?.flatMap((val) => {
      return nodeData?.filter((node) => val.source === node?.id);
    });
    const siblingArray = filteredSibling?.map((val) => ({
      title: val?.tableNameX
        ? val?.tableNameX
        : val?.database
        ? val?.database
        : val?.uri
        ? val?.uri?.split("/").pop()
        : "- -",
      id: val?.id,
      columnCount: val?.columnCount,
      recordCount: val?.recordCount,
      description: `${val?.host}`,
      type: typeArray[val?.dataLevelTypeId],
    }));
    return {
      id: `${data[0]?.source}`,
      height: height,
      width: width,
      data: {
        title: value?.tableNameX
          ? value?.tableNameX
          : value?.database
          ? value?.database
          : value?.uri
          ? value?.uri?.split("/").pop()
          : "- -",
        sibling: siblingArray?.length !== 0 ? siblingArray : null,
        id: data[0]?.id,
        columnCount: value?.columnCount,
        recordCount: value?.recordCount,
        description: `${value?.host}`,
        type: typeArray[value?.dataLevelTypeId],
      },
    };
  });
  const targetNodes = children?.map((data) => {
    const value = nodeData?.filter((node) => node?.id === data[0]?.target)[0];

    return {
      id: `${data[0]?.target}`,
      height: height,
      width: width,
      data: {
        title: value?.tableNameX
          ? value?.tableNameX
          : value?.database
          ? value?.database
          : value?.uri
          ? value?.uri?.split("/").pop()
          : "- -",
        id: data[0]?.id,
        columnCount: value?.columnCount,
        recordCount: value?.recordCount,
        description: `${value?.host}`,
        type: typeArray[value?.dataLevelTypeId],
      },
    };
  });
  const nodes = [...sourceNodes, ...targetNodes];
  return removeDuplicatesById(nodes);
};
const getChildren = (nodeData, edges = []) => {
  return nodeData?.flatMap((node) => {
    const childHavingSameTarget = edges?.filter(
      (edge) => edge?.target === node?.id
    );
    const data = childHavingSameTarget?.map((value) => value);
    const groupedData = data.reduce((map, item) => {
      const target = item.target;

      if (map.has(target)) {
        map.get(target).push(item);
      } else {
        map.set(target, [item]);
      }

      return map;
    }, new Map());

    return Array.from(groupedData.values());
  });
};
// const generateLinkData = (edgeData) => {
//   return edgeData?.map((data, index) => ({
//     id: `${data?.id}`,
//     source: `${data?.source}`,
//     target: `${data?.target}`,
//   }));
// };

const generatelink = (children) => {
  return children?.map((data) => ({
    id: `${data[0]?.id}`,
    source: `${data[0]?.source}`,
    target: `${data[0]?.target}`,
  }));
};

export default function DataLineageElkChart({
  setIsEditTask,
  nodeData,
  edgeData,
}) {
  //console.log(nodeData, "col\n", edgeData);
  const children = React.useMemo(
    () => getChildren(nodeData, edgeData),
    [nodeData, edgeData]
  );
  const nodesElement = React.useMemo(
    () => generateNodes(nodeData, children),
    [nodeData, children]
  );
  const linkElements = React.useMemo(() => generatelink(children), [children]);
  return (
    <Elk
      nodes={nodesElement || []}
      links={linkElements || []}
      layout="layered"
      setIsEditTask={setIsEditTask}
    />
  );
}
