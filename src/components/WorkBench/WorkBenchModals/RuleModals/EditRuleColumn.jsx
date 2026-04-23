import React from "react";
import {
  AFDropdown,
  AFFormModal,
  AFSubHeading,
  AFTextArea,
  AFTextField,
} from "sharedComponents/Form";
import * as Yup from "yup";
const OPTIONS = [
  { value: "addColumn", label: "Add Column" },
  { value: "lookup", label: "Lookup" },
  { value: "caseWhen", label: "Case-When" },
  { value: "windowFunction", label: "Window-Function" },
  { value: "uPivotTable", label: "Upivot Table" },
  { value: "pivotTable", label: "Pivot Table" },
  { value: "primaryKey", label: "Primary-Key" },
  { value: "calculateAge", label: "Calculate Age" },
  { value: "standarizeDate", label: "Standarize Date" },
  { value: "standarizeAmount", label: "Standarize Amount /  Currency" },
  { value: "standarizeDate", label: "Standardize Diagnosis (ICD)" },
  { value: "standarizeDate", label: "Standarize Procedure (CPT)" },
  { value: "standarizeDate", label: "Standarize SSN" },
  { value: "standarizeDate", label: "Standarize Zip" },
  { value: "standarizeDate", label: "Standarize Street Address" },
  { value: "standarizeDate", label: "Rename" },
  { value: "standarizeDate", label: "Remove Column" },
  { value: "standarizeDate", label: "Convert Upper" },
  { value: "standarizeDate", label: "Convert Lower " },
  { value: "standarizeDate", label: "Data Type Conversion" },
  { value: "obfuscation", label: "Obfuscation" },
];
function EditRulebyAddColumn({ isModalOpen, setIsModalOpen }) {
  const [dropDownValue, setDropDownValue] = React.useState("addColumn");
  const { mutateAsync: updateData, isLoading: isUpdateDataLoading } = () => {};
  const validationSchema = Yup.object().shape({});
  const initialValues = {};
  const handleOnSubmit = (formValues) => {
    const newData = {};
    updateData(newData);
  };
  return (
    <AFFormModal
      onClose={() => setIsModalOpen(false)}
      isLoading={isUpdateDataLoading}
      primaryButtonText="Save"
      isOpen={isModalOpen}
      initialValues={initialValues}
      title="Edit Rule"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="lg"
      setHeight={true}
    >
      <AFTextField name="ruleStep" label="Rule Step" size={6} />
      <AFTextField name="ruleName" label="Rule Name" size={6} />
      <AFDropdown
        size={4}
        setOnChangeValue={setDropDownValue}
        options={OPTIONS}
        name="ruleType"
        label="Rule Type"
      />
      <AFSubHeading label="Rule Details" />
      {dropDownValue === "addColumn" && (
        <>
          <AFTextArea
            name="description"
            maxCount={300}
            maxLength={300}
            label="Project Description"
            size={8}
          />
          <AFTextField name="derivedColumn" label="Derived-Column" size={8} />
        </>
      )}
      {dropDownValue === "lookup" && (
        <>
          <AFTextField name="columnSouce" label="Column (Source)" size={8} />
          <AFTextField name="lookupCode" label="Lookup Code" size={8} />

          <AFTextArea
            name="returnFields"
            maxCount={300}
            maxLength={300}
            label="Return Fields/ Expression"
            size={16}
          />
        </>
      )}
      {dropDownValue === "caseWhen" && (
        <>
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="columnSouceDropDown"
            label="Column (Source)"
          />
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="sourceValues"
            label="Source Values (Expression)"
          />
          <AFDropdown
            size={4}
            options={OPTIONS}
            name="replacement"
            label="Replacement"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="defaultValue"
            label="Default-Value"
          />
          <AFTextField
            name="derivedColumnInType"
            label="Derived-Column"
            size={8}
          />
        </>
      )}
      {dropDownValue === "windowFunction" && (
        <>
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="windowFuntion"
            label="Window Function"
          />
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="partitionBy"
            label="Partition By"
          />
          <AFDropdown
            size={4}
            options={OPTIONS}
            name="orderBy"
            label="Order By"
          />
        </>
      )}

      {dropDownValue === "uPivotTable" && (
        <>
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="baseColumns"
            label="Base Columns"
          />
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="exclude"
            label="Exclude"
          />
          <AFDropdown
            size={4}
            options={OPTIONS}
            name="unpivotCol"
            label="Unpivot-Columns"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="targetColumns"
            label="Target-Columns"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="filterExpression"
            label="Filter-Expression"
          />
        </>
      )}
      {dropDownValue === "pivotTable" && (
        <>
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="pivotColumn"
            label="Pivot Column"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="groupByCol"
            label="Group By Columns"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="aggregateFunction"
            label="Aggregate-Function"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="aggregateColumns"
            label="Aggregate-Columns"
          />
        </>
      )}
      {dropDownValue === "primaryKey" && (
        <>
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="primaryKeyCol"
            label="Primary-Key Columns"
          />
          <AFDropdown
            size={6}
            options={OPTIONS}
            name="primaryKeyType"
            label="Primary-Key Type"
          />
          <AFDropdown
            size={4}
            options={OPTIONS}
            name="primaryKeyFieldName"
            label="Primary-Key Field Name"
          />
        </>
      )}
      {dropDownValue === "calculateAge" && (
        <>
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="baseDate"
            label="Base-Date"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="internal"
            label="Internal"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="rounding"
            label="Rouding"
          />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="ageGroups"
            label="Age Groups"
          />
        </>
      )}
      {dropDownValue === "standarizeDate" && (
        <>
          <AFTextField name="columnNameInDate" label="Column Name" size={8} />
          <AFTextField
            name="derivedColumnInDate"
            label="Derived-Column"
            size={8}
          />
        </>
      )}

      {dropDownValue === "standarizeAmount" && (
        <>
          <AFTextField name="columnNameInAmount" label="Column Name" size={8} />
          <AFTextField
            name="derivedColumnInAmount"
            label="Derived-Column"
            size={8}
          />
        </>
      )}
      {dropDownValue === "obfuscation" && (
        <>
          <AFTextField name="columnNameInObf" label="Column Name" size={8} />
          <AFDropdown
            size={8}
            options={OPTIONS}
            name="obfuscationTech"
            label="Obfuscation Technical"
          />
        </>
      )}
      <AFSubHeading label="Data Type" />
      <AFDropdown
        size={6}
        options={OPTIONS}
        name="ruleType1"
        label="Rule Type"
      />
      <AFTextField name="derivedColumnInType" label="Derived-Column" size={6} />

      <AFTextField name="precision" label="Precision" size={4} />
    </AFFormModal>
  );
}
export default EditRulebyAddColumn;
