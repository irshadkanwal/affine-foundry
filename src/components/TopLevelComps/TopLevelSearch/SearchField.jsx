import React from "react";
import { Search } from "@carbon/react";

export default function SearchFields({ searchFilter, setFilterData }) {
  const handleChange = (e) => {
    const queryString = e.target.value;
    const queryData = searchFilter?.filter((item) =>
      item.name?.toLowerCase().includes(queryString.toLowerCase())
    );
    if (!queryData) {
      setFilterData(searchFilter);
    } else {
      setFilterData(queryData);
    }
  };

  return (
    <Search
      className="search-field"
      labelText="search"
      onChange={handleChange}
    />
  );
}
