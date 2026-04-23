import React from "react";
import { TileGroup, RadioTile } from "carbon-components-react";
const data = [
  { id: "1", text: "No automatic matching" },
  { id: "2", text: "Match to list of valid values" },
  { id: "3", text: "Match to reference data" },
  { id: "4", text: "Match to criteria in regular expression" },
  { id: "5", text: "Match to criteria in deployed Java class" },
  { id: "6", text: "Column Name matching" },
];

function DataMatchingModalTiles({ setSelectedTile, selectedTile }) {
  return (
    <div>
      <h4
        style={{
          margin: "40px 0 20px",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Matching method
      </h4>
      <p style={{ fontSize: "14px" }}>
        Choose now to specify marching criteria. Most methods include data and
        column matching criteria.
      </p>
      <TileGroup
        defaultSelected={
          data?.find((value) => value?.id === selectedTile)?.text || ""
        }
        name="radio tile group"
        onChange={(value, name, event) => setSelectedTile(event.target.id)}
      >
        {data.map((data) => (
          <RadioTile
            key={data.id}
            id={data.id}
            value={data.text}
            style={{
              backgroundColor: "#e1ded6",
              height: "100px",
              fontSize: "12px",
            }}
          >
            {data.text}
          </RadioTile>
        ))}
      </TileGroup>
    </div>
  );
}

export default DataMatchingModalTiles;
