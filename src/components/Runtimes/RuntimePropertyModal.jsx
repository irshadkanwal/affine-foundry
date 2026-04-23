import React from "react";
import { Loading, Modal } from "@carbon/react";
import AddNewProperty from "./AddNewProperty";
import EditPropertyModal from "./EditPropertyModal";
import CustomDataTable from "../Datatable";
import { useRuntimeProps } from "hooks/runtime/useRuntimeProps";
import { formatDateTime } from "utils/formatDateTime";

const headerData = [
  {
    key: "key",
    header: "Key",
  },
  {
    key: "value",
    header: "Value",
  },
];

function RuntimePropertyModal({
  selectedData,
  isListView,
  isPropertiesModalOpen,
  setisPropertiesModalOpen,
}) {
  const { data: runtimeProperties = [], isLoading: isRuntimePropLoading } =
    useRuntimeProps(selectedData?.id);

  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = React.useState();
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] =
    React.useState();
  const [selectedRow, setSelectedRow] = React.useState();

  const [runtimePropertiesById, setruntimePropertiesById] = React.useState([]);

  React.useEffect(() => {
    const filteredRuntimeProps = runtimeProperties?.filter(
      (runtime) => runtime.runtimeId === selectedData?.id
    );
    setruntimePropertiesById(filteredRuntimeProps);
  }, [runtimeProperties, selectedData]);

  const selectedRowData = isListView
    ? selectedData
    : selectedData?.cells.reduce((acc, value) => {
        const objectKey = value.id.split(":");
        return { ...acc, [objectKey[1]]: value.value, id: selectedData.id };
      }, {});
  return (
    <Modal
      open={isPropertiesModalOpen}
      modalHeading="Runtime Properties"
      primaryButtonText="New Property"
      onRequestClose={() => setisPropertiesModalOpen(false)}
      passiveModal
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <div style={{ height: "600px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px", paddingBottom: "5px" }}>
                Start Time
              </p>
              <p style={{ fontSize: "14px" }}>
                {selectedRowData?.startTime
                  ? formatDateTime(selectedRowData?.startTime)
                  : "- -"}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px", paddingBottom: "5px" }}>
                Terminated Time
              </p>
              <p style={{ fontSize: "14px" }}>
                {selectedRowData?.startTime
                  ? formatDateTime(selectedRowData?.startTime)
                  : "- -"}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px", paddingBottom: "5px" }}>Host URL</p>
              <p style={{ fontSize: "14px" }}>{selectedRowData?.hostUrl}</p>
            </div>
          </div>
        </div>
        {isRuntimePropLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "150px",
              alignItems: "center",
            }}
          >
            <Loading withOverlay={false} />
          </div>
        ) : (
          <CustomDataTable
            tableHeading="Properties"
            headers={headerData}
            rows={runtimePropertiesById}
            shouldDeleteButtonRender={false}
            isSelectionEnable={false}
            shouldTableBatchActionsRender={true}
            buttonText="New Property +"
            openEditModal={setIsEditPropertyModalOpen}
            openAddModal={setIsAddPropertyModalOpen}
            getSelectedRow={setSelectedRow}
            isActiveTag={false}
          />
        )}

        {isAddPropertyModalOpen && (
          <AddNewProperty
            selectedRuntimeId={selectedRowData?.id}
            isAddPropertyModalOpen={isAddPropertyModalOpen}
            setIsAddPropertyModalOpen={setIsAddPropertyModalOpen}
            selectedRow={selectedRow}
          />
        )}
        {isEditPropertyModalOpen && (
          <EditPropertyModal
            selectedRuntimeId={selectedRowData?.id}
            isEditPropertyModalOpen={isEditPropertyModalOpen}
            setIsEditPropertyModalOpen={setIsEditPropertyModalOpen}
            selectedRow={selectedRow}
          />
        )}
      </div>
    </Modal>
  );
}

export default RuntimePropertyModal;
