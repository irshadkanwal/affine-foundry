import React from "react";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
  Tooltip,
} from "@carbon/react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import GridPagination from "../GridPagination";
import PropertyTags from "components/DataResources/PropertyTags";
import { formatDateTime } from "utils/formatDateTime";

function RuntimeGridView({
  runtime,
  setIsRuntimeEditModalOpen,
  setSelectedRow,
  isGetRuntimeDataLoading,
  onCardClick,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const referencePerPage = 9;
  const totalItems = runtime ? runtime.length : 0;
  const indexOfLastReference = (currentPage + 1) * referencePerPage;
  const indexOfFirstReference = indexOfLastReference - referencePerPage;
  const currentReference = [...(runtime || [])]
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
      {isGetRuntimeDataLoading ? (
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
        <div className="data-reference-list-grid">
          {currentReference?.map((runtime, ind) => (
            <React.Fragment key={ind}>
              <Tooltip
                label={
                  <div style={{ width: "auto" }}>
                    <div>
                      <h6 style={{ display: "inline" }}> Host URL: </h6>
                      {runtime.hostUrl}
                    </div>
                    <hr />
                    <div>
                      <h6 style={{ display: "inline" }}>Start Time: </h6>

                      {runtime.startTime
                        ? formatDateTime(runtime.startTime)
                        : ""}
                    </div>
                  </div>
                }
              >
                <div
                  className="data-reference-list-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => onCardClick(runtime)}
                >
                  <div className="data-reference-card-header">
                    <h5>{capitalizeFirstLetter(runtime.name)}</h5>
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
                          setSelectedRow(runtime);
                          setIsRuntimeEditModalOpen(true);
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
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <h6>Cluster ID:</h6> {runtime?.awsClusterId}
                        </div>
                      </div>
                      <div className="data-reference-card-body-row">
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <h6>Cluster Size:</h6> {runtime?.clusterSize}
                        </div>
                      </div>
                      <div className="data-reference-card-body-row">
                        <div style={{ display: "flex", gap: "5px" }}>
                          <h6>Runtime State:</h6>
                          <span>{runtime.state}</span>
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "14px",
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: "10px",
                        }}
                      >
                        {/*                         <div */}
                        {/*                           style={{ */}
                        {/*                             display: "flex", */}
                        {/*                             justifyContent: "center", */}
                        {/*                             alignItems: "center", */}
                        {/*                             gap: "5px", */}
                        {/*                           }} */}
                        {/*                         > */}
                        {/*                           <h6>Cloud Provider:</h6> */}
                        {/*                           <span style={{ display: "flex", gap: "6px" }}> */}
                        {/*                             {runtime.cloudProvider} */}
                        {/*                             <img src={AWS} width={12} alt="Aws Logo" /> */}
                        {/*                           </span> */}
                        {/*                         </div> */}
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
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <h6>Managed By Platform:</h6>
                        <PropertyTags
                          properties={[runtime.managedByPlatform]}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Tooltip>
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

export default RuntimeGridView;
