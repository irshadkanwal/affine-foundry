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

const UpdateNodeForm = ({
  onClickSideNavExpand,
  setIsSideNavExpanded,
  activeNodeData,
  isEditNode = false,
  onSubmit,
}) => {
  const ruleTypeMapping = {
    1: "json",
    2: "sql",
    3: "python",
  };

  const initialRuleType = activeNodeData?.data?.ruleType || 1;
  const initialDisplayType = ruleTypeMapping[initialRuleType];
  const [selectedType, setSelectedType] = React.useState(initialDisplayType);
  const typeValues = [
    { id: 1, value: 1, labelText: "JSON Rule" },
  ];

  const dataLevelOptions = dataLevelType
    .filter(data => data.name !== "Raw" && data.name !== "Bronze")
    .map(data => ({
      value: data.id,
      label: data.name,
    }));

  const { title, description, ruleData, savedData, dataLevelTypeId } =
    activeNodeData?.data;
  const initialValues = {
    name: title || "",
    nodeType: "transformation",
    description: description || "",
    ruleType: initialRuleType || 1,
    ruleData: ruleData || {},
    dataLevel: dataLevelOptions.find(
      (option) => option.value === dataLevelTypeId
    ),
    savedData: savedData || false,
  };
  const handleEditor = (value) => {
    console.log("Updated File:", value);
  };

  const handleSubmit = (values) => {
    const payload = {
      ...activeNodeData?.data,
      ...values,
      dataLevelTypeId: Number(values.dataLevel.value),
    };
    console.log(payload, "payload", values);
    if (onSubmit) onSubmit(payload);
    setIsSideNavExpanded(false);
  };

  const handleValueChange = (values) => {
    setSelectedType(ruleTypeMapping[values]);
  };

  return (
    <div className="workbookDrawerModal">
      <AFForm initialValues={initialValues} onSubmit={handleSubmit}>
        <Column
          span={16}
          className="flex_between"
          style={{ padding: "10px 0px" }}
        >
          <h3>{isEditNode ? "Update Node" : "Edit Node"}</h3>
          <IconButton
            kind="ghost"
            onClick={
              isEditNode
                ? () => setIsSideNavExpanded(false)
                : onClickSideNavExpand
            }
            label="Close"
          >
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
          <Button
            kind="ghost"
            onClick={
              isEditNode
                ? () => setIsSideNavExpanded(false)
                : onClickSideNavExpand
            }
          >
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </Column>
      </AFForm>
    </div>
  );
};

export default UpdateNodeForm;
