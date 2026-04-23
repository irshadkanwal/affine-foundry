import React from "react";
import { OverflowMenu, OverflowMenuItem, Loading } from "@carbon/react";
import GridPagination from "../GridPagination";
import PropertyTags from "components/DataResources/PropertyTags";

function DataConnectorGridView({
  dataConnector,
  setIsEditModalOpen,
  setSelectedRow,
  deleteActionHanlder,
  onCardClick,
  isDataConnectorLoading,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const referencePerPage = 9;
  const totalItems = dataConnector ? dataConnector.length : 0;
  const indexOfLastReference = (currentPage + 1) * referencePerPage;
  const indexOfFirstReference = indexOfLastReference - referencePerPage;
  const currentDataConnector = [...(dataConnector || [])]
    .reverse()
    ?.slice(indexOfFirstReference, indexOfLastReference);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {isDataConnectorLoading ? (
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
          {currentDataConnector?.map((connector) => (
            <>
              <div
                className="data-reference-card"
                style={{ cursor: "pointer" }}
                onClick={() => onCardClick(connector)}
              >
                <div className="data-reference-card-header">
                  <h5>{connector.name}</h5>
                  <OverflowMenu
                    data-floating-menu-container
                    flipped
                    selectorPrimaryFocus={".optionOne"}
                  >
                    <OverflowMenuItem
                      className="optionOne"
                      itemText="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(connector);
                        setIsEditModalOpen(true);
                      }}
                    />
                    <OverflowMenuItem
                      className="optionTwo"
                      itemText="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteActionHanlder(connector.id);
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
                        <h6>Type:</h6> {connector.type}
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
                      properties={[connector.active ? "Active" : "Inactive"]}
                    />
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

export default DataConnectorGridView;
