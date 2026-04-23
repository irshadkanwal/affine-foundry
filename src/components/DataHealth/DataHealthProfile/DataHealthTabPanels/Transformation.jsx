import React from "react";
import { CodeSnippet } from "carbon-components-react";
import { jsonStringify } from "utils/jsonStringify";
const transformationData = {
  rule_type: "transformation",
  rule_id: "enc_0004",
  rule_name: "encounter to OMOP Concept",
  rule_step: 4,
  rule_action: "lookup",
  rule_target: "column",
  object_locator: {
    schema_name: "%",
    table_name: "%",
    column_name: "code",
  },
  lookup: {
    lookup_id: "CO-025-snomed",
    lookup_column: "sm_code",
    operator: "eq| == | =",
    return_columns: [
      "cast(omop_sm_concept_id as int) as enounter_source_concept_id",
      "domain_id as enounter_source_domain_id",
    ],
  },
};
function Transformation() {
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
          {JSON.stringify(jsonStringify(transformationData), null, 2)}
        </CodeSnippet>
      </div>
    </>
  );
}

export default Transformation;
