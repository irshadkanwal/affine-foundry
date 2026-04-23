import React from "react";
import { CodeSnippet } from "carbon-components-react";

function TransormDetailsRulesCodeView() {
  return (
    <div style={{ background: "white" }}>
      <style>
        {`
            .cds--snippet--multi {
                max-width: 100%;
            }
            `}
      </style>
      <CodeSnippet
        type="multi"
        style={{ background: "white" }}
        feedback="Copied to clipboard"
      >
        {`  {
    "resourceSchema": {
        "tableSchema": [
            {
            "lookahead": "",
            "tableName": "cclf7_part_d_file",
            "includeLookahead": false,
            "version":"",
            "columns": [
                {
                    "position": 1,
                    "length": 13,
                    "source_name": "CUR_CLM_UNIQ_ID",
                    "target_name": "",
                    "title":"",
                    "description":"",
                    "dataType": "string"
                },
                {
                    "position": 2,
                    "length": 11,
                    "name": "BENE_MBI_ID",
                    "dataType": "string"
                },
                {
                    "position": 3,
       `}
      </CodeSnippet>
    </div>
  );
}

export default TransormDetailsRulesCodeView;
