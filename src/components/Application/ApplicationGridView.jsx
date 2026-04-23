import React from "react";
import { OverflowMenu, OverflowMenuItem, Loading } from "@carbon/react";
import GridPagination from "../GridPagination";
import PropertyTags from "components/DataResources/PropertyTags";

function ApplicationGridView({
  applications,
  setIsEditModalOpen,
  onCardClick,
  setSelectedRow,
  isApplicationLoading,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const referencePerPage = 9;
  const totalItems = applications ? applications.length : 0;
  const indexOfLastReference = (currentPage + 1) * referencePerPage;
  const indexOfFirstReference = indexOfLastReference - referencePerPage;
  const currentAppliactions = [...(applications || [])]
    .reverse()
    ?.slice(indexOfFirstReference, indexOfLastReference);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {isApplicationLoading ? (
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
          {currentAppliactions?.map((application, index) => (
            <React.Fragment key={index}>
              <div
                className="data-reference-card"
                style={{ cursor: "pointer" }}
                onClick={() => onCardClick(application)}
              >
                <div className="data-reference-card-header">
                  <h5>{application.name}</h5>
                  <OverflowMenu
                    data-floating-menu-container
                    flipped
                    selectorPrimaryFocus={".optionOne"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <OverflowMenuItem
                      className="optionOne"
                      itemText="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(application);
                        setIsEditModalOpen(true);
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
                        <h6>Path:</h6> {application.path}
                      </div>
                    </div>
                    <div className="data-reference-card-body-row">
                      <div
                        className="display_flex"
                        style={{ alignItems: "baseline" }}
                      >
                        <h6>Class Name:</h6> {application.className}
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
                      properties={[
                        application.applicationType
                          ? application.applicationType
                          : "N/A",
                      ]}
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

export default ApplicationGridView;
