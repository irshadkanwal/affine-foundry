import React from "react";
import {
  Table,
  Types,
  Sql,
  CharacterWholeNumber,
  Catalog,
  Db2Database,
  IbmCloudDedicatedHost,
} from "@carbon/react/icons";

const typeArray = ["", "Raw", "Bronze", "Silver", "Gold"];

function DataLineageInformation({ lineageData }) {
  return (
    <>
      <style>
        {`
        .lineage_info span{
          font-weight:bolder;
        }
        .lineage_info div div div{
          margin-bottom: 8px;
        }
        .lineage_info div div span{
        }
        `}
      </style>
      <div
        className="lineage_info"
        style={{
          marginTop: "40px",
          display: "flex",
          marginLeft: "20px",
          width: "70%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div>
            <div className="display_flex">
              <Table />
              <p>Table Name / File Name</p>
            </div>
            <span>
              {lineageData?.tableNameX
                ? lineageData?.tableNameX
                : lineageData?.uri
                ? lineageData?.uri?.split("/").pop()
                : "- -"}
            </span>
          </div>
          <div style={{ marginTop: "45px" }}>
            <div className="display_flex">
              <Types />
              <p> Data Level Type</p>
            </div>
            <span>{typeArray[lineageData?.dataLevelTypeId]}</span>
          </div>
          <div style={{ marginTop: "45px" }}>
            <div className="display_flex">
              <Sql />
              <p> Database Schema</p>
            </div>
            <span>
              {lineageData?.databaseSchema
                ? lineageData?.databaseSchema
                : "- -"}
            </span>
          </div>
          <div style={{ marginTop: "45px" }}>
            <div className="display_flex">
              <CharacterWholeNumber />
              <p>Column Count</p>
            </div>
            <span>{lineageData?.columnCount}</span>
          </div>
        </div>
        <div>
          <div>
            <div className="display_flex">
              <Catalog />
              <p> Catalog</p>
            </div>
            <span>{lineageData?.catalog ? lineageData?.catalog : "- -"}</span>
          </div>
          <div style={{ marginTop: "45px" }}>
            <div className="display_flex">
              <Db2Database />
              <p>Database</p>
            </div>
            <span>{lineageData?.database ? lineageData?.database : "- -"}</span>
          </div>
          <div style={{ marginTop: "45px" }}>
            <div className="display_flex">
              <IbmCloudDedicatedHost size={16} />
              <p>Host</p>
            </div>
            <span>{lineageData?.host ? lineageData?.host : "- -"}</span>
          </div>
          <div style={{ marginTop: "45px" }}>
            <div className="display_flex">
              <CharacterWholeNumber />
              <p>Record Count</p>
            </div>
            <span>{lineageData?.recordCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataLineageInformation;
