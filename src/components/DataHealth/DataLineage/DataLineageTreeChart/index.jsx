import React from "react";
import TreeChart from "./TreeChart";

const height = 40;
const width = 250;
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
const findMostRepeatingSourceNode = (data = []) => {
  const fromCounts = data?.reduce((counts, entry) => {
    const fromId = entry?.from;
    counts[fromId] = (counts[fromId] || 0) + 1;
    return counts;
  }, {});

  const mostRepeatingFromId = Object.keys(fromCounts).reduce((a, b) =>
    fromCounts[a] > fromCounts[b] ? a : b
  );
  const countOfMostRepeatingFromId = fromCounts[mostRepeatingFromId];

  return countOfMostRepeatingFromId;
};

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
        id: data[0]?.source,
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

const generatelink = (children) => {
  return children?.map((data) => ({
    id: `${data[0]?.id}`,
    from: `${data[0]?.source}`,
    to: `${data[0]?.target}`,
  }));
};

const generateLegendNodes = (nodeData) => {
  return nodeData?.map((data) => ({
    id: `${data?.id}`,
    height: height,
    width: width,
    data: {
      title: data?.tableNameX
        ? data?.tableNameX
        : data?.database
        ? data?.database
        : data?.uri
        ? data?.uri?.split("/").pop()
        : "- -",
      id: data?.id,
      type: typeArray[data?.dataLevelTypeId],
    },
  }));
};

const generateDataPackageNode = (dataPackage) => ({
  id: `dpkg-node`,
  height: height,
  width: width + 50,
  data: {
    title: dataPackage?.name,
    id: dataPackage?.id,
    type: "dataPackage",
  },
});
const generateDataPackageLinks = (nodes) => {
  return nodes?.map((data, index) => ({
    id: `${data?.id}-${index}-dpkg`,
    from: `dpkg-node`,
    to: `${data?.id}`,
  }));
};
const bucketEdge = {
  id: `1-bucketNode`,
  from: `bucketNode`,
  to: `dpkg-node`,
};
const bucketNode = {
  id: `bucketNode`,
  height: 56,
  width: 56,
  data: {
    id: "bucketNode",
  },
};

function DataLineageTreeChart({
  handleOpenLineageModal,
  nodeData = [],
  edgeData = [],
  hideDataPackageNode,
  currentDataPackage,
}) {
  const [selectedLegend, setSelectedLegend] = React.useState("");

  const children = React.useMemo(
    () => getChildren(nodeData, edgeData),
    [nodeData, edgeData]
  );
  const selectedLegendNodes = React.useMemo(() => {
    return nodeData?.filter(
      (data) => data?.dataLevelTypeId === selectedLegend?.id
    );
  }, [selectedLegend, nodeData]);
  const nodesElement = React.useMemo(
    () =>
      !selectedLegend
        ? generateNodes(nodeData, children)
        : generateLegendNodes(selectedLegendNodes),
    [nodeData, selectedLegendNodes, selectedLegend, children]
  );
  const dependsOnDatapackage = nodesElement?.filter(
    ({ data }) => data?.type === "raw"
  );
  const linkElements = React.useMemo(() => generatelink(children), [children]);

  const dataPackageNode = React.useMemo(
    () => generateDataPackageNode(currentDataPackage),
    [currentDataPackage]
  );
  const dataPackageLinks = React.useMemo(
    () => generateDataPackageLinks(dependsOnDatapackage),
    [dependsOnDatapackage]
  );
  const edgeCount = React.useMemo(
    () =>
      findMostRepeatingSourceNode([
        ...linkElements,
        ...dataPackageLinks,
        bucketEdge,
      ]),
    [dataPackageLinks, linkElements]
  );

  const treeChartNodes = selectedLegend
    ? nodesElement
    : !hideDataPackageNode
    ? [...(nodesElement || []), dataPackageNode]
    : [...(nodesElement || [])];

  const treeChartEdges = selectedLegend
    ? []
    : [...linkElements, ...dataPackageLinks, bucketEdge];
  return (
    <TreeChart
      nodeCount={
        selectedLegend ? treeChartNodes?.length : dataPackageLinks?.length
      }
      setSelectedLegend={setSelectedLegend}
      selectedLegend={selectedLegend}
      nodes={
        selectedLegend?.id === 0
          ? [dataPackageNode, bucketNode]
          : !selectedLegend
          ? [...treeChartNodes, bucketNode]
          : treeChartNodes
      }
      edges={
        selectedLegend?.id === 0
          ? [...treeChartEdges, bucketEdge]
          : treeChartEdges
      }
      edgesCount={edgeCount}
      handleOpenLineageModal={handleOpenLineageModal}
    />
  );
}

export default DataLineageTreeChart;
