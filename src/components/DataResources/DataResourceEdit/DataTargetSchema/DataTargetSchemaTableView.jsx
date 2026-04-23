import React from "react";
import CustomDataTable from "../../../Datatable";
import { jsonStringify } from "utils/jsonStringify";

const headerData = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "type",
    header: "Type",
  },
];

const DataTargetSchemaTableView = ({ tableResourceSchema }) => {
  /*eslint-disable*/
  const [selectedSchemaId, setSelectedSchemaId] = React.useState();
  /*eslint-enable*/

  // const tableNameOptions = tableResourceSchema?.map((resource) => ({
  //   label: resource?.tableNameX,
  //   value: resource.id,
  // }));
  const showData = tableResourceSchema?.filter(
    (data) => data.id === selectedSchemaId
  );

  const targetSchema = jsonStringify(tableResourceSchema[0]?.schema);

  const targetSchemaTableViewData = targetSchema?.fields?.map(
    (value, index) => {
      return {
        id: index,
        name: value?.name,
        type: typeof value?.type !== "string" ? value?.type?.[0] : value?.type,
      };
    }
  );
  return (
    <>
      <style>
        {`.noheader .cds--data-table-header {
          padding: 10px;
        }
        .noheader .cds--table-toolbar {
          min-height: 0;
      }`}
      </style>
      <div className="noheader">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <AFDropdown name="tableName" label="Table Name" options /> */}
        </div>
        <div style={{ margin: "20px 0 0 0" }}>
          <span>
            Has Lookup Ahead:
            {!selectedSchemaId
              ? "- -"
              : showData[0]?.hasLookAhead
              ? "Yes"
              : "No"}
          </span>
          <span style={{ marginLeft: "10%" }}>Lookup Ahead: - -</span>
          <span style={{ marginLeft: "10%" }}>
            Schema Version:
            {!selectedSchemaId ? "- -" : showData[0]?.version}
          </span>
        </div>

        <CustomDataTable
          isSelectionEnable={false}
          headers={headerData}
          rows={targetSchemaTableViewData}
          shouldTableBatchActionsRender={false}
          shouldAddNewButton={false}
          shouldActionsRender={false}
        />
      </div>
    </>
  );
};

export default DataTargetSchemaTableView;
