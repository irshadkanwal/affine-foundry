import React from "react";
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";
import CustomDataTable from "components/Datatable";

function DataConstraints({ setIsDataConstaintsOpen, profileSuggestionsData }) {
  const HEADERS = [
    {
      key: "constraintDescription",
      header: "Constraint Description",
    },
    {
      key: "constraintRule",
      header: "Constraint Rule",
    },
  ];
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem
          onClick={() => {
            setIsDataConstaintsOpen(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Data Health
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            setIsDataConstaintsOpen(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Profiles
        </BreadcrumbItem>
        <p>Data Constraints</p>
      </Breadcrumb>
      <CustomDataTable
        rows={profileSuggestionsData}
        headers={HEADERS}
        tableHeading="Profile Detail Suggestions"
        shouldActionsRender={false}
        isSelectionEnable={false}
      />
    </div>
  );
}

export default DataConstraints;
