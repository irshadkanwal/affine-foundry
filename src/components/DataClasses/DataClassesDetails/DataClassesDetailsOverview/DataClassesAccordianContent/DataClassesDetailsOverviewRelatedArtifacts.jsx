import React from "react";
import { AFForm, AFTextField } from "sharedComponents/Form";
import LabelContent from "../LabelContent";

function DataClassesDetailsOverviewRelatedArtifacts() {
  const formInitialValues = {
    classification: "",
    business: "",
  };
  return (
    <>
      <p style={{ padding: "0 17px 25px", fontSize: "14px" }}>
        When a data class is assigned to a column. these classifications and
        business terms are suggested to be assigned.
      </p>
      <AFForm initialValues={formInitialValues}>
        <AFTextField
          name="classification"
          label={<LabelContent label={"Classification"} />}
          size={8}
        />
        <AFTextField
          name="business"
          label={<LabelContent label={"Business Terms"} />}
          size={8}
        />
      </AFForm>
    </>
  );
}

export default DataClassesDetailsOverviewRelatedArtifacts;
