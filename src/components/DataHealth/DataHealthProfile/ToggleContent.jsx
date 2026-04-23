import React from "react";
import { ComboBox } from "@carbon/react";

function ToggleContent({ dataClass = [], setDataClassForMultipleCols }) {
  return (
    <div
      style={{
        width: "300px",
        marginRight: "10px",
      }}
    >
      <style>
        {`
          .cds--list-box--expanded .cds--list-box__menu{
            max-height:99px !important;
          }
          `}
      </style>
      <ComboBox
        items={dataClass}
        id="tcc-2"
        itemToString={(item) => (item ? item.name : "")}
        placeholder="Choose Data Class"
        name="DependOnOpt"
        onChange={({ selectedItem }) => {
          setDataClassForMultipleCols(selectedItem);
        }}
      />
    </div>
  );
}
export default ToggleContent;
