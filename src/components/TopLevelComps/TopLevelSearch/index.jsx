import React from 'react'
import SearchFieldPopOver from './SearchFieldPopOver'
import SearchField from './SearchField'

export default function TopLevelSearch({
  searchFilter,
  setFilterData,
  shouldSearchPopOverEnable,
  primaryList = {},
  secondaryList = {},
}) {
  if (!shouldSearchPopOverEnable) {
    return (
      <SearchField setFilterData={setFilterData} searchFilter={searchFilter} />
    )
  }

  return (
    <SearchFieldPopOver
      primaryList={primaryList}
      secondaryList={secondaryList}
      setFilterData={setFilterData}
    />
  )
}
