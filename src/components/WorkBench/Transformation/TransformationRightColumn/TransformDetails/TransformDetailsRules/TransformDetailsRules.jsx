import React from "react";
import { Button, ContentSwitcher, IconSwitch } from "@carbon/react";
import DeleteModel from "components/DeleteModel/DeleteModel";
import EditRulebyAddColumn from "components/WorkBench/WorkBenchModals/RuleModals/EditRuleColumn";
import NewSourceModal from "components/WorkBench/WorkBenchModals/NewSouceModal";
import { Grid as GridIcon, Code } from "@carbon/icons-react";
import TransormDetailsRulesGridView from "./TransormDetailsRulesGridView";
import TransormDetailsRulesCodeView from "./TransormDetailsRulesCodeView";

const DUMMY_DATA = [
  {
    name: "Rule Name 01",
    type: "Add Column",
    step: "Auto Increment",
  },
  {
    name: "Rule Name 02",
    type: "Lookup",
    step: "Auto Increment",
  },
  {
    name: "Rule Name 03",
    type: "Primary-Key",
    step: "Auto Increment",
  },
  {
    name: "Rule Name 04",
    type: "Add Column",
    step: "Auto Increment",
  },
];
function TransformDetailsRules() {
  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(null);
  const [isCodeView, setIsCodeView] = React.useState(false);
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
          <div className="display_flex" style={{ gap: "20px" }}>
            <Button onClick={() => setIsAddModalOpen(true)}>
              New Source +
            </Button>
            <ContentSwitcher size="lg">
              <IconSwitch
                name="Grid"
                text="Grid View"
                onClick={() => {
                  setIsCodeView(false);
                }}
              >
                <GridIcon />
              </IconSwitch>
              <IconSwitch
                name="Code"
                text={"Code View"}
                onClick={() => {
                  setIsCodeView(true);
                }}
              >
                <Code />
              </IconSwitch>
            </ContentSwitcher>
          </div>
        </div>

        {!isCodeView ? (
          <TransormDetailsRulesGridView
            DUMMY_DATA={DUMMY_DATA}
            setIsEditModalOpen={setIsEditModalOpen}
            deleteActionHanlder={deleteActionHanlder}
          />
        ) : (
          <TransormDetailsRulesCodeView />
        )}
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
        <EditRulebyAddColumn
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

export default TransformDetailsRules;
