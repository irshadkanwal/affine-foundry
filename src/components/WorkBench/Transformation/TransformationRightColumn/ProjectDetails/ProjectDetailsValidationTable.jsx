import React from "react";
import CustomDataTable from "components/Datatable";
import NewValidationModal from "components/WorkBench/WorkBenchModals/NewValidationModal";

const headerData = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "type",
    header: "Type",
  },
];
const rows = [
  {
    id: 1,
    name: "Validation 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 2,
    name: "Validation 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 3,
    name: "Validation 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 4,
    name: "Validation 4",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 5,
    name: "Validation 5",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 6,
    name: "Validation 6",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 7,
    name: "Validation 7",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
];
function ProjectDetailsValidationTable() {
  const [isopenAddModal, setOpenAddModal] = React.useState(null);

  return (
    <div>
      <style>
        {`
        .cds--data-table-header {
            display: none
        }
        `}
      </style>
      <CustomDataTable
        headers={headerData}
        rows={rows}
        shouldTableBatchActionsRender={true}
        shouldAddNewButton={true}
        buttonText="New Validation +"
        openAddModal={setOpenAddModal}
        isActiveTag={false}
        statusWidth="200px"
        isSelectionEnable={false}
        shouldActionsRender={false}
      />
      {isopenAddModal && (
        <NewValidationModal
          setIsAddModalOpen={setOpenAddModal}
          isAddModalOpen={isopenAddModal}
        />
      )}
    </div>
  );
}

export default ProjectDetailsValidationTable;
