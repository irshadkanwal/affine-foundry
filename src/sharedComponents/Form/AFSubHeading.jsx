import { Column } from "carbon-components-react";

export default function AFSubHeading({ label, size = 16, colProps = {} }) {
  return (
    <Column span={size} style={{ marginBottom: "10px" }} {...colProps}>
      <h6>{label}</h6>
    </Column>
  );
}
