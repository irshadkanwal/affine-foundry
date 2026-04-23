import React from "react";
import { Theme } from "@carbon/react";
import { Link } from "react-router-dom";
import { useDataConnections } from "../../hooks/dataconnectors/useDataConnectors";
import { useDataBucket } from "../../hooks/databucket/useDataBucket";
import { useDataPackage } from "../../hooks/datapackage/useDataPackage";
import { useDataResource } from "../../hooks/dataresources/useDataResource";

function SearchPrompt({ searchValue }) {
  const { data: dataConnections } = useDataConnections();
  const { data: dataBucket } = useDataBucket();
  const { data: dataPackage } = useDataPackage();
  const { data: dataResource } = useDataResource();

  const filteredConnections = dataConnections?.filter((connection) =>
    connection.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredBucket = dataBucket?.filter((bucket) =>
    bucket.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredPackage = dataPackage?.filter((dataPackage) =>
    dataPackage.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredResource = dataResource?.filter((dataResource) =>
    dataResource.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Theme theme="g90">
      <div style={{ width: "22rem", height: "auto", padding: "15px" }}>
        <div style={{ paddingBottom: "15px" }}>
          <div className="search__header">
            <p className="search__name">Data Bucket</p>
            <Link to="/data-management/data-bucket">View all</Link>
          </div>
          <hr />
          {filteredBucket?.map((bucket) => (
            <p key={bucket.id}>{bucket.name}</p>
          ))}
        </div>
        <div style={{ paddingBottom: "15px" }}>
          <div className="search__header">
            <p className="search__name">Data Connectors</p>
            <Link to="/data-management/data-connectors">View all</Link>
          </div>
          <hr />
          {filteredConnections?.map((connection) => (
            <p key={connection.id}>{connection.name}</p>
          ))}
        </div>
        <div style={{ paddingBottom: "15px" }}>
          <div className="search__header">
            <p className="search__name">Data Package</p>
            <Link to="/data-management/data-package">View all</Link>
          </div>
          <hr />
          {filteredPackage?.map((dataPackage) => (
            <p key={dataPackage.id}>{dataPackage.name}</p>
          ))}
        </div>
        <div style={{ paddingBottom: "15px" }}>
          <div className="search__header">
            <p className="search__name">Data Resource</p>
            <Link to="/data-management/data-resource">View all</Link>
          </div>
          <hr />
          {filteredResource?.map((dataPackage) => (
            <p key={dataPackage.id}>{dataPackage.name}</p>
          ))}
        </div>
      </div>
    </Theme>
  );
}

export default SearchPrompt;
