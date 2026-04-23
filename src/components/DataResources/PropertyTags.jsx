import { Tag } from "carbon-components-react";

const COLORS = ["green", "magenta", "blue"];
const PropertyTags = ({ properties }) => {
  return (
    <>
      {properties?.map((value, index) => (
        <Tag
          type={
            value === "N/A"
              ? "cool-gray"
              : value === "Yes"
              ? "green"
              : value === "Inactive"
              ? "cool-gray"
              : value === "No"
              ? "red"
              : COLORS[index]
          }
          title="Clear Filter"
          style={{ width: "130px" }}
          key={value}
        >
          {value ? value : "- -"}
        </Tag>
      ))}
    </>
  );
};

export default PropertyTags;
