export const getEgdesandNodes = (dataLineage, dataLineageByResourceId) => {
  const sourceList = dataLineageByResourceId?.edgeData?.map(
    (data) => data?.source
  );
  const targetList = dataLineageByResourceId?.edgeData?.map(
    (data) => data?.target
  );
  const filteredSources = sourceList?.flatMap((id) => {
    return dataLineage?.nodeData?.filter((data) => data?.id === id);
  });
  const filteredSourcesDependsOn = filteredSources?.flatMap((filter) => {
    return dataLineage?.nodeData?.filter(
      (node) => node?.id === +filter.dependsOn
    );
  });

  const filteredTarget = targetList?.flatMap((id) => {
    return dataLineage?.nodeData?.filter((data) => data?.id === id);
  });
  const filteredNodesData = [
    ...new Set([
      ...(filteredTarget || []),
      ...(filteredSources || []),
      ...(filteredSourcesDependsOn || []),
    ]),
  ];
  /* eslint-disable */
  const filteredEdgesData = filteredNodesData
    ?.map((node, index) => {
      if (node?.dependsOn !== "")
        return {
          id: index,
          source: node?.dependsOn,
          target: node?.id,
        };
    })
    ?.filter((edge) => !!edge);
  return {
    filteredNodesData: filteredNodesData,
    filteredEdgesData: filteredEdgesData,
  };
};
