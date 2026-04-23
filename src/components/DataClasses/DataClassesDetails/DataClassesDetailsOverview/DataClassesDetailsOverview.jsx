import React from "react";
import { Accordion, AccordionItem } from "@carbon/react";
import DataClassesDetailsOverviewGeneral from "./DataClassesAccordianContent/DataClassesDetailsOverviewGeneral";
import DataClassesDetailsOverviewDataMatching from "./DataClassesAccordianContent/DataClassesDetailsOverviewDataMatching";
import DataClassesDetailsOverviewRelatedArtifacts from "./DataClassesAccordianContent/DataClassesDetailsOverviewRelatedArtifacts";
import DataMatchingModal from "./DataMatchingModal";
import DataClassesDetailsOverviewTransformationRules from "./DataClassesAccordianContent/DataClassesDetailsOverviewTransformationRules";
import DataClassesDetailsOverviewValidationRules from "./DataClassesAccordianContent/DataClassesDetailsOverviewValidationRules";
import DataClassesDetailsOverviewFeatureEngineering from "./DataClassesAccordianContent/DataClassesDetailsOverviewFeatureEngineering";

function DataClassesDetailsOverview() {
  const [isDataMatchingModalOpen, setIsDataMatchingModalOpen] =
    React.useState(false);
  return (
    <div className="data_classess_accordian">
      <Accordion>
        <AccordionItem title="General" style={{ backgroundColor: "white" }}>
          <DataClassesDetailsOverviewGeneral />
        </AccordionItem>
        <AccordionItem
          title="Data Matching"
          style={{ backgroundColor: "white" }}
        >
          <DataClassesDetailsOverviewDataMatching
            setIsDataMatchingModalOpen={setIsDataMatchingModalOpen}
          />
        </AccordionItem>
        <AccordionItem
          title="Related Artifacts"
          style={{ backgroundColor: "white" }}
        >
          <DataClassesDetailsOverviewRelatedArtifacts />
        </AccordionItem>
        <AccordionItem
          title="Transformation Rules"
          style={{ backgroundColor: "white" }}
        >
          <DataClassesDetailsOverviewTransformationRules />
        </AccordionItem>
        <AccordionItem
          title="Validation Rules"
          style={{ backgroundColor: "white" }}
        >
          <DataClassesDetailsOverviewValidationRules />
        </AccordionItem>
        <AccordionItem
          title="Feature Engineering"
          style={{ backgroundColor: "white" }}
        >
          <DataClassesDetailsOverviewFeatureEngineering />
        </AccordionItem>
      </Accordion>
      {isDataMatchingModalOpen && (
        <DataMatchingModal
          isDataMatchingModalOpen={isDataMatchingModalOpen}
          setIsDataMatchingModalOpen={setIsDataMatchingModalOpen}
        />
      )}
    </div>
  );
}

export default DataClassesDetailsOverview;
