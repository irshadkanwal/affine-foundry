import React from "react";
import DataMatchingModalTiles from "./DataMatchingModalTiles";
import DataMatchingModalDefineMatching from "./DataMatchingModalDefineMatching";

function DataMatchingModalContent({ current, selectedTile, setSelectedTile }) {
  return (
    <>
      {current === 0 ? (
        <DataMatchingModalTiles
          setSelectedTile={setSelectedTile}
          selectedTile={selectedTile}
        />
      ) : current === 1 ? (
        <DataMatchingModalDefineMatching selectedTile={selectedTile} />
      ) : (
        <div></div>
      )}
    </>
  );
}

export default DataMatchingModalContent;
