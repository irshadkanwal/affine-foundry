import React from "react";
import { AFDropdown, AFForm, AFTextField } from "sharedComponents/Form";
import LabelContent from "../LabelContent";

function DataClassesDetailsOverviewGeneral() {
  const formInitialValues = {
    description: "",
    examples: "",
    "p-category": "",
    "s-category": "",
  };
  return (
    <AFForm initialValues={formInitialValues}>
      <AFTextField
        name="description"
        label={<LabelContent label={"Description"} />}
        size={8}
      />
      <AFTextField
        name="examples"
        label={<LabelContent label={"Examples"} />}
        size={8}
      />
      <AFTextField
        name="p-category"
        label={<LabelContent label={"Primary Category"} />}
        size={8}
      />
      <AFDropdown
        options={[]}
        name="s-category"
        label={<LabelContent label={"Secondary Category"} />}
        size={8}
      />
    </AFForm>
  );
}

export default DataClassesDetailsOverviewGeneral;
