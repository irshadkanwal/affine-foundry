import React from "react";
import {
  AFDropdown,
  AFForm,
  AFNumberInput,
  AFTextField,
} from "sharedComponents/Form";

function MatchToCriteriaInRegex() {
  const formInitialValues = {
    columnName: "",
    sampleColumnName: "",
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
        Match to criteria in regular expression
      </h4>
      <AFForm initialValues={formInitialValues}>
        <AFTextField
          name={"columnName"}
          label={"Column name match criteria"}
          size={16}
        />
        <AFTextField
          name={"sampleColumnName"}
          label={"Sample column names"}
          size={16}
        />

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
export default MatchToCriteriaInRegex;
