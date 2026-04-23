import React, { useState, useEffect } from "react";
import {
  Search,
  SideNav,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react";
import {
  DoubleInteger,
  CharacterUpperCase,
  Unknown,
  Add,
  Classification,
} from "@carbon/react/icons";
import { Button, Loading } from "@carbon/react";

function DataHealthLeftColumn({
  columnData,
  setSelectColumn,
  selectColumn,
  sidebarOpen,
  isLoading,
  setSelectFirstColumn,
  setShowDataClassModal,
}) {
  const [searchText, setSearchText] = useState("");
  const [filteredColumn, setFilteredColumn] = useState(columnData);

  useEffect(() => {
    const filteredData = columnData?.filter((data) =>
      data.columnName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredColumn(filteredData);
  }, [columnData, searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div style={{ marginLeft: "100px" }}>
        <SideNav
          style={{
            position: "absolute",
            left: sidebarOpen ? "288px" : "100px",
            top: "236px",
            height: "45.43rem",
            zIndex: "0",
          }}
        >
          <div style={{ padding: "15px 15px 0 15px" }}>
            <h5>
              {!isLoading ? "Columns " : ""}
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Columns{" "}
                  <Loading
                    description="columns loading"
                    withOverlay={false}
                    small={true}
                  />
                </div>
              ) : filteredColumn?.length ? (
                `(${filteredColumn?.length})`
              ) : (
                ""
              )}
            </h5>
            <Search
              id="search-1"
              placeholder="Search"
              light
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <Button
              kind="tertiary"
              onClick={() => setShowDataClassModal(true)}
              renderIcon={Add}
            >
              Assign Data Class
            </Button>
            <h6 style={{ color: "gray" }}>Data Class Name Example</h6>
          </div>
          <SideNavItems>
            {filteredColumn?.map((data, index) => (
              <SideNavLink
                key={index}
                style={{
                  backgroundColor:
                    selectColumn?.profileDetailKey === data?.profileDetailKey
                      ? "rgba(141, 141, 141, 0.2)"
                      : "",
                  cursor: "pointer",
                }}
                renderIcon={
                  data?.dataType === "Unknown"
                    ? Unknown
                    : data?.dataType === "String"
                    ? CharacterUpperCase
                    : DoubleInteger
                }
                onClick={() => {
                  setSelectFirstColumn(false);
                  setSelectColumn(data);
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "165px",
                    fontWeight: "normal",
                  }}
                >
                  {data.columnName}

                  <Classification
                    onClick={() =>
                      setShowDataClassModal(data?.profileDetailKey)
                    }
                    style={{
                      cursor: "cell",
                      position: "absolute",
                      backgroundColor: "white",
                      // height: "34px",
                      // width: "22px",
                      top: 2.5,
                      right: -1,
                    }}
                  />
                </div>
              </SideNavLink>
            ))}
          </SideNavItems>
        </SideNav>
      </div>
    </>
  );
}

export default DataHealthLeftColumn;
