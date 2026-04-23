import React from "react";
import TransformDetails from "./TransformDetails/TransformDetails";
import ProjectDetails from "./ProjectDetails/ProjectDetails";

function TransformationRightColumn({ transformationView }) {
  return (
    <div style={{ background: "white", padding: "17px 15px 15px 15px" }}>
      {!transformationView ? (
        <ProjectDetails />
      ) : (
        <TransformDetails />
      )}
    </div>
  );
}

export default TransformationRightColumn;
