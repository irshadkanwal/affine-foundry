import { Loading } from "@carbon/react";
import { Tag } from "carbon-components-react";
import { sortArraybyProp } from "utils/sortArrayByProp";

const COLORS = ["green", "magenta", "blue"];
const PropertyTags = ({ properties, data, isLoading }) => {
  const filteredProperties = properties?.filter(
    (value) => value?.dataPackageId === data?.id
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading description={"loading"} withOverlay={false} small={true} />
      </div>
    );
  }
  if (filteredProperties?.length !== 0) {
    const slicedProperties = sortArraybyProp(
      filteredProperties,
      "value"
    )?.slice(0, 3);

    return (
      <>
        {slicedProperties?.map((slicedData, index) => (
          <Tag
            type={COLORS[index]}
            title="Clear Filter"
            style={{ width: "130px" }}
            key={slicedData?.id}
          >
            {slicedData?.value ? slicedData?.value : "- -"}
          </Tag>
        ))}
      </>
    );
  } else {
    return (
      <Tag type="red" title="Clear Filter" style={{ width: "150px" }}>
        No Properties Found
      </Tag>
    );
  }
};

export default PropertyTags;
