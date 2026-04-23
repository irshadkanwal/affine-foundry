import React from "react";
import {
  Checkbox,
  Column,
  FileUploader,
  CheckboxGroup,
} from "carbon-components-react";
import {
  AFForm,
  AFNumberInput,
  AFRadioButtonGroup,
  AFTextArea,
} from "sharedComponents/Form";
import { Field } from "formik";
const selectValue = [
  { id: "1", labelText: "List of valid values", value: "text" },
  { id: "2", labelText: "Link to text file", value: "file" },
];
function MatchToListOfValidValues() {
  const [radioValue, setRadioValue] = React.useState("text");
  const formInitialValues = {
    selectValue: "",
    validValue: "",
    criteria: [],
  };
  return (
    <>
      <style>
        {`
            .cds--file__selected-file {
                background-color: #d3d3d3;
            }
            `}
      </style>
      <h4
        style={{
          margin: "40px 0 20px",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Match to list of valid values
      </h4>
      <AFForm initialValues={formInitialValues}>
        <AFRadioButtonGroup
          name="selectValue"
          label="Select Value"
          options={selectValue}
          orientation={"vertical"}
          size={6}
          valueSelected={radioValue}
          handleValueChange={(value) => setRadioValue(value)}
        />
        {radioValue === "file" ? (
          <Column lg={10} md={10} sm={10}>
            <FileUploader
              labelTitle="Upload files"
              labelDescription="Max file size is 500kb. Supported file types are .txt and .csv."
              buttonLabel={"Choose file"}
              buttonKind="primary"
              size="md"
              filenameStatus="edit"
              accept={[".txt", ".csv"]}
              multiple={true}
              disabled={false}
              iconDescription="Delete file"
              name="fileUploader"
            />
          </Column>
        ) : (
          <AFTextArea
            name="validValue"
            label="List of valid values"
            size={10}
            helperText="Separate values by comma"
            enableCounter={false}
          />
        )}
        <Column span={6}>
          <Field name="criteria">
            {({ field }) => (
              <CheckboxGroup legendText="Text matching criteria">
                <Checkbox
                  labelText="Case sensitive"
                  id="1"
                  {...field}
                  value="case"
                />
                <Checkbox
                  labelText="Exact spacing"
                  id="2"
                  {...field}
                  value="spacing"
                />
                <Checkbox
                  labelText="Whole words"
                  id="3"
                  {...field}
                  value="words"
                />
              </CheckboxGroup>
            )}
          </Field>
        </Column>
        <AFNumberInput
          name="percentageNumber"
          label="Percentage match threshold"
          size={10}
        />
      </AFForm>
    </>
  );
}
export default MatchToListOfValidValues;
