import React, { useState, useEffect } from "react";
import { Search, SideNavItems, SideNavLink } from "carbon-components-react";
import { Notebook } from "@carbon/icons-react";

function WorkbookLeftColumn({ columnData, setActiveWorkbook, activeWorkbook }) {
  const [searchText, setSearchText] = useState("");
  const [filteredColumn, setFilteredColumn] = useState(columnData);

  useEffect(() => {
    const filteredData = columnData?.filter((data) =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredColumn(filteredData);
  }, [searchText, columnData]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ padding: "15px 15px 0 15px" }}>
        <Search
          id="search-1"
          placeholder="Search"
          light
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <SideNavItems>
        {filteredColumn?.map((data, index) => (
          <SideNavLink
            key={index}
            style={{
              cursor: "pointer",
              background: activeWorkbook?.id === data.id ? "#f4f4f4" : "",
            }}
            renderIcon={Notebook}
            onClick={() => {
              setActiveWorkbook(data);
            }}
          >
            <div
              style={{
                position: "relative",
                fontWeight: "normal",
              }}
            >
              {data.name}
            </div>
          </SideNavLink>
        ))}
      </SideNavItems>
    </div>
  );
}

export default WorkbookLeftColumn;
