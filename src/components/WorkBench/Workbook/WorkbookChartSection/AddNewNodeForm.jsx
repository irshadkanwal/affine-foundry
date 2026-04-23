import React from "react";
import {
  AFDropdown,
  AFForm,
  AFRadioButtonGroup,
  AFTextArea,
  AFTextField,
} from "sharedComponents/Form";
import { Close } from "@carbon/react/icons";
import { Button, IconButton, Column } from "@carbon/react";
import JsonEditor from "sharedComponents/Form/JsonEditor";
import { dataLevelType } from "constants";

const AddNewNodeForm = ({
  onClickSideNavExpand,
  setIsSideNavExpanded,
  onSubmit,
}) => {
  const ruleTypeMapping = {
    1: "json",
    2: "sql",
    3: "python",
  };

  const initialRuleType = 1;
  const initialDisplayType = ruleTypeMapping[initialRuleType];
  const [selectedType, setSelectedType] = React.useState(initialDisplayType);
  const typeValues = [
    { id: 1, value: 1, labelText: "JSON Rule" },
    { id: 2, value: 2, labelText: "SQL" },
    { id: 3, value: 3, labelText: "Python" },
  ];

  const dataLevelOptions = dataLevelType.map((data) => ({
    value: data.id,
    label: data.name,
  }));

  const initialValues = {
    name: "",
    description: "",
    ruleType: 1,
    ruleData: {},
    dataLevel: "",
    savedData: false,
  };
  const handleEditor = (value) => {
    console.log("Updated File:", value);
  };

  const handleSubmit = (values) => {
    setIsSideNavExpanded(false);
    const payload = {
      ...values,
      dataLevelTypeId: Number(values.dataLevel.value),
    };
    onSubmit(payload);
  };

  const handleValueChange = (values) => {
    setSelectedType(values);
  };

  return (
    <div className="workbookDrawerModal">
      <AFForm initialValues={initialValues} onSubmit={handleSubmit}>
        <Column
          span={16}
          className="flex_between"
          style={{ padding: "10px 0px" }}
        >
          <h3>New Node</h3>
          <IconButton kind="ghost" onClick={onClickSideNavExpand} label="Close">
            <Close />
          </IconButton>
        </Column>

        <AFTextField name="name" label="Node Name" />
        <AFTextArea
          name="description"
          label="Node Description"
          enableCounter={true}
        />
        <AFRadioButtonGroup
          name="ruleType"
          label="Rule Type"
          options={typeValues}
          orientation={"horizontal"}
          handleValueChange={handleValueChange}
        />
        {selectedType === "json" ? (
          <JsonEditor
            name={"ruleData"}
            value={JSON.stringify(initialValues.ruleData, null, 2)}
            onChange={(value) => handleEditor(value)}
            accept={[".json"]}
            label={
              <>
                <p className="cds--file--label">Json rule</p>
                <p className="cds--label-description">
                  Max file size is 500kb. Supported file types are .json
                </p>
              </>
            }
          />
        ) : selectedType === "sql" ? (
          <AFTextArea name={"ruleData"} label={"SQL"} enableCounter={false} />
        ) : (
          <JsonEditor
            name={"ruleData"}
            value={JSON.stringify(initialValues.ruleData, null, 2)}
            onChange={(value) => handleEditor(value)}
            accept={[".py"]}
            label={
              <>
                <p className="cds--file--label">Python</p>
                <p className="cds--label-description">
                  Max file size is 500kb. Supported file types are .py
                </p>
              </>
            }
          />
        )}
        <AFDropdown
          label="Data Level"
          name="dataLevel"
          options={dataLevelOptions}
        />
        <Column span={16} className="flex_between">
          <Button kind="ghost" onClick={onClickSideNavExpand}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </Column>
      </AFForm>
    </div>
  );
};

export default AddNewNodeForm;