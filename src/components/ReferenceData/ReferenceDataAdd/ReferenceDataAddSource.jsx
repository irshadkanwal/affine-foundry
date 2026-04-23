import React from "react";
import {
  Checkbox,
  TextInput,
  Dropdown,
  TextArea,
  CheckboxGroup,
} from "@carbon/react";

function ReferenceDataAddSource() {
  const items = [{ text: "Item 1" }, { text: "Item 1" }];
  return (
    <>
      <form>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ width: "50%" }}>
            <Dropdown
              id="data_format"
              titleText="Data Format"
              label="Choose an option"
              items={items}
              itemToString={(item) => (item ? item.text : "")}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Dropdown
              id="source_type"
              titleText="Source Type"
              label="Database"
              items={items}
              itemToString={(item) => (item ? item.text : "")}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <div style={{ width: "50%" }}>
            <TextInput
              style={{ background: "#E8E9EB" }}
              id="delimiter"
              invalidText="A valid value is required"
              labelText="Delimiter"
              // onChange={handleNameChange}
              // invalid={!dataBucketName ? true : false}
            />
          </div>
          <div style={{ width: "50%" }}>
            <TextInput
              style={{ background: "#E8E9EB" }}
              id="conn_string"
              invalidText="A valid value is required"
              labelText="Connection String"
              // onChange={handleNameChange}
              // invalid={!dataBucketName ? true : false}
            />
          </div>
        </div>
        <TextArea
          style={{ background: "#E8E9EB" }}
          id="description"
          invalidText="A valid value is required"
          labelText="Description"
          placeholder="description"
          maxCount={255}
          maxLength={255}
          // onChange={handleARNChange}
          // invalid={!arn ? true : false}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div style={{ width: "50%" }}>
            <CheckboxGroup title="Auto Profile">
              <legend className="cds--label">Continue If SQL fail</legend>
              <Checkbox labelText={`Yes`} id="checkbox-label-1" />
            </CheckboxGroup>
          </div>
          <CheckboxGroup labelText="Archive">
            <legend className="cds--label">Enable Caching</legend>
            <Checkbox labelText={`Yes`} id="checkbox-label-1" />
          </CheckboxGroup>
        </div>
      </form>
    </>
  );
}

export default ReferenceDataAddSource;
