import React from "react";
import { AFForm, AFTextField } from "sharedComponents/Form";
import LabelContent from "./LabelContent";

function DataClassesDetailsOverviewGeneral() {
  return (
    <AFForm>
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
      <AFTextField
        name="s-category"
        label={<LabelContent label={"Secondry Category"} />}
        size={8}
      />
    </AFForm>
  );
}

export default DataClassesDetailsOverviewGeneral;
