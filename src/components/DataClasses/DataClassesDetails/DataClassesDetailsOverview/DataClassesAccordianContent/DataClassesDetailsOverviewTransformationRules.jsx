import {
  Button,
  Column,
  ContentSwitcher,
  Switch,
} from "carbon-components-react";
import CustomDataTable from "components/Datatable";
import React, { useState } from "react";
import {
  AFForm,
  AFRadioButtonGroup,
  AFTextArea,
  AFTextField,
} from "sharedComponents/Form";

const DataClassesDetailsOverviewTransformationRules = () => {
  const [activeSwitch, setActiveSwitch] = useState("one");

  const handleSwitchChange = (selectedTab) => {
    setActiveSwitch(selectedTab.name);
  };
  const expressionInitialValue = {
    expression: "",
  };
  const matchingValues = [
    { id: 1, labelText: "Integer" },
    { id: 2, labelText: "Double" },
    { id: 3, labelText: "Float" },
    { id: 4, labelText: "Amount" },
    { id: 5, labelText: "Date" },
    { id: 6, labelText: "Datetime" },
    { id: 7, labelText: "Boolean" },
  ];

  const headers = [
    {
      key: "sourceValue",
      header: "Source Value",
    },
    {
      key: "targetValue",
      header: "Target Value",
    },
  ];
  const rows = [
    {
      id: "1",
      sourceValue: "M",
      targetValue: "Male",
    },
    {
      id: "2",
      sourceValue: "F",
      targetValue: "Female",
    },
  ];

  return (
    <div style={{ padding: "0px 15px" }}>
      <p style={{ fontSize: "12px", marginBottom: "8px", color: "#525252" }}>
        Rule Type
      </p>
      <ContentSwitcher
        onChange={handleSwitchChange}
        selectedIndex={0}
        style={{ marginBottom: "20px" }}
      >
        <Switch name="one" text="Expression" />
        <Switch name="two" text="Data Type Conversion" />
        <Switch name="three" text="Reference Mapping" />
        <Switch name="four" text="List Mapping" />
      </ContentSwitcher>
      {activeSwitch === "one" ? (
        <AFForm initialValues={expressionInitialValue}>
          <AFTextArea
            name={"expression"}
            label={"Expression"}
            enableCounter={false}
          />
        </AFForm>
      ) : activeSwitch === "two" ? (
        <AFForm>
          <AFRadioButtonGroup
            name="dataTypeConversion"
            label="Data Type Conversion"
            options={matchingValues}
            orientation={"horizontal"}
          />
        </AFForm>
      ) : activeSwitch === "three" ? (
        <AFForm initialValues={{ referenceData: "" }}>
          <AFTextField
            name={"referenceData"}
            label={"Reference Data"}
            placeHolder="Lookup Code"
            size={14}
          />
          <Column lg={2} style={{ paddingTop: "23px" }}>
            <Button size="md">Lookup Column</Button>
          </Column>
          <AFTextArea
            name={"expression"}
            label={"Expression"}
            enableCounter={false}
          />
        </AFForm>
      ) : (
        activeSwitch === "four" && (
          <div className="no-header">
            <CustomDataTable
              rows={[...rows].reverse()}
              headers={headers}
              tableHeading={"List Mapping"}
              shouldActionsRender={false}
              isSelectionEnable={false}
              shouldPaginationRender={false}
            />
          </div>
        )
      )}
    </div>
  );
};

export default DataClassesDetailsOverviewTransformationRules;
