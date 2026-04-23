import React from "react";
import CustomDataTable from "components/Datatable";
import NewTransformationModal from "components/WorkBench/WorkBenchModals/NewTransformationModal";

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
    name: "Transform 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 2,
    name: "Transform 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 3,
    name: "Transform 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 4,
    name: "Transform 4",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 5,
    name: "Transform 5",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 6,
    name: "Transform 6",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
  {
    id: 7,
    name: "Transform 7",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum...",
    type: "Load Balancer 1",
  },
];
function ProjectDetailsTransformTable() {
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
        buttonText="New Transformation +"
        openAddModal={setOpenAddModal}
        isActiveTag={false}
        statusWidth="200px"
        isSelectionEnable={false}
        shouldActionsRender={false}
      />
      {isopenAddModal && (
        <NewTransformationModal
          setIsAddModalOpen={setOpenAddModal}
          isAddModalOpen={isopenAddModal}
        />
      )}
    </div>
  );
}

export default ProjectDetailsTransformTable;
