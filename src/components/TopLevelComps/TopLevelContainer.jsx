import React from "react";
import FilterPopOver from "./FilterPopOver";
import TopLevelButtons from "./TopLevelButtons";
import TopLevelSearch from "./TopLevelSearch";

/**
 * @param {boolean} shouldSearchPopOverEnable 
 * - specify if we need to use pop over for search
 * 
 * @param {object[]} searchFilter 
 * -required for non pop over search - not used in pop over settings - array of items to search from 
 * - must have name in each object [{name:'some name'}]
 * 
 * @param {object} setFilterData 
 * - required in both search settings 
 * - for pop over sttings, the shape of setFilterData should be 
 *  {
      primaryListItemID: ...any primary listid,
      secondaryListItemID: ...any secondary list id
    }

 * @param {object} primaryList 
       - required for pop over search
       - the shape of setFilterData should be 
        {
          title: 'title for primary list',
          options: primaryOptions, 
          idByNameMap: primaryIdByNameMap,
          idMap: primaryIdMap,
        }
        - see useDataResource and useDataResourceProfileHeaderById to learn 
          how to create options, idMap,idByNameMap

 * @param {object} secondaryList 
       - required for pop over search
       - the shape of setFilterData should be 
        {
          title: 'title for secondary list',
          options: secondaryOptions, 
          idByNameMap: secondaryIdByNameMap,
          idMap: secondaryIdMap,
        }
        - see useDataResource and useDataResourceProfileHeaderById to learn 
          how to create options, idMap,idByNameMap
 */

function TopLevelComps({
  name,

  /* Buttons Props */
  shouldRenderButton = true,
  buttonName = "New",
  openAddModal = false,
  setIsViewChange = false,
  shouldContentSwitecherRender = false,
  isListView = false,
  isTableView = false,

  /* filter Porps */
  onSubmit,
  filterLable,
  isCheckBoxFilter = true,
  dataPackage,
  dataResource,
  showDateInput,
  classesSortBy,
  showClasses,

  /* Search Props */
  shouldSearchPopOverEnable = false,
  searchFilter,
  setFilterData,
  primaryList = {},
  secondaryList = {},
}) {
  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ paddingBottom: "30px" }}>{name}</h3>
      <div
        style={{
          display: "flex",
          paddingBottom: "50px",
          gap: "1%",
          width: "100%",
        }}
      >
        <FilterPopOver
          showDateInput={showDateInput}
          onSubmit={onSubmit}
          filterLable={filterLable}
          isCheckBoxFilter={isCheckBoxFilter}
          dataPackage={dataPackage}
          dataResource={dataResource}
          classesSortBy={classesSortBy}
          showClasses={showClasses}
        />
        <TopLevelSearch
          searchFilter={searchFilter}
          setFilterData={setFilterData}
          shouldSearchPopOverEnable={shouldSearchPopOverEnable}
          primaryList={primaryList}
          secondaryList={secondaryList}
        />
        {shouldRenderButton && (
          <TopLevelButtons
            openAddModal={openAddModal}
            buttonName={buttonName}
            shouldContentSwitecherRender={shouldContentSwitecherRender}
            setIsViewChange={setIsViewChange}
            isListView={isListView}
            isTableView={isTableView}
          />
        )}
      </div>
    </div>
  );
}

export default TopLevelComps;
