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
  TableSelectRow,
  Button,
  DataTable,
  Pagination,
} from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";

function DataPackageTableView({ rowData, headerData, setIsAddModalOpen }) {
  return (
    <>
      <DataTable rows={rowData} headers={headerData}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <div style={{ background: "white" }}>
            <TableContainer
              title={
                <div style={{ paddingLeft: "20px" }}>
                  <h4>Data Package</h4>
                </div>
              }
            >
              <TableToolbar>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? 0 : -1
                    }
                    renderIcon={TrashCan}
                  >
                    Delete
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onChange={onInputChange}
                  />
                  <Button
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onClick={() => setIsAddModalOpen(true)}
                    size="small"
                    kind="primary"
                  >
                    Add New
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table size="xl">
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{ width: "auto" }}>
                <Pagination
                  backwardText="Previous page"
                  forwardText="Next page"
                  itemsPerPageText=""
                  page={1}
                  pageNumberText="Page Number"
                  pageSize={rowData.length}
                  pageSizes={[5, 10, 15, 20]}
                  totalItems={103}
                  disabled={false}
                  isLastPage={false}
                  pagesUnknown
                />
              </div>
            </TableContainer>
          </div>
        )}
      </DataTable>
    </>
  );
}

export default DataPackageTableView;
