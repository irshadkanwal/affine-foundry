import React from "react";
import {
  Modal,
  ProgressIndicator,
  ProgressStep,
} from "carbon-components-react";
import DataMatchingModalContent from "./DataMatchingModalContent";

function DataMatchingModal({
  isDataMatchingModalOpen,
  setIsDataMatchingModalOpen,
}) {
  const [current, setCurrent] = React.useState(0);
  const [selectedTile, setSelectedTile] = React.useState();

  return (
    <Modal
      open={isDataMatchingModalOpen}
      modalHeading={"Data Matching "}
      primaryButtonText="Next"
      primaryButtonDisabled={!selectedTile}
      onSecondarySubmit={() => setCurrent((preState) => preState - 1)}
      secondaryButtonText={current ? "Back" : ""}
      onRequestSubmit={() =>
        current < 2 ? setCurrent((preState) => preState + 1) : () => {}
      }
      onRequestClose={() => setIsDataMatchingModalOpen(false)}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
      size="md"
    >
      <div style={{ height: "400px" }}>
        <ProgressIndicator spaceEqually={true} currentIndex={current}>
          <ProgressStep label="Select matching method" />
          <ProgressStep label="Define data matching" />

          <ProgressStep label="Other matching criteria" />
        </ProgressIndicator>
        <>
          <DataMatchingModalContent
            current={current}
            selectedTile={selectedTile}
            setSelectedTile={setSelectedTile}
          />
        </>
      </div>
    </Modal>
  );
}

export default DataMatchingModal;
