import React from "react";
import { AFForm, AFTextField } from "sharedComponents/Form";
import LabelContent from "./LabelContent";

function DataClassesDetailsOverviewDataMatching({
  setIsDataMatchingModalOpen,
}) {
  return (
    <AFForm>
      <AFTextField
        name="parent"
        label={<LabelContent label={"Parent Data Class"} />}
        size={8}
      />
      <AFTextField
        name="dependent"
        label={<LabelContent label={"Dependent Data Class"} />}
        size={8}
      />
      <AFTextField
        name="matching-method"
        label={
          <LabelContent
            label={"Matching method"}
            onClick={setIsDataMatchingModalOpen}
          />
        }
      />
    </AFForm>
  );
}

export default DataClassesDetailsOverviewDataMatching;
