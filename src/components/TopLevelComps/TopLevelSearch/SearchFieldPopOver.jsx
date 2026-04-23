import React from "react";
import {
  Popover,
  PopoverContent,
  Search,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
} from "@carbon/react";

const getPopOverListToRender = (primaryList, secondaryList, isPrimaryList) => {
  if (!primaryList || !secondaryList) {
    return {};
  }

  if (isPrimaryList) {
    return {
      listType: "primary",
      title: primaryList.title,
      options: primaryList.options,
      idByNameMap: primaryList.idByNameMap,
      idMap: primaryList.idMap,
    };
  }
  return {
    listType: "secondary",
    title: secondaryList.title,
    options: secondaryList.options,
    idByNameMap: secondaryList.idByNameMap,
    idMap: secondaryList.idMap,
  };
};

export default function SearchFieldPopOver({
  primaryList,
  secondaryList,
  setFilterData,
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isPrimaryList, setIsPrimaryList] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  /* eslint-disable */
  React.useEffect(() => {
    /* 
       this useEffect keeps  the popover open
       need to  check if any of the secondary options matches 
       the search query to close the modal manually
     */
    if (!searchQuery) {
      setIsPrimaryList(true);
      setFilterData(null);
      return;
    }
    const match = secondaryList?.options?.find(
      (item) => item.label === searchQuery
    );
    if (match) {
      setIsOpen(false);
      return;
    }
    if (!!searchQuery) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [searchQuery, secondaryList?.options]);
  const { options, idByNameMap, listType, title } =
    getPopOverListToRender(primaryList, secondaryList, isPrimaryList) || {};

  const filteredOptions = React.useMemo(() => {
    return (
      options?.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [options, searchQuery]);

  const handleItemClick = React.useCallback(
    (value) => {
      setSearchQuery(value);
      if (listType === "primary") {
        setFilterData((prev) => ({
          ...prev,
          primaryListItemID: idByNameMap?.[value],
        }));
        setIsPrimaryList(false);
        return;
      }
      if (listType === "secondary") {
        setFilterData((prev) => ({
          ...prev,
          secondaryListItemID: idByNameMap?.[value],
        }));
        setIsPrimaryList(true);
        setIsOpen(false);
        return;
      }
    },
    [idByNameMap, listType]
  );
  /* eslint-enable */

  return (
    <Popover
      align="bottom-left"
      open={isOpen}
      isTabTip
      style={{ width: "100%" }}
    >
      <Search
        className="search-field"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      {!!searchQuery && (
        <PopoverContent>
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>{title}</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            {filteredOptions.map((result) => (
              <StructuredListRow key={result.id}>
                <StructuredListCell
                  onClick={() => handleItemClick(result.label)}
                >
                  {result.label}
                </StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListWrapper>
        </PopoverContent>
      )}
    </Popover>
  );
}
