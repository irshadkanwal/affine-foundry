import React from "react";
import { Popover, PopoverContent } from "@carbon/react";
import { Filter } from "@carbon/icons-react";

import FilterForm from "../FilterForm";

export default function FilterPopOver({
  onSubmit,
  filterLable,
  isCheckBoxFilter,
  dataResource,
  dataPackage,
  showDateInput,
  classesSortBy,
  showClasses,
}) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  return (
    <Popover
      open={isFilterOpen}
      onKeyDown={(evt) => {
        if (evt.key === "Escape") {
          isFilterOpen(false);
        }
      }}
      onRequestClose={() => setIsFilterOpen(false)}
      align="bottom-left"
      caret={false}
    >
      <div
        role="button"
        style={{
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "7rem",
          gap: "8%",
          height: "2.5rem",
          cursor: "pointer",
        }}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span style={{ fontSize: "14px" }}>Filter</span> <Filter />
      </div>
      <PopoverContent>
        {isFilterOpen && (
          <FilterForm
            onSubmit={onSubmit}
            filterLable={filterLable}
            setIsFilterOpen={setIsFilterOpen}
            isCheckBoxFilter={isCheckBoxFilter}
            dataResource={dataResource}
            dataPackage={dataPackage}
            showDateInput={showDateInput}
            classesSortBy={classesSortBy}
            showClasses={showClasses}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
