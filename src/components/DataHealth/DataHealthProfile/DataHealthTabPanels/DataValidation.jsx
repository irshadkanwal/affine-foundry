import React from "react";
import { CodeSnippet } from "carbon-components-react";
import { jsonStringify } from "utils/jsonStringify";
const dataValidationJson = {
  id: "005",
  name: "Check that state city is 90%  populated",
  rule_type: "Completeness",
  level: "column",
  context: "Validation",
  category: "Completeness",
  parameter: "city",
  expression: " >=00.9",
};

function DataValidation() {
  return (
    <>
      <style>
        {`
        .custom .cds--snippet-btn--expand.cds--btn.cds--btn--sm{
          display:none;
        }
        .custom .cds--snippet-container
        {
          min-height:400px !important;
        }
        `}
      </style>
      <div style={{ marginTop: "5px" }} className="custom">
        <CodeSnippet
          type="multi"
          style={{
            backgroundColor: "#e0e0e0",
            overflow: "auto",
          }}
        >
          {JSON.stringify(jsonStringify(dataValidationJson), null, 2)}
        </CodeSnippet>
      </div>
    </>
  );
}

export default DataValidation;
