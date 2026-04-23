import React from "react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { Folder } from "@carbon/react/icons";
import GridPagination from "components/GridPagination";

function DataClassesListViewPublished({ setDataClassDetails, dataClass = [] }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const classesPerPage = 3;
  const totalItems = dataClass ? dataClass.length : 0;
  const indexOfLastClass = (currentPage + 1) * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = [...(dataClass || [])]
    .reverse()
    ?.slice(indexOfFirstClass, indexOfLastClass);

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
      <div className="data-classes-list-grid">
        {currentClasses.map((data, index) => (
          <div
            className="data-classes-list-card"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDataClassDetails(data);
            }}
            key={index}
          >
            <div className="data-classes-card-header">
              <h5>{data?.name}</h5>
              <OverflowMenu
                data-floating-menu-container
                flipped
                selectorPrimaryFocus={".optionOne"}
              >
                <OverflowMenuItem className="optionOne" itemText="Edit" />
                <OverflowMenuItem className="optionTwo" itemText="Delete" />
              </OverflowMenu>
            </div>
            <div className="data-classes-card-body">
              <p style={{ marginBottom: "20px", marginTop: "10px" }}>
                {data.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  color: "blue",
                  marginBottom: "10px",
                }}
              >
                <Folder />
                <p>
                  {data?.category?.name
                    ? data?.category?.name
                    : "[uncategorized]"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Data type
                {/* <p>LastModified: {data.lastModifide}</p> */}
                <p>{data?.detail?.dataType || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <GridPagination
        dataPerPage={classesPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default DataClassesListViewPublished;
