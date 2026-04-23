import React from "react";
import { Button, Column } from "carbon-components-react";
import {
  AFDropdown,
  AFForm,
  AFTextArea,
  AFTextField,
} from "sharedComponents/Form";
import { TRIGGER_OPTIONS } from "constants";

function TransformDetailsOverview() {
  return (
    <div style={{ paddingTop: "25px" }}>
      <AFForm>
        <AFTextField name="name" label="Task Name" size={16} />
        <AFTextArea name="name" label="Task Name" size={16} />
        <AFDropdown
          options={TRIGGER_OPTIONS}
          name="data-package"
          placeHolder="Choose Data Package"
          label={"Data Package"}
          size={16}
        />
        <Column lg={16} md={16} sm={16}>
          <Button style={{ width: "100%" }}>Save</Button>
        </Column>
      </AFForm>
    </div>
  );
}

export default TransformDetailsOverview;
