import { AddAlt, Edit } from "@carbon/react/icons";

export default function LabelContent({
  label,
  onClick = () => {},
  showIcon = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <p className="cds--label">{label}</p>
      <div style={{ cursor: "pointer" }} onClick={onClick}>
        {showIcon && (label === "Primary Category" ? <Edit /> : <AddAlt />)}
      </div>
    </div>
  );
}
