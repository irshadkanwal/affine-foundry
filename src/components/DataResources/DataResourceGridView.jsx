import React from "react";
import { OverflowMenu, OverflowMenuItem, Loading } from "@carbon/react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import GridPagination from "../GridPagination";
import { formatDateTime } from "../../utils/formatDateTime";
import PropertyTags from "./PropertyTags";

function DataResourceGridView({
  resources,
  setIsDataResourceEditModalOpen,
  setSelectedRow,
  deleteActionHanlder,
  isResourceLoading,
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const resourcesPerPage = 9;
  const totalItems = resources ? resources.length : 0;
  const indexOfLastResource = (currentPage + 1) * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = [...(resources || [])]
    .reverse()
    ?.slice(indexOfFirstResource, indexOfLastResource);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {isResourceLoading ? (
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
        <>
          <div className="data-resource-grid">
            {currentResources?.map((resource) => (
              <>
                <div className="data-resource-card" key={resource.id}>
                  <div
                    className="data-resource-card-header"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor:
                          resource.dataLevelType.id === 1
                            ? "#FAF9F6"
                            : resource.dataLevelType.id === 2
                            ? "#E58642"
                            : resource.dataLevelType.id === 3
                            ? "#bfc1c2 "
                            : "#FFC32B",
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 8,
                      }}
                      key={resource.id}
                    ></div>
                    <h5 style={{ backgroundColor: "" }}>
                      {capitalizeFirstLetter(resource.name)}
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
                          setSelectedRow(resource);
                          setIsDataResourceEditModalOpen(true);
                        }}
                      />
                      <OverflowMenuItem
                        className="optionTwo"
                        itemText="Delete"
                        onClick={() => {
                          deleteActionHanlder(resource.id);
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
                      <div className="data-resource-card-body-row">
                        <span>{resource.description}</span>
                      </div>
                      <div className="data-resource-card-body-row description">
                        <div
                          className="display_flex"
                          style={{ alignItems: "baseline" }}
                        >
                          <h6>Data Format:</h6>
                          {resource.dataFormat.name}
                        </div>
                        <div
                          className="display_flex"
                          style={{ alignItems: "baseline" }}
                        >
                          <h6>Data Package:</h6>
                          {resource.dataPackageName}
                        </div>
                        <div
                          className="display_flex"
                          style={{ alignItems: "baseline" }}
                        >
                          <h6>Last Active:</h6>
                          {resource.lastActivityAt
                            ? formatDateTime(resource.lastActivityAt)
                            : "- -"}
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
                          resource?.dataClass?.name,
                          resource?.transactionType?.name
                            ?.charAt(0)
                            ?.toUpperCase() +
                            resource?.transactionType?.name?.slice(1),
                          resource?.dataFormat?.name,
                        ]}
                        isLoading={false}
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <GridPagination
            dataPerPage={resourcesPerPage}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default DataResourceGridView;
