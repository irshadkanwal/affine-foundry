import React from "react";
import { PaginationNav } from "@carbon/react";

function GridPagination({
  dataPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / dataPerPage);

  return (
    <div
      style={{
        alignSelf: "flex-end",
        marginRight: "120px",
        // padding: "30px 30px 30px 30px",
        // zIndex: 99,
        //   position: "absolute",
        // left: "75%",
        // top: "93%",
      }}
    >
      <PaginationNav
        itemsShown={dataPerPage}
        totalItems={totalPages}
        page={currentPage}
        onChange={onPageChange}
      />
    </div>
  );
}

export default GridPagination;
