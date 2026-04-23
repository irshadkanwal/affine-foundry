import React from "react";
import { AFDropdown, AFForm, AFTextField } from "sharedComponents/Form";
import LabelContent from "../LabelContent";
import CustomDataTable from "components/Datatable";
const headers = [
  {
    key: "code",
    header: "Code",
  },
  {
    key: "value",
    header: "Value",
  },
  {
    key: "description",
    header: "Description",
  },
];
const rows = [
  {
    id: "1",
    code: "10",
    value: "10",
    description: "IPV",
  },
  {
    id: "2",
    code: "114",
    value: "114",
    description: "",
  },
  {
    id: "3",
    code: "115",
    value: "115",
    description: "",
  },
  {
    id: "4",
    code: "116",
    value: "116",
    description: "Tdap",
  },
];
function DataClassesDetailsOverviewDataMatching({
  setIsDataMatchingModalOpen,
}) {
  const formInitialValues = {
    parent: "",
    dependent: "",
    "matching-method": "",
  };
  const renderTable = true;
  return (
    <div
      style={{
        display: "flex",
        width: renderTable ? "99%" : "100%",
        paddingBottom: "10px",
      }}
    >
      <div style={{ width: renderTable ? "50%" : "100%" }}>
        <AFForm initialValues={formInitialValues}>
          <AFDropdown
            name="parent"
            label={<LabelContent label={"Parent Data Class"} />}
            size={16}
            options={[]}
          />
          <AFTextField
            name="dependent"
            label={<LabelContent label={"Dependent Data Class"} />}
            size={16}
          />
          <AFTextField
            name="matching-method"
            label={
              <LabelContent
                label={"Matching method"}
                onClick={setIsDataMatchingModalOpen}
                showIcon={true}
              />
            }
          />
        </AFForm>
      </div>
      {renderTable && (
        <>
          <div style={{ width: "50%" }} className="no-header">
            <CustomDataTable
              rows={[...rows].reverse()}
              headers={headers}
              tableHeading="Details of matching method"
              shouldActionsRender={false}
              isSelectionEnable={false}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DataClassesDetailsOverviewDataMatching;
