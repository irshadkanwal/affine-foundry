import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableToolbar,
  TableBatchAction,
  TableBatchActions,
  TableToolbarContent,
  TableToolbarSearch,
  TableSelectAll,
  TableExpandHeader,
  TableSelectRow,
  DataTable,
  Pagination,
  Button,
  Tag,
  Search,
  TableExpandRow,
  TableExpandedRow,
  Switch,
  Loading as CarbonLoading,
} from "@carbon/react";
import {
  TrashCan,
  Edit,
  Play,
  CheckmarkFilled,
  ErrorFilled,
  PauseOutlineFilled,
  Renew,
  SendFilled,
  ProgressBarRound,
  ValueVariable,
  CloudOffline,
  Download,
  Add,
  CircleFill,
} from "@carbon/react/icons";
import { ContentSwitcher } from "carbon-components-react";
import Loading from "components/Loading";
import { capitalizeFirstLetter } from "utils/capitalizeFirstLetter";

const renderCells = (
  row,
  handleEdit,
  handleDelete,
  shouldActionsRender,
  isActiveTag,
  shouldEditButtonRender,
  shouldDeleteButtonRender,
  isClickAbleCell,
  handleCellClick,
  shouldPlayButtonRender,
  handlePlayClick,
  shouldRenderRestartButton
) => {
  return (
    <>
      {row?.cells?.map((cell) => (
        <TableCell
          key={cell.id}
          style={{
            textAlign: cell?.info.header === "recordCount" ? "right" : "",
          }}
        >
          {cell.value === true ? (
            <>
              {isActiveTag ? (
                <Tag type="green" title="Clear Filter">
                  Active
                </Tag>
              ) : (
                "Yes"
              )}
            </>
          ) : cell.value === false ? (
            <>
              {isActiveTag ? (
                <Tag type="gray" title="Clear Filter">
                  Inactive
                </Tag>
              ) : (
                "No"
              )}
            </>
          ) : (
            <div
              style={{ cursor: isClickAbleCell ? "pointer" : "" }}
              onClick={isClickAbleCell ? () => handleCellClick(row) : () => {}}
            >
              {cell.value === "error" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <PauseOutlineFilled color={"orange"} />
                  {cell.value.charAt(0).toUpperCase() + cell?.value?.slice(1)}
                </div>
              ) : cell.value === "running" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <div className="display_flex">
                    <CarbonLoading
                      description="Active loading indicator"
                      withOverlay={false}
                      small
                    />
                    {capitalizeFirstLetter(cell.value)}
                  </div>
                </div>
              ) : cell.value === "success" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <CheckmarkFilled color={"green"} />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "fail" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <ErrorFilled color={"red"} />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "starting" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <ProgressBarRound color={"dodgerblue"} />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "submitted" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <SendFilled color={"blue"} />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "dead" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <ValueVariable color={"maroon"} />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "terminated" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <CircleFill color={"gray"} />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "offline" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <CloudOffline />
                  {capitalizeFirstLetter(cell.value)}
                </div>
              ) : cell.value === "Ingested" ? (
                <Tag
                  type="blue"
                  title="Clear Filter"
                  size={"m"}
                  style={{ width: "110px" }}
                >
                  Ingested
                </Tag>
              ) : cell.value === "Inspected" ? (
                <Tag
                  type="teal"
                  title="Clear Filter"
                  style={{ width: "110px" }}
                >
                  Inspected
                </Tag>
              ) : cell.value === "Parsed" ? (
                <Tag
                  type="purple"
                  title="Clear Filter"
                  style={{ width: "110px" }}
                >
                  Parsed
                </Tag>
              ) : cell.value === "Ready" ? (
                <Tag
                  type="gray"
                  title="Clear Filter"
                  style={{
                    width: "110px",
                    backgroundColor: "#ffd694",
                    color: "#c96e00",
                  }}
                >
                  Ready
                </Tag>
              ) : cell.value === "Success" ? (
                <Tag
                  type="green"
                  title="Clear Filter"
                  style={{
                    width: "110px",
                  }}
                >
                  Ready
                </Tag>
              ) : cell.value === "Needs Attention" ? (
                <Tag
                  type="magenta"
                  title="Clear Filter"
                  style={{ width: "110px" }}
                >
                  Need Attention
                </Tag>
              ) : cell.value === "Fail" ? (
                <Tag type="red" title="Clear Filter" style={{ width: "110px" }}>
                  Fail
                </Tag>
              ) : cell?.value === undefined &&
                cell?.info?.header === "trigger" ? (
                "Manual"
              ) : !cell.value ? (
                "- -"
              ) : (
                cell.value
              )}
            </div>
          )}
        </TableCell>
      ))}
      {shouldActionsRender && (
        <TableCell>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-3%",
            }}
          >
            {shouldPlayButtonRender ? (
              <button
                style={{
                  background: `${
                    !row.cells.some(
                      (value) =>
                        value.value === "Scheduled" &&
                        value.info.header === "trigger"
                    )
                      ? "#0f62fe"
                      : "gray"
                  }`,
                  width: "28px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  justifyContent: "center",
                  marginTop: "6.5px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                disabled={row.cells.some(
                  (value) =>
                    value.value === "Scheduled" &&
                    value.info.header === "trigger"
                )}
                onClick={() => handlePlayClick(row)}
              >
                <Play color="white" />
              </button>
            ) : (
              <></>
            )}
            {shouldEditButtonRender ? (
              <Button kind="ghost" onClick={() => handleEdit(row)}>
                <Edit />
              </Button>
            ) : (
              <></>
            )}
            {shouldDeleteButtonRender ? (
              <Button
                kind="ghost"
                disabled={row.id === 1 ? true : false}
                onClick={() => handleDelete(row)}
              >
                <TrashCan />
              </Button>
            ) : shouldRenderRestartButton ? (
              <Button
                kind="ghost"
                disabled={row.id === 1 ? true : false}
                onClick={() => handleDelete(row)}
              >
                {" "}
                <Renew />
              </Button>
            ) : (
              <></>
            )}
          </div>
        </TableCell>
      )}
    </>
  );
};

function CustomDataTable({
  headers,
  rows,
  shouldActionsRender = true,
  openEditModal,
  getSelectedRow,
  openAddModal,
  tableHeading,
  deleteAction,
  deleteBatchAction,
  shouldTableBatchActionsRender = false,
  shouldAddNewButton = true,
  buttonText = "Add New",
  isActiveTag = true,
  shouldEditButtonRender = true,
  shouldDeleteButtonRender = true,
  isSelectionEnable = true,
  isExpandableRowEnable = false,
  isClickAbleCell = false,
  handleCellClick,
  tableInlineSearch = false,
  inLineContentSwitch = false,
  handlePlayClick = () => {},
  shouldPlayButtonRender = false,
  shouldOtherViewRender = true,
  shouldPaginationRender = true,
  setIsViewChange,
  isTableLoading = false,
  shouldRenderRestartButton = false,
  showDownloadButton = false,
  downloadAction,
  isSortable = false,
  isDataClassTable = false,
  toggleContent = <></>,
  applyClassAction,
}) {
  const [firstRowIndex, setFirstRowIndex] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(5);
  const [queryString, setQueryString] = React.useState(null);

  const dataRows = React.useMemo(() => {
    return queryString
      ? rows?.filter((item) =>
          Object?.values(item)?.some(
            (value) =>
              typeof value === "string" &&
              value?.toLowerCase().includes(queryString?.toLowerCase())
          )
        )
      : rows;
  }, [rows, queryString]);
  const handleEdit = React.useCallback(
    (row) => {
      const resourceDescription = dataRows.find((resourceDescriptionRow) => {
        return (
          resourceDescriptionRow.description &&
          row.id === resourceDescriptionRow.id &&
          resourceDescriptionRow.description
        );
      });
      const resourceArchive = dataRows.find((resourceRow) => {
        return row.id === resourceRow.id;
      });
      const resourceAutoProfile = dataRows.find((resourceRow) => {
        return row.id === resourceRow.id;
      });
      const classification = dataRows.find((classificationRow) => {
        return (
          classificationRow.dataClassification &&
          row.id === classificationRow.id &&
          classificationRow.dataClassification
        );
      });
      const dataRefreshFrequency = dataRows.find((dataFreqRow) => {
        return dataFreqRow.frequency;
      });
      const dataPackageForResource = dataRows.find((rowItem) => {
        return (
          rowItem.dataPackage && row.id === rowItem.id && rowItem.dataPackage
        );
      });
      const dataLevelType = dataRows.find((rowItem) => {
        return (
          rowItem.dataLevelType &&
          row.id === rowItem.id &&
          rowItem.dataLevelType
        );
      });
      openEditModal(true);
      getSelectedRow({
        ...row,
        dataClassification: classification?.dataClassification,
        dataRefreshFrequency: dataRefreshFrequency,
        resourceDescription: resourceDescription?.description,
        resourceArchive: resourceArchive?.archive,
        resourceAutoProfile: resourceAutoProfile?.autoProfileData,
        dataPackageForResource: dataPackageForResource?.dataPackage,
        dataLevelType: dataLevelType?.dataLevelType,
      });
    },
    [getSelectedRow, openEditModal, dataRows]
  );

  const handleDelete = (row) => {
    deleteAction(row.id);
  };
  const batchDeleteHandler = (selectedRow) => {
    deleteBatchAction(selectedRow.map((selectedData) => selectedData.id));
  };

  const rowData = [...(dataRows || [])]
    .reverse()
    ?.slice(firstRowIndex, firstRowIndex + currentPageSize);

  return (
    <>
      <DataTable rows={rowData || []} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          selectedRows,
        }) => (
          <TableContainer
            title={
              tableInlineSearch ? (
                <div
                  style={{ display: "flex", gap: "3rem", alignItems: "center" }}
                >
                  <h3>{tableHeading}</h3>
                  <div
                    style={{
                      padding: "0 20px 0 0",
                      width: "100%",
                      display: "flex",
                      gap: "20px",
                    }}
                  >
                    <Search
                      onChange={({ target }) => setQueryString(target.value)}
                      id="search-1"
                      placeHolderText="Search"
                      size="lg"
                    />
                    {showDownloadButton && showDownloadButton !== "reset" ? (
                      <Button kind="ghost" onClick={() => downloadAction()}>
                        <Download />
                      </Button>
                    ) : (
                      <Button
                        kind="ghost"
                        onClick={() => {
                          setQueryString("");
                          downloadAction();
                        }}
                      >
                        <Renew />
                      </Button>
                    )}
                  </div>
                </div>
              ) : inLineContentSwitch ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 10px 0 0",
                  }}
                >
                  <h3>{tableHeading}</h3>
                  <ContentSwitcher size="lg" style={{ width: "150px" }}>
                    <Switch
                      name="table"
                      text="Table"
                      onClick={() => setIsViewChange(true)}
                    />
                    <Switch
                      name="matrix"
                      text="Matrix"
                      onClick={() => setIsViewChange(false)}
                    />
                  </ContentSwitcher>
                </div>
              ) : (
                <h3>{tableHeading}</h3>
              )
            }
          >
            <TableToolbar>
              <TableBatchActions {...getBatchActionProps()}>
                {isDataClassTable ? (
                  <>
                    {toggleContent}

                    <TableBatchAction
                      tabIndex={
                        getBatchActionProps().shouldShowBatchActions ? 0 : -1
                      }
                      renderIcon={Add}
                      onClick={() => applyClassAction(selectedRows)}
                    >
                      Apply Class
                    </TableBatchAction>
                  </>
                ) : (
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={TrashCan}
                    onClick={() => batchDeleteHandler(selectedRows)}
                  >
                    Delete
                  </TableBatchAction>
                )}
              </TableBatchActions>
              {shouldTableBatchActionsRender && (
                <TableToolbarContent>
                  <TableToolbarSearch
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onChange={({ target }) => setQueryString(target.value)}
                  />
                  {shouldAddNewButton && (
                    <Button
                      tabIndex={
                        getBatchActionProps().shouldShowBatchActions ? -1 : 0
                      }
                      onClick={() => openAddModal(true)}
                      size="small"
                      kind="primary"
                    >
                      {buttonText}
                    </Button>
                  )}
                </TableToolbarContent>
              )}
            </TableToolbar>
            {shouldOtherViewRender && (
              <Table size="xl">
                <TableHead>
                  <TableRow>
                    {isSelectionEnable && !isExpandableRowEnable ? (
                      <TableSelectAll {...getSelectionProps()} />
                    ) : (
                      isExpandableRowEnable && <TableExpandHeader />
                    )}
                    {headers?.map((header) => (
                      <TableHeader
                        {...getHeaderProps({ header })}
                        key={header.header}
                        isSortable={isSortable}
                      >
                        {header.header}
                        {isExpandableRowEnable && header.dropdown}
                      </TableHeader>
                    ))}

                    {shouldActionsRender && (
                      <TableHeader>
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Action
                        </span>
                      </TableHeader>
                    )}
                  </TableRow>
                </TableHead>
                {isTableLoading ? (
                  <Loading />
                ) : (
                  <TableBody>
                    {rows?.map((row) =>
                      !isExpandableRowEnable ? (
                        <TableRow {...getRowProps({ row })} key={row.id}>
                          {isSelectionEnable && (
                            <TableSelectRow {...getSelectionProps({ row })} />
                          )}
                          {renderCells(
                            row,
                            handleEdit,
                            handleDelete,
                            shouldActionsRender,
                            isActiveTag,
                            shouldEditButtonRender,
                            shouldDeleteButtonRender,
                            isClickAbleCell,
                            handleCellClick,
                            shouldPlayButtonRender,
                            handlePlayClick,
                            shouldRenderRestartButton
                          )}
                        </TableRow>
                      ) : (
                        <>
                          <TableExpandRow
                            {...getRowProps({
                              row,
                            })}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              );
                            })}
                          </TableExpandRow>
                          {rowData?.map(
                            (dataValue) =>
                              dataValue.detailKey === row.id && (
                                <TableExpandedRow
                                  colSpan={headers.length + 1}
                                  className="demo-expanded-td"
                                >
                                  <div>
                                    <div
                                      className="display_flex"
                                      style={{
                                        gap: "3%",
                                        marginBottom: "30px",
                                      }}
                                    >
                                      <p>Rule Name:</p>
                                      <p>{dataValue?.name}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div
                                      className="display_flex"
                                      style={{
                                        gap: "3%",
                                        marginBottom: "30px",
                                      }}
                                    >
                                      <p>Description:</p>
                                      <p>{dataValue?.description}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div
                                      className="display_flex"
                                      style={{
                                        gap: "3%",
                                        marginBottom: "30px",
                                      }}
                                    >
                                      <p>Level:</p>
                                      <p>{dataValue?.level}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div
                                      className="display_flex"
                                      style={{
                                        gap: "3%",
                                        marginBottom: "30px",
                                      }}
                                    >
                                      <p>Rule: </p>
                                      <p>{dataValue?.ruleDetail}</p>
                                    </div>
                                    <div>
                                      <div
                                        className="display_flex"
                                        style={{
                                          gap: "3%",
                                          marginBottom: "30px",
                                        }}
                                      >
                                        <p>Error:</p>
                                        <p>- -</p>
                                      </div>
                                    </div>
                                  </div>
                                </TableExpandedRow>
                              )
                          )}
                        </>
                      )
                    )}
                  </TableBody>
                )}
              </Table>
            )}
          </TableContainer>
        )}
      </DataTable>
      {shouldPaginationRender && (
        <div style={{ width: "auto" }}>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText=""
            pageNumberText="Page Number"
            pageSize={currentPageSize}
            pageSizes={[5, 10, 15, 20]}
            totalItems={rows?.length}
            disabled={false}
            isLastPage={false}
            pagesUnknown
            onChange={({ page, pageSize }) => {
              if (pageSize !== currentPageSize) {
                setCurrentPageSize(pageSize);
              }
              setFirstRowIndex(pageSize * (page - 1));
            }}
          />
        </div>
      )}
    </>
  );
}

export default CustomDataTable;
