import React from "react";
import { Column, Button } from "carbon-components-react";
import {
  AFDropdown,
  AFForm,
  AFNumberInput,
  AFTextField,
} from "sharedComponents/Form";

function MatchToReferenceData() {
  const formInitialValues = {
    columnName: "",
    sampleColumnName: "",
    referenceData: "",
    type: "",
    minLength: 0,
    maxLength: 100,
  };
  return (
    <>
      <h4
        style={{
          margin: "40px 0 20px",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Match to reference data
      </h4>
      <AFForm initialValues={formInitialValues}>
        <AFTextField
          name={"columnName"}
          label={"Column name criteria "}
          size={16}
        />
        <AFTextField
          name={"sampleColumnName"}
          label={"Sample column name"}
          size={16}
        />
        <AFTextField
          name={"referenceData"}
          label={"Reference Data"}
          placeHolder="Lookup Code"
          size={12}
        />
        <Column lg={2} style={{ paddingTop: "23px" }}>
          <Button size="md">Lookup Column</Button>
        </Column>

        <AFDropdown name="type" label={"Column data Type"} options={[]} />
        <AFNumberInput
          name="minLength"
          label="Minimum Length of value"
          size={8}
        />
        <AFNumberInput
          name="maxLength"
          label="Maximum Length of value"
          size={8}
        />
      </AFForm>
    </>
  );
}
export default MatchToReferenceData;
