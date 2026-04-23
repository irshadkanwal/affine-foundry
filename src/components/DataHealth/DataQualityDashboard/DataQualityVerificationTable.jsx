import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "carbon-components-react";

function DataQualityVerificationTable({ rowData }) {
  //   const cat=data.map(dataitem=>dataitem.category)
  // const catNames=[...new Set(cat)]
  // //console.log(catNames)
  // //console.log(
  // catNames.map(catName=>{
  //    return data.filter(value=>value.category===catName)
  // }))

  const rows = rowData;
  const headers = [
    {
      key: "verpass",
      header: "Pass",
    },
    {
      key: "verfail",
      header: "Fail",
    },
    {
      key: "vertotal",
      header: "Total",
    },
    {
      key: "verpassPc",
      header: "%Pass",
    },
    {
      key: "valpass",
      header: "Pass",
    },
    {
      key: "valfail",
      header: "Fail",
    },
    {
      key: "valtotal",
      header: "Total",
    },
    {
      key: "valpassPc",
      header: "%Pass",
    },
    {
      key: "tlpass",
      header: "Pass",
    },
    {
      key: "tlfail",
      header: "Fail",
    },
    {
      key: "tltotal",
      header: "Total",
    },
    {
      key: "tlpassPc",
      header: "%Pass",
    },
  ];

  return (
    <TableContainer
      style={{
        padding: "0 0 0 0",
      }}
    >
      <Table size="lg" useZebraStyles={false}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader id={header.key} key={header.key}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ background: "white" }}>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object?.keys(row || {})?.map((key) => {
                const cellValue = row[key];
                return (
                  <TableCell
                    key={key}
                    style={{
                      background: key === "Fail" ? "white" : "inherit",
                      color: key === "Fail" ? "red" : "inherit",
                    }}
                  >
                    {cellValue === "NaN%" ? "- -" : cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataQualityVerificationTable;
