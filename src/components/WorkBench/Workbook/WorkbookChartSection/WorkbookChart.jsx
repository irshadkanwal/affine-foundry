import React, { useEffect, useState } from "react";
import { Button } from "@carbon/react";
import WorkbookChart from "../WorbookTreeChart";
import Loading from "components/Loading";
import WorkbookLeftColumn from "../WorkbookTable/WorkbookLeftColumn";
import AddNewNodeForm from "./AddNewNodeForm";
import { AddAlt, Play } from "@carbon/react/icons";
import { useRuleWorkBookDetail } from "hooks/ruleworkbook/useRuleWorkBookDetail";
import { useCreateWorkbookDetail } from "hooks/ruleworkbook/useCreateWorkbookDetail";

const WorkbookChartSection = ({
  workbooks,
  setActiveWorkbook,
  activeWorkbook,
}) => {
  const [isSideNavExpanded, setIsSideNavExpanded] = React.useState(false);
  const { data: activeWorkbookDetail, isLoadingDetail } = useRuleWorkBookDetail(
    activeWorkbook?.id
  );
  const { mutate: createWorkbookDetail } = useCreateWorkbookDetail();
  const [edgeNodeData, setEdgeNodeData] = useState([]);

  const onClickSideNavExpand = (e) => {
    setIsSideNavExpanded(!isSideNavExpanded);
    e.stopPropagation();
  };

  const mapToEdgeNodeData = (data) => {
    const bandMap = data.reduce((acc, node) => {
      if (!acc[node.executionBand]) acc[node.executionBand] = [];
      acc[node.executionBand].push(node.id);
      return acc;
    }, {});

    const edges = [];

    const sortedBands = Object.keys(bandMap)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 0; i < sortedBands.length - 1; i++) {
      const currentBandNodes = bandMap[sortedBands[i]];
      const nextBandNodes = bandMap[sortedBands[i + 1]];

      currentBandNodes.forEach((sourceId) => {
        nextBandNodes.forEach((targetId) => {
          edges.push({
            id: `edge-${sourceId}-${targetId}`,
            source: String(sourceId),
            target: String(targetId),
          });
        });
      });
    }

    return edges;
  };

  useEffect(() => {
    if (
      activeWorkbookDetail &&
      Array.isArray(activeWorkbookDetail) &&
      activeWorkbookDetail.length > 0
    ) {
      const mappedData = mapToEdgeNodeData(activeWorkbookDetail);
      setEdgeNodeData(mappedData);
    }
  }, [activeWorkbookDetail]);

  if (isLoadingDetail) {
    return <Loading />;
  }
  const handleSubmit = (data) => {
    if (data.ruleType === 1 && typeof data.ruleData === "string") {
      try {
        data.ruleData = JSON.parse(data.ruleData);
      } catch (error) {
        console.error("Invalid JSON in ruleData:", error);
      }
    }
    createWorkbookDetail({ data });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "20%" }}>
        <WorkbookLeftColumn
          columnData={workbooks}
          setActiveWorkbook={setActiveWorkbook}
          activeWorkbook={activeWorkbook}
        />
      </div>
      <div className="workbook_chart_container">
        <div className="buttons_container">
          <div>
            <Button
              kind="tertiary"
              renderIcon={AddAlt}
              onClick={(event) => onClickSideNavExpand(event)}
            >
              Add New
            </Button>
          </div>
          <div>
            <Button renderIcon={Play}>Deliver</Button>
          </div>
        </div>

        {isSideNavExpanded && (
          <>
            <div className="modalBackdrop" onClick={onClickSideNavExpand} />

            <AddNewNodeForm
              onClickSideNavExpand={onClickSideNavExpand}
              setIsSideNavExpanded={setIsSideNavExpanded}
              onSubmit={handleSubmit}
            />
          </>
        )}

        <div>
          <WorkbookChart
            dataPackages={workbooks}
            nodeData={activeWorkbookDetail}
            edgeData={edgeNodeData}
            activeWorkbook={activeWorkbook}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkbookChartSection;
