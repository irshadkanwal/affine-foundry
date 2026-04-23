import React from "react";
import {
  TabList,
  TabPanel,
  TabPanels,
  Button,
  Column,
  Tab,
  Tabs,
  TextInput,
} from "@carbon/react";
import { AFForm, AFTextArea, AFTextField } from "sharedComponents/Form";
import ProjectDetailsTransformTable from "./ProjectDetailsTransformTable";
import ProjectDetailsValidationTable from "./ProjectDetailsValidationTable";

function ProjectDetails() {
  return (
    <div>
      <h4 style={{ paddingBottom: "25px" }}>Project Details</h4>
      <AFForm>
        <AFTextField name="name" label="Task Name" size={8} />
        <AFTextField name="name" label="Task Name" size={8} />
        <AFTextArea name="name" label="Task Name" size={8} />
        <Column lg={8} md={8} sm={16}>
          <TextInput
            style={{ marginBottom: "14px" }}
            id="name"
            labelText="label"
            placeholder="placeHolder"
          />
          <Button style={{ width: "100%" }}>Save</Button>
        </Column>
      </AFForm>
      <Tabs>
        <TabList aria-label="List of tabs" contained>
          <Tab>Transformation</Tab>
          <Tab>Data Validations</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProjectDetailsTransformTable />
          </TabPanel>
          <TabPanel>
            <ProjectDetailsValidationTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default ProjectDetails;
