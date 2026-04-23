import { CodeSnippet } from "carbon-components-react";
import React from "react";
import { jsonStringify } from "utils/jsonStringify";

const DataTargetSchemaJSON = ({ tableResourceSchema }) => {
  return (
    <>
      <style>
        {`
        .custom .cds--snippet-btn--expand.cds--btn.cds--btn--sm{
          display:none;
        }
        .custom .cds--snippet-container
        {
          min-height:440px !important;
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
          {JSON.stringify(jsonStringify(tableResourceSchema?.schema), null, 2)}
        </CodeSnippet>
      </div>
    </>
  );
};

export default DataTargetSchemaJSON;
