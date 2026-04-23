import React from "react";
import { OverflowMenu, OverflowMenuItem, Loading } from "@carbon/react";
import GridPagination from "../GridPagination";
import PropertyTags from "./PropertyTags";
import { formatDateTime } from "../../utils/formatDateTime";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useDataPackageProp } from "hooks/datapackage/useDataPackageProperties";

function DataPackageGridView({
  dataPackage,
  setIsDataPackageEditModalOpen,
  setSelectedRow,
  deleteActionHanlder,
  isDataPackageLoading,
}) {
  const { data: properties, isLoading: isPropertiesLoading } =
    useDataPackageProp();

  const [currentPage, setCurrentPage] = React.useState(0);
  const resourcesPerPage = 9;
  const totalItems = dataPackage ? dataPackage?.length : 0;
  const indexOfLastResource = (currentPage + 1) * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = [...(dataPackage || [])]
    .reverse()
    ?.slice(indexOfFirstResource, indexOfLastResource);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {isDataPackageLoading ? (
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
          <div className="data-package-grid">
            {currentResources?.map((data) => (
              <>
                <div className="data-package-card" key={data?.id}>
                  <div className="data-package-card-header">
                    <h5>{capitalizeFirstLetter(data.name)}</h5>
                    <OverflowMenu
                      data-floating-menu-container
                      flipped
                      selectorPrimaryFocus={".optionOne"}
                    >
                      <OverflowMenuItem
                        className="optionOne"
                        itemText="Edit"
                        onClick={() => {
                          setSelectedRow(data);
                          setIsDataPackageEditModalOpen(true);
                        }}
                      />
                      <OverflowMenuItem
                        className="optionTwo"
                        itemText="Delete"
                        onClick={() => {
                          deleteActionHanlder(data.id);
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
                      <div className="data-package-card-body-row description">
                        <div
                          className="display_flex"
                          style={{ alignItems: "baseline" }}
                        >
                          <h6>Last Active: </h6>
                          {data.lastActivityAt
                            ? formatDateTime(data.lastActivityAt)
                            : "- -"}
                        </div>
                        <div
                          className="display_flex"
                          style={{ alignItems: "baseline" }}
                        >
                          <h6>Data Check Frequency:</h6>
                          {data?.frequency}
                        </div>
                        <div
                          className="display_flex"
                          style={{ alignItems: "baseline" }}
                        >
                          <h6>Expected Refresh Frequency:</h6>
                          {data?.frequency}
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
                        properties={properties}
                        data={data}
                        isLoading={isPropertiesLoading}
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

export default DataPackageGridView;
