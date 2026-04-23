import React from "react";
import { Column, Toggle } from "@carbon/react";
import { AFDropdown, AFForm, AFRadioButtonGroup } from "sharedComponents/Form";

function Settings() {
  const items = [
    { id: 1, labelText: "Radio button label", label: "Item 1" },
    { id: 2, labelText: "Radio button label", label: "Item 2" },
  ];
  return (
    <>
      <h3 style={{ padding: "20px" }}>Settings</h3>
      <AFForm>
        <AFDropdown name="dataBase" label="Default Database" options={items} />
        <AFRadioButtonGroup
          name="radio"
          label="Group label"
          options={items}
          orientation="vertical"
          size={16}
        />
        <Column lg={16} sm={16} md={16}>
          <Toggle
            labelText="Toggle label"
            labelA="OFF"
            labelB="ON"
            defaultToggled
            id="toggle-1"
          />
        </Column>
      </AFForm>
    </>
  );
}

export default Settings;
