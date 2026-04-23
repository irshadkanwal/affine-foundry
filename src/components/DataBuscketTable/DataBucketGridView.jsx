import React from "react";
import { OverflowMenu, OverflowMenuItem, Loading } from "@carbon/react";
import GridPagination from "../GridPagination";
import PropertyTags from "components/DataResources/PropertyTags";

function DataBucketGridView({
  databucket,
  setIsEditModalOpen,
  setSelectedRow,
  deleteActionHanlder,
  isDataBucketLoading,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const referencePerPage = 9;
  const totalItems = databucket ? databucket.length : 0;
  const indexOfLastReference = (currentPage + 1) * referencePerPage;
  const indexOfFirstReference = indexOfLastReference - referencePerPage;
  const currentDataBucket = [...(databucket || [])]
    .reverse()
    ?.slice(indexOfFirstReference, indexOfLastReference);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {isDataBucketLoading ? (
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
          {currentDataBucket?.map((bucket, idx) => (
            <React.Fragment key={idx}>
              <div className="data-reference-card">
                <div className="data-reference-card-header">
                  <h5>{bucket?.name}</h5>
                  <OverflowMenu
                    data-floating-menu-container
                    flipped
                    selectorPrimaryFocus={".optionOne"}
                  >
                    <OverflowMenuItem
                      className="optionOne"
                      itemText="Edit"
                      onClick={() => {
                        setSelectedRow(bucket);
                        setIsEditModalOpen(true);
                      }}
                    />
                    <OverflowMenuItem
                      className="optionTwo"
                      itemText="Delete"
                      onClick={() => {
                        deleteActionHanlder(bucket?.id);
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
                      <div
                        className="display_flex"
                        style={{ alignItems: "baseline" }}
                      >
                        <h6>ARN:</h6> {bucket?.arn}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <hr />
                  <div
                    style={{
                      padding: "2px 10px 10px",
                      display: "flex",
                    }}
                  >
                    <PropertyTags
                      properties={[bucket?.active ? "Active" : "Inactive"]}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
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

export default DataBucketGridView;
