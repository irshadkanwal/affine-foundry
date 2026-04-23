import React from "react";
import { Button, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import DeleteModel from "components/DeleteModel/DeleteModel";
import EditSourceModal from "components/WorkBench/WorkBenchModals/EditSourceModal";
import NewSourceModal from "components/WorkBench/WorkBenchModals/NewSouceModal";
const DUMMY_DATA = [
  {
    type: "Table",
    name: "Table Name 01",
    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
  {
    type: "Query",
    name: "Query Name 01",
    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
  {
    type: "Table",
    name: "Table Name 02",
    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
  {
    type: "Query",
    name: "Query Name 02",
    sql: "SELECT column1, column2 FROM table1, table2 WHERE column2='value';",
  },
];
function TransformDetailsSources() {
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
          <h3>Sources</h3>
          <Button onClick={() => setIsAddModalOpen(true)}>New Source +</Button>
        </div>
        <div className="transformation_grid">
          {DUMMY_DATA.map((data) => (
            <div className="transformation_card">
              <div className="flex_between">
                <p>{data.type}</p>
                <OverflowMenu
                  data-floating-menu-container
                  flipped
                  selectorPrimaryFocus={".optionOne"}
                >
                  <OverflowMenuItem
                    className="optionOne"
                    itemText="Edit"
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
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
              <p style={{ paddingBottom: "3px" }}>SQL Statement:</p>
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
        <EditSourceModal
          setIsModalOpen={setIsEditModalOpen}
          isModalOpen={setIsEditModalOpen}
        />
      )}
      {isAddModalOpen && (
        <NewSourceModal
          setIsAddModalOpen={setIsAddModalOpen}
          isAddModalOpen={isAddModalOpen}
        />
      )}
    </>
  );
}

export default TransformDetailsSources;
