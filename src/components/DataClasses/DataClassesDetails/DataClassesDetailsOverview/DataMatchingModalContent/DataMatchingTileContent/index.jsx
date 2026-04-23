import React from "react";
import MatchToListOfValidValues from "./MatchToListOfValidValues";
import MatchToReferenceData from "./MatchToReferenceData";
import MatchToCriteriaInRegex from "./MatchToCriteriaInRegex";
import MatchingToColumnName from "./MatchingToColumnName";

function DataMatchingTileContent({ selectedTile }) {
  return (
    <>
      {selectedTile === "1" ? (
        <div> 1 No automatic matching</div>
      ) : selectedTile === "2" ? (
        <MatchToListOfValidValues />
      ) : selectedTile === "3" ? (
        <MatchToReferenceData />
      ) : selectedTile === "4" ? (
        <MatchToCriteriaInRegex />
      ) : selectedTile === "5" ? (
        <div>5Match to criteria in deployed Java class</div>
      ) : selectedTile === "6" ? (
        <MatchingToColumnName />
      ) : (
        <div>Invalid Tile Selection</div>
      )}
    </>
  );
}

export default DataMatchingTileContent;
