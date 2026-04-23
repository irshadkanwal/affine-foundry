import React from "react";
import { Button, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import DeleteModel from "components/DeleteModel/DeleteModel";
import EditTargetSinkModal from "components/WorkBench/WorkBenchModals/EditTargetSinkModal";
import NewTargetSinkModal from "components/WorkBench/WorkBenchModals/NewTargetSinkModal";
const DUMMY_DATA = [
  {
    type: "Append",
    name: "Table/Resource Name 01",
    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
  {
    type: "Overwrite",
    name: "Table/Resource Name 01",

    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
  {
    type: "Snapshot",
    name: "Table/Resource Name 01",

    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
  {
    type: "Append",
    name: "Table/Resource Name 01",
    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
];
function TransformDetailsTarget() {
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(null);

  const { mutateAsync: deleteFn, isLoading: isDeleteActionLoading } = () => {};
  const deleteCaller = (id) => {
    deleteFn({ someId: id });
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  return (
    <>
      <div style={{ background: "#e5e5e5", padding: "20px 20px 20px 20px" }}>
        <div className="flex_between" style={{ paddingBottom: "20px" }}>
          <h3>Targets / Sinks</h3>
          <Button onClick={() => setIsAddModalOpen(true)}>
            New Target/Sink +
          </Button>
        </div>
        <div className="transformation_grid">
          {DUMMY_DATA.map((data) => (
            <div className="transformation_card">
              <div className="flex_between">
                <p>Transaction Type: {data.type}</p>
                <OverflowMenu
                  data-floating-menu-container
                  flipped
                  selectorPrimaryFocus={".optionOne"}
                >
                  <OverflowMenuItem
                    className="optionOne"
                    itemText="Edit"
                    onClick={() => setIsEditModalOpen(true)}
                  />
                  <OverflowMenuItem
                    className="optionTwo"
                    itemText="Delete"
                    onClick={() => deleteActionHanlder(0)}
                  />
                </OverflowMenu>
              </div>
              <h6 style={{ marginTop: "-10px", paddingBottom: "20px" }}>
                {data.name}
              </h6>
              <p style={{ paddingBottom: "3px" }}>Overwrite SQL:</p>
              <p>{data.sql}</p>
            </div>
          ))}
        </div>
      </div>
      {(isDeleteModelOpen || isDeleteActionLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={[]}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={() => {}}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isDeleteActionLoading}
        />
      )}
      {isEditModalOpen && (
        <EditTargetSinkModal
          setIsModalOpen={setIsEditModalOpen}
          isModalOpen={setIsEditModalOpen}
        />
      )}
      {isAddModalOpen && (
        <NewTargetSinkModal
          setIsAddModalOpen={setIsAddModalOpen}
          isAddModalOpen={isAddModalOpen}
        />
      )}
    </>
  );
}

export default TransformDetailsTarget;
