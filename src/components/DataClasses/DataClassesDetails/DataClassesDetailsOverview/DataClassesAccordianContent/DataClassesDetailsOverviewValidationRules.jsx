import React from "react";
import {
  AFForm,
  AFNumberInput,
  AFRadioButtonGroup,
  AFTextField,
} from "sharedComponents/Form";
const accuracy = [
  { id: 1, labelText: "0-25" },
  { id: 2, labelText: "25-50" },
  { id: 3, labelText: "50-75" },
  { id: 4, labelText: "75-100" },
];
const matchingValues = [
  { id: 1, labelText: "List" },
  { id: 2, labelText: "Lookup" },
];
const DataClassesDetailsOverviewValidationRules = () => {
  const initialFormValues = {
    completenessThreshold: 100,
    // accuracy: "",
    // matchingValues: "",
    dataTypeThreshold: 100,
    dataLength: "",
    duplicateCount: "",
  };
  return (
    <AFForm initialValues={initialFormValues}>
      <AFNumberInput
        name="completenessThreshold"
        label="Completeness threshold"
        size={8}
      />
      <AFRadioButtonGroup
        name="accuracy"
        label="Accuracy"
        options={accuracy}
        orientation={"horizontal"}
        size={8}
      />
      <AFRadioButtonGroup
        name="matchingValues"
        label="Matching values"
        options={matchingValues}
        orientation={"horizontal"}
        size={8}
      />
      <AFNumberInput
        name="dataTypeThreshold"
        label="Data Type threshold"
        size={8}
      />
      <AFTextField name="dataLength" label="Data Length" size={8} />
      <AFTextField name="duplicateCount" label="Duplicate Count" size={8} />
    </AFForm>
  );
};

export default DataClassesDetailsOverviewValidationRules;
