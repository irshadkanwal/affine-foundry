import { CodeSnippet } from "carbon-components-react";
import React from "react";

const DataResourceSchemaJSON = ({
  selectedDataResourceName,
  selectedDataResourceId,
}) => {
  return (
    <div style={{}}>
      <CodeSnippet
        style={{ width: "100%", background: "grey" }}
        type="single"
      ></CodeSnippet>
    </div>
  );
};

export default DataResourceSchemaJSON;
