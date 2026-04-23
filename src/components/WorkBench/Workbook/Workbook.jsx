import React, { useState } from "react";
import WorkbookChartSection from "./WorkbookChartSection/WorkbookChart";
import WorkbookTabs from "./WorkbookTable/WorkbookTabs";
import Loading from "components/Loading";
import AddWorkbookFormModal from "./AddWorkbookFormModal";
import { useRuleWorkBook } from "hooks/ruleworkbook/useRuleWorkBook";
import { useRuleWorkBookDetail } from "hooks/ruleworkbook/useRuleWorkBookDetail";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { Button } from "@carbon/react";
import { AddAlt } from "@carbon/react/icons";
import "./workbook.scss";

const Workbook = () => {
  const [activeWorkbook, setActiveWorkbook] = useState();
  const [isAddWorkbookModalOpen, setIsAddWorkbookModalOpen] = useState(false);

  const { data: dataPackages } = useDataPackage();
  const { data: ruleWorkbookData, isLoading } = useRuleWorkBook();
  const { data: activeWorkbookDetail } = useRuleWorkBookDetail(
    activeWorkbook?.id
  );

  React.useEffect(() => {
    if (ruleWorkbookData?.length > 0) {
      setActiveWorkbook(ruleWorkbookData[0]);
    }
  }, [ruleWorkbookData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="workbook_main_container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Workbooks</h3>
        <Button
          kind="tertiary"
          renderIcon={AddAlt}
          onClick={() => setIsAddWorkbookModalOpen(true)}
        >
          Add New Workbook
        </Button>
      </div>
      <WorkbookChartSection
        workbooks={ruleWorkbookData || []}
        setActiveWorkbook={setActiveWorkbook}
        activeWorkbook={activeWorkbook}
      />
      <WorkbookTabs
        runHistoryData={activeWorkbookDetail}
        errorsData={[]}
        activeWorkbook={activeWorkbook}
      />

      {isAddWorkbookModalOpen && (
        <AddWorkbookFormModal
          setIsAddWorkbookModalOpen={setIsAddWorkbookModalOpen}
          isAddWorkbookModalOpen={isAddWorkbookModalOpen}
          dataPackages={dataPackages}
        />
      )}
    </div>
  );
};

export default Workbook;
