import React from "react";
import { Loading, Modal } from "@carbon/react";
import AddNewProperty from "./AddNewProperty";
import EditPropertyModal from "./EditPropertyModal";
import CustomDataTable from "../Datatable";
import { useApplicationProps } from "hooks/application/useApplicationProperty";

const headerData = [
  {
    key: "key",
    header: "Key",
  },
  {
    key: "value",
    header: "Value",
  },
  {
    key: "postion",
    header: "Postion",
  },
];

function ApplicationProperties({
  selectedData,
  isPropertiesModalOpen,
  isGridView,
  setisPropertiesModalOpen,
}) {
  const {
    data: applicationProperties = [],
    isLoading: isApplicationPropertiesLoading,
  } = useApplicationProps(selectedData?.id);

  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = React.useState();
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] =
    React.useState();
  const [selectedRow, setSelectedRow] = React.useState();

  const [applicationPropertiesById, setApplicationPropertiesById] =
    React.useState([]);

  React.useEffect(() => {
    const filteredApplicationProps = applicationProperties?.filter(
      (application) => application.applicationId === selectedData?.id
    );
    setApplicationPropertiesById(filteredApplicationProps);
  }, [applicationProperties, selectedData]);

  const selectedRowData = isGridView
    ? selectedData
    : selectedData?.cells.reduce((acc, value) => {
        const objectKey = value.id.split(":");
        return { ...acc, [objectKey[1]]: value.value, id: selectedData.id };
      }, {});

  return (
    <Modal
      open={isPropertiesModalOpen}
      modalHeading="Application Properties"
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
            flexDirection: "column",
            width: "85%",
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
                Application Name
              </p>
              <p style={{ fontSize: "14px" }}>{selectedRowData?.name}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px", paddingBottom: "5px" }}>Path</p>
              <p style={{ fontSize: "14px" }}>{selectedRowData?.path}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "12px", paddingBottom: "5px" }}>
                Class Name
              </p>
              <p style={{ fontSize: "14px" }}>{selectedRowData?.className}</p>
            </div>
          </div>
        </div>
        {isApplicationPropertiesLoading ? (
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
            rows={applicationPropertiesById}
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
            selectedApplicationId={selectedRowData?.id}
            isAddPropertyModalOpen={isAddPropertyModalOpen}
            setIsAddPropertyModalOpen={setIsAddPropertyModalOpen}
            selectedRow={selectedRow}
          />
        )}
        {isEditPropertyModalOpen && (
          <EditPropertyModal
            selectedApplicationId={selectedRowData?.id}
            isEditPropertyModalOpen={isEditPropertyModalOpen}
            setIsEditPropertyModalOpen={setIsEditPropertyModalOpen}
            selectedRow={selectedRow}
          />
        )}
      </div>
    </Modal>
  );
}

export default ApplicationProperties;
