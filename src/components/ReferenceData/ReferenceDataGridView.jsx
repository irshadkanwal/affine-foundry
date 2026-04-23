import React from "react";
import { OverflowMenu, OverflowMenuItem, Loading } from "@carbon/react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import GridPagination from "../GridPagination";
import { transformedDate } from "../../utils/transformedDate";

function ReferenceDataGridView({
  reference,
  setIsReferenceEditModalOpen,
  deleteActionHanlder,
  setSelectedRow,
  isGetReferenceDataLoading,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const referencePerPage = 9;
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
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {isGetReferenceDataLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading withOverlay={false} />
        </div>
      ) : (
        <div className="data-reference-grid">
          {currentReference?.map((reference) => (
            <>
              <div className="data-reference-card">
                <div className="data-reference-card-header">
                  <h5>
                    {capitalizeFirstLetter(
                      reference?.name.split(" ")?.length > 5
                        ? `${reference?.name
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")} ...`
                        : reference.name
                    )}
                  </h5>
                  <OverflowMenu
                    data-floating-menu-container
                    flipped
                    selectorPrimaryFocus={".optionOne"}
                  >
                    <OverflowMenuItem
                      className="optionOne"
                      itemText="Edit"
                      onClick={() => {
                        setSelectedRow(reference);
                        setIsReferenceEditModalOpen(true);
                      }}
                    />
                    <OverflowMenuItem
                      className="optionTwo"
                      itemText="Delete"
                      onClick={() => deleteActionHanlder(reference?.id)}
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
                    <div className="data-reference-card-body-row description">
                      <span>
                        {reference?.description.split(" ")?.length > 7
                          ? `${reference?.description
                              .split(" ")
                              .slice(0, 6)
                              .join(" ")} ...`
                          : reference.description}
                      </span>
                    </div>
                    <div className="data-reference-card-body-row">
                      <div
                        className="display_flex"
                        style={{ alignItems: "baseline" }}
                      >
                        <h6>Namespace:</h6>
                        {reference.namespace}
                      </div>
                      <div
                        className="display_flex"
                        style={{ alignItems: "baseline" }}
                      >
                        <h6>Last Refresh Date: </h6>
                        {reference.updatedAt
                          ? transformedDate(reference.updatedAt)
                          : "- -"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
      <GridPagination
        dataPerPage={referencePerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ReferenceDataGridView;
