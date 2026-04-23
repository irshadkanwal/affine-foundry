import React from "react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";

function TransormDetailsRulesGridView({
  setIsEditModalOpen,
  deleteActionHanlder,
  DUMMY_DATA,
}) {
  return (
    <div className="transformation_grid">
      {DUMMY_DATA.map((data) => (
        <div className="transformation_card">
          <div className="flex_between">
            <p>Rule Step: {data.step}</p>
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
          <h6 style={{ paddingBottom: "10px" }}>{data.name}</h6>
          <p>Type: {data.type}</p>
        </div>
      ))}
    </div>
  );
}

export default TransormDetailsRulesGridView;
