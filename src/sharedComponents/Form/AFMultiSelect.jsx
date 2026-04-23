import React from "react";
import { useField } from "formik";
import { Column } from "carbon-components-react";
import { MultiSelect } from "@carbon/react";

/*options should be of the shape{
    value: classification.id,
    label: classification.type,
  }*/
export default function AFMultiSelect({
  name,
  label,
  options,
  placeHolder = "Choose an Option",
  size = 16,
  colProps = {},
  ...rest
}) {
  const [field, meta, helpers] = useField(name);

  const isInvalid = meta.touched && meta.error;

  const handleChange = (value) => {
    helpers.setValue(value.selectedItem);
  };

  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <MultiSelect
        {...field}
        id={name}
        items={options}
        label={placeHolder}
        titleText={label}
        invalid={isInvalid}
        invalidText={isInvalid && meta.error}
        selectedItem={field.value}
        onChange={handleChange}
        {...rest}
      />
    </Column>
  );
}
