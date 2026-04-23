import React from "react";
import TransformationLeftColumn from "./TransformationLeftColumn";
import TransformationRightColumn from "./TransformationRightColumn/TransformationRightColumn";

function Transformation({ sidebarOpen }) {
  const [transformationView, setTransformationView] = React.useState(false);
  return (
    <div>
      <h3
        style={{ marginBottom: "20px", cursor: "pointer" }}
        onClick={() => setTransformationView(false)}
      >
        Transformation
      </h3>
      <div className="display_flex">
        <TransformationLeftColumn
          sidebarOpen={sidebarOpen}
          setTransformationView={setTransformationView}
        />
        <div style={{ margin: "0 0 0 250px", width: "100%" }}>
          <TransformationRightColumn transformationView={transformationView} />
        </div>
      </div>
    </div>
  );
}

export default Transformation;
