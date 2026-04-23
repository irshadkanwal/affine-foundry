import React from "react";
import { Dropdown } from "carbon-components-react";
import CustomDataTable from "../../Datatable";

const dropdownListOptions = {
  status: ["Fail", "Pass"],
  context: ["Validation", "Verification"],
  category: ["Completeness", "Conformance", "Plausibility"],
  subcategory: [
    "Atemporal",
    "Computational",
    "None",
    "Relational",
    "Temporal",
    "Value",
  ],
  level: ["Concept", "Field", "Table", "Column"],
};

export const DataQualityDashboardResults = ({ dataQualityData }) => {
  const rowData = React.useMemo(() => {
    return dataQualityData?.details?.map((data) => ({
      ...data,
      id: data?.detailKey,
      descriptionShort:
        data?.description.split(" ")?.length > 8
          ? `${data?.description.split(" ").slice(0, 7).join(" ")} ...`
          : data.description,
    }));
  }, [dataQualityData]);

  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const headers = [
    {
      header: "STATUS",
      key: "status",
      dropdown: (
        <div style={{ width: "70%", padding: "10px 0" }}>
          <Dropdown
            size="sm"
            label="Choose"
            id="dropdown-1"
            onChange={({ selectedItem }) => {
              setSelectedFilter((preState) => {
                return {
                  ...preState,
                  status: selectedItem,
                };
              });
            }}
            items={dropdownListOptions.status}
          />
        </div>
      ),
    },
    {
      header: "CONTEXT",
      key: "context",
      dropdown: (
        <div style={{ width: "85%", padding: "10px 0" }}>
          <Dropdown
            size="sm"
            label="Choose"
            id="dropdown-2"
            onChange={({ selectedItem }) => {
              setSelectedFilter((preState) => {
                return {
                  ...preState,
                  context: selectedItem,
                };
              });
            }}
            items={dropdownListOptions.context}
          />
        </div>
      ),
    },
    {
      header: "CATEGORY",
      key: "category",
      dropdown: (
        <div style={{ width: "85%", padding: "10px 0" }}>
          <Dropdown
            size="sm"
            label="Choose"
            id="dropdown-3"
            onChange={({ selectedItem }) => {
              setSelectedFilter((preState) => {
                return {
                  ...preState,
                  category: selectedItem,
                };
              });
            }}
            items={dropdownListOptions.category}
          />
        </div>
      ),
    },
    {
      header: "SUBCATEGORY",
      key: "subCategory",
      dropdown: (
        <div style={{ width: "90%", padding: "10px 0" }}>
          <Dropdown
            size="sm"
            label="Choose"
            id="dropdown-4"
            onChange={({ selectedItem }) => {
              setSelectedFilter((preState) => {
                return {
                  ...preState,
                  subcategory: selectedItem,
                };
              });
            }}
            items={dropdownListOptions.subcategory}
          />
        </div>
      ),
    },
    {
      header: "LEVEL",
      key: "level",
      dropdown: (
        <div style={{ width: "70%", padding: "10px 0" }}>
          <Dropdown
            size="sm"
            label="Choose"
            onChange={({ selectedItem }) => {
              setSelectedFilter((preState) => {
                return {
                  ...preState,
                  level: selectedItem,
                };
              });
            }}
            id="dropdown-5"
            items={dropdownListOptions.level}
          />
        </div>
      ),
    },
    {
      header: "DESCRIPTION",
      key: "descriptionShort",
      dropdown: <div style={{ paddingBottom: "50px" }}></div>,
    },
    {
      header: <h6>% RECORDS</h6>,
      key: "record",
      dropdown: <div style={{ paddingBottom: "50px" }}></div>,
    },
  ];

  const filteredRows = React.useMemo(() => {
    let filtered = rowData;
    selectedFilter?.status &&
      (filtered = filtered?.filter(
        (rowValue) =>
          rowValue?.status?.toLowerCase() ===
          selectedFilter?.status?.toLowerCase()
      ));

    selectedFilter?.context &&
      (filtered = filtered?.filter(
        (value) =>
          value?.context?.toLowerCase() ===
          selectedFilter?.context?.toLowerCase()
      ));
    selectedFilter?.category &&
      (filtered = filtered?.filter(
        (value) =>
          value?.category?.toLowerCase() ===
          selectedFilter?.category?.toLowerCase()
      ));
    selectedFilter?.subcategory &&
      (filtered = filtered?.filter(
        (value) =>
          value?.subCategory?.toLowerCase() ===
          selectedFilter?.subcategory?.toLowerCase()
      ));
    selectedFilter?.level &&
      (filtered = filtered?.filter(
        (value) =>
          value?.level?.toLowerCase() === selectedFilter?.level?.toLowerCase()
      ));
    return filtered;
  }, [
    rowData,
    selectedFilter?.category,
    selectedFilter?.context,
    selectedFilter?.level,
    selectedFilter?.status,
    selectedFilter?.subcategory,
  ]);

  return (
    <div className="results_main" style={{ paddingTop: "-20" }}>
      <CustomDataTable
        isExpandableRowEnable={true}
        shouldActionsRender={false}
        shouldTableBatchActionsRender={false}
        rows={filteredRows || []}
        headers={headers}
      />
    </div>
  );
};
