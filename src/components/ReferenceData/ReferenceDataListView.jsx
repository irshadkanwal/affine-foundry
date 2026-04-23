import React from "react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import GridPagination from "../GridPagination";
import { transformedDate } from "../../utils/transformedDate";

function ReferenceDataListView({
  reference,
  setIsReferenceEditModalOpen,
  deleteActionHanlder,
  setSelectedRow,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const referencePerPage = 4;
  const totalItems = reference ? reference.length : 0;
  const indexOfLastReference = (currentPage + 1) * referencePerPage;
  const indexOfFirstReference = indexOfLastReference - referencePerPage;
  const currentReference = [...(reference || [])]
    .reverse()
    ?.slice(indexOfFirstReference, indexOfLastReference);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div className="data-reference-list-grid">
        {currentReference?.map((referenceItem) => (
          <>
            <div className="data-reference-list-card">
              <div className="data-reference-card-header">
                <h5>{capitalizeFirstLetter(referenceItem.name)}</h5>
                <OverflowMenu
                  data-floating-menu-container
                  flipped
                  selectorPrimaryFocus={".optionOne"}
                >
                  <OverflowMenuItem
                    className="optionOne"
                    itemText="Edit"
                    onClick={() => {
                      setSelectedRow(referenceItem);
                      setIsReferenceEditModalOpen(true);
                    }}
                  />
                  <OverflowMenuItem
                    className="optionTwo"
                    itemText="Delete"
                    onClick={() => {
                      deleteActionHanlder(referenceItem?.id);
                    }}
                  />
                </OverflowMenu>
              </div>
              <div className="card-body">
                <div
                  style={{
                    color: "#525252",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  <div className="data-reference-card-body-row">
                    <span>{referenceItem.description}</span>
                  </div>
                  <div
                    style={{
                      marginLeft: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      className="display_flex"
                      style={{ alignItems: "baseline" }}
                    >
                      <h6>Namespace:</h6>
                      {referenceItem.namespace}
                    </div>

                    <div
                      className="display_flex"
                      style={{ alignItems: "baseline", marginRight: "17px" }}
                    >
                      <h6>Last Refresh Date: </h6>
                      {referenceItem.updatedAt
                        ? transformedDate(referenceItem.updatedAt)
                        : "- -"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <GridPagination
        dataPerPage={referencePerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ReferenceDataListView;
