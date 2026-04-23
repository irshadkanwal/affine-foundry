import React from "react";
import { useField } from "formik";
import { Dropdown } from "carbon-components-react";
import { Column } from "carbon-components-react";

/*options should be of the shape{
    value: classification.id,
    label: classification.type,
  }*/
export default function AFDropdown({
  name,
  label,
  options,
  placeHolder = "Choose an Option",
  size = 16,
  colProps = {},
  setOnChangeValue = () => {},
  ...rest
}) {
  const [field, meta, helpers] = useField(name);

  const isInvalid = meta.touched && meta.error;

  const handleChange = (value) => {
    helpers.setValue(value.selectedItem);
    setOnChangeValue(value.selectedItem.value);
  };

  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <Dropdown
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
